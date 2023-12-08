// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

// imports
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
//"@openzeppelin/access/Ownable.sol"; -- changed to slither
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//"@openzeppelin/token/ERC20/IERC20.sol"; -- changed to slither
import {ITokenTransferor} from "./interfaces/ITokenTransferor.sol";

/**
 * @author Funkornaut
 * @notice This is a simple payroll contract that allows the owner to add employees and pay them.
 * Employees are able to select which evm chain & tokens they wish to be paid on.
 * Assumptions:
 *  Original Employee address/wallet is created by Employer admin and the employeeId is created from that wallet address
 *  We only pay Employees in BnMTokens (therortically this will be a stablecoin) 
 */


contract Payroll is Ownable {

//////////////
/// errors ///
////////////// 
error PercentageMustEqual100();
error InvalidAddress();
error EmployeeAlreadyExists();
error EmployeeDoesNotExists();
error EmployeeIsNotSalary();
error EmployeeIsNotHourly();
error HoursWorkedArrayDoesNotMatchEmployees(uint8[]);
error OwnerCantBeEmployee();
error MustHavePayRate();
// interfaces, libraries, contracts

///@dev Burn And Mint Test Token assume this is the stablecoin the Employer has choosen to pay its Employees in 
/// mumbai address 0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40
IERC20 public bnmToken;
//ICCIPTokenSender public ccip;
///@dev address of TokenTransferor Deployed with Payroll 
ITokenTransferor public ccip;

// Automation Address
//address public automationAddress;

// Type declarations

// State variables

    // eth sepolia
    uint64 public immutable i_destinationChainIdEth = 16015286601757825753;
    // OP goerli
    uint64 public immutable i_destinationChainIDdOP = 2664363617261496610;
    // Avax Fuji
    uint64 public immutable i_destinationChainIdAvax = 14767482510784806043;
    // BNB Testnet
    uint64 public immutable i_destinationChainIdBnb = 13264668187771770619;
    
    struct Employee { 
        // Unique identifier for the employee - hash of the originally assigned wallet and block.timestamp
        bytes32 employeeId;
        // Primary wallet address of the employee, could be used on any chain, is updateable by employee or employeer
        address primaryWallet;
        bool isSalary;
        //bool localChainPayment;
        uint256 payRate;
        // the split information for each chain
        PaymentSplit paymentSplits; 
    }

    ///@dev Mapping of employeeId to Employee struct
    mapping (bytes32 => Employee) public employeeIds;

    ///@dev mapping of employee primary address to Employee struct
    mapping (address => Employee) public employees;

    struct PaymentSplit {
        // The percentage of pay to be sent to those chains
        uint8 paySplitPercentageNative;
        uint8 paySplitPercentage1; //ETH
        uint8 paySplitPercentage2; //OP 
        uint8 paySplitPercentage3; //Avax 
        uint8 paySplitPercentage4; //BNB 
    }

    // mapping of employeeId to PaymentSplit struct -- might not be necessary
    mapping (bytes32 => PaymentSplit) public paymentSplits;

    // array of all salaried employees
    address[] public salariedEmployees;

    // mapping of address to index in salariedEmployees array
    mapping (address => uint256) public salariedEmployeeIndex;
    
    // array of all hourly employees
    address[] public hourlyEmployees;

    // mapping of address to index in hourlyEmployees array
    mapping (address => uint256) public hourlyEmployeeIndex;
    
    //////////////
    /// Events ///
    //////////////
    //@todo do we need parameters/vales?
    event SingleEmployeePaid(address _employeeAddress, uint256 _amount);
    event BalanceWithdrawn(uint256 amount);
    event AllSallaryEmployeesPaid();
    event AllHourlyEmployeesPaid();
    event AllEmployeesPaid();
    event EmployeeAdded(address _employeeAddress);
    event SalarySet(address _employeeAddress);
    event EmployeeFired(address _employeeAddress);
    event WalletAddressChanged(address _oldAddress, address _newAddress);
    event PaymentSplitSet(address _employeeAddress, uint8[5] _paySplitPercentages);
    event TransferToChain(address _receiver, uint64 _destinationChainSelector, bytes32 messageId);

    /////////////////
    /// Modifiers ///
    /////////////////
    modifier onlyEmployee() {
        require(employees[msg.sender].employeeId != 0, "Only employees can call this function");
        _;
    }

    modifier onlyEmployeeOrOwner() {
        require(employees[msg.sender].employeeId != 0 || msg.sender == owner(), "Only employees or owner can call this function");
        _;
    }

    // modifier onlyAutomationOrOwner() {
    //     require(msg.sender == automationAddress || msg.sender == owner(), "Only automation or owner can call this function");
    //     _;
    // }
// Functions

// Layout of Functions:
// constructor
    // @todo maybe make a constructor params struct that can set all chainIds, CCIPcontract, token whitelist?
    constructor(address _ccipTokenTranferor, address _bnmToken) {
        ccip = ITokenTransferor(_ccipTokenTranferor);
        bnmToken = IERC20(_bnmToken);
    }

    function recieve() external payable {}

    ///@dev withdraw function incase any ether/native token is sent to contract mistakenly
    function withdraw(address payable _to) external onlyOwner {
        if (_to == address(0)) {
            revert InvalidAddress();
        }
        uint256 amount = address(this).balance;
        (bool sent, ) = _to.call{value: amount}("");
        require(sent, "Failed to send Ether");

        emit BalanceWithdrawn(amount);
    }

    function transferOwnership(address newOwner) public override onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }


// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions
    
    //////////////////////////////
    /// Pay Employee Functions ///
    //////////////////////////////

    function paySingleEmployee(address _employeeAddress, uint8 _hoursWorked) external onlyOwner {
        //"Invalid address"
        if (_employeeAddress == address(0)) {
            revert InvalidAddress();
        }

        //"Employee does not exist"
        if (employees[_employeeAddress].employeeId == 0) {
            revert EmployeeDoesNotExists();
        }

        //@todo can this be memory?
        //Employee memory employee = employees[_employeeAddress];

        uint256 weeklyPay = employees[_employeeAddress].isSalary 
            ? _calculateWeeklyPaymentSalary(_employeeAddress) 
            : _calculateWeeklyPaymentHourly(_employeeAddress, _hoursWorked);

        PaymentSplit memory splits = employees[_employeeAddress].paymentSplits;
        

                // Transfer tokens to each chain according to the payment split
                if (splits.paySplitPercentageNative !=0) {
                    bool success = bnmToken.transfer(_employeeAddress, ((weeklyPay * splits.paySplitPercentageNative) / 100));
                    require(success, "Token transfer failed");
                }
                if (splits.paySplitPercentage1 != 0) {
                    _transferToChain(i_destinationChainIdEth, _employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage1) / 100));
                }
                if (splits.paySplitPercentage2 != 0) {
                    _transferToChain(i_destinationChainIDdOP, _employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage2) / 100));
                }
                if (splits.paySplitPercentage3 != 0) {
                    _transferToChain(i_destinationChainIdAvax, _employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage3) / 100));
                }
                if (splits.paySplitPercentage4 != 0) {
                    _transferToChain(i_destinationChainIdBnb, _employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage4) / 100));
                }
        //ccip.transferTokens(, _employeeAddress, , weeklyPay)
        
        emit SingleEmployeePaid(_employeeAddress, weeklyPay);
    }

    function payAllSallaryEmployees() public onlyOwner {
        for(uint i = 0; i < salariedEmployees.length; ++i) {

            address employeeAddress = salariedEmployees[i];

            uint256 weeklyPay = _calculateWeeklyPaymentSalary(employeeAddress);

            PaymentSplit memory splits = employees[employeeAddress].paymentSplits;
        

                // Transfer tokens to each chain according to the payment split
                if (splits.paySplitPercentageNative !=0) {
                    bool success = bnmToken.transfer(employeeAddress, ((weeklyPay * splits.paySplitPercentageNative) / 100));
                    require(success, "Token transfer failed");
                }
                if (splits.paySplitPercentage1 != 0) {
                    _transferToChain(i_destinationChainIdEth, employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage1) / 100));
                }
                if (splits.paySplitPercentage2 != 0) {
                    _transferToChain(i_destinationChainIDdOP, employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage2) / 100));
                }
                if (splits.paySplitPercentage3 != 0) {
                    _transferToChain(i_destinationChainIdAvax, employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage3) / 100));
                }
                if (splits.paySplitPercentage4 != 0) {
                    _transferToChain(i_destinationChainIdBnb, employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage4) / 100));
                }

        }

        emit AllSallaryEmployeesPaid();
    }

    function payAllHourlyEmployees(uint8[] calldata _hoursWorked) public onlyOwner {
        if (hourlyEmployees.length != _hoursWorked.length){
            revert HoursWorkedArrayDoesNotMatchEmployees(_hoursWorked);
        }

        for(uint i = 0; i < hourlyEmployees.length; ++i){

            address employeeAddress = hourlyEmployees[i];
                
            uint256 weeklyPay = _calculateWeeklyPaymentHourly(employeeAddress, _hoursWorked[i]);

            PaymentSplit memory splits = employees[employeeAddress].paymentSplits;

               // Transfer tokens to each chain according to the payment split
                if (splits.paySplitPercentageNative !=0) {
                    bool success = bnmToken.transfer(employeeAddress, ((weeklyPay * splits.paySplitPercentageNative) / 100));
                    require(success, "Token transfer failed");
                }
                if (splits.paySplitPercentage1 != 0) {
                    _transferToChain(i_destinationChainIdEth, employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage1) / 100));
                }
                if (splits.paySplitPercentage2 != 0) {
                    _transferToChain(i_destinationChainIDdOP, employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage2) / 100));
                }
                if (splits.paySplitPercentage3 != 0) {
                    _transferToChain(i_destinationChainIdAvax, employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage3) / 100));
                }
                if (splits.paySplitPercentage4 != 0) {
                    _transferToChain(i_destinationChainIdBnb, employeeAddress, address(bnmToken), ((weeklyPay * splits.paySplitPercentage4) / 100));
                }
        }
                
        emit AllHourlyEmployeesPaid();

    }

    function payAllEmployees(uint8[] calldata _hoursWorked) external onlyOwner {
        payAllSallaryEmployees();
        payAllHourlyEmployees(_hoursWorked);

        emit AllEmployeesPaid();
    }

    function _transferToChain(uint64 _destinationChainSelector, address _receiver, address _token, uint256 _amount) internal returns (bytes32 messageId) {
        bnmToken.approve(address(ccip), _amount);

        bool success = bnmToken.transfer(address(ccip), _amount);
        require(success, "Token transfer failed");
        
        messageId = ccip.transferTokensPayNative(_destinationChainSelector, _receiver, _token, _amount);
        emit TransferToChain(_receiver, _destinationChainSelector, messageId);

    }


    ///////////////////////////////////////////////
    /// Only Owner Employee Managment Functions ///
    ///////////////////////////////////////////////

    ///@dev if employee _isSalary = true then _payRate is their annual salary. 
    ///@dev if employee _isSalary = false then _payRate is their hourly rate. 
    function addEmployee(address _employeeAddress, bool _isSalary, uint256 _payRate) external onlyOwner {
        //"Invalid address"
        if (_employeeAddress == address(0)) {
            revert InvalidAddress();
        }
        //"Employee already exists"
        if (employees[_employeeAddress].employeeId != 0) {
            revert EmployeeAlreadyExists();
        }

        if (_employeeAddress == owner()) {
            revert OwnerCantBeEmployee();
        }

        if (_payRate == 0) {
            revert MustHavePayRate();
        }

        // Generate a unique ID for the new employee
        // Employee address has been created by Employer w/ account abstraction
        bytes32 employeeId = keccak256(abi.encodePacked(_employeeAddress, block.timestamp));

        Employee memory newEmployee = Employee({
            employeeId: employeeId,
            primaryWallet: _employeeAddress,
            isSalary: _isSalary,
            payRate: _payRate,
            paymentSplits: PaymentSplit({
                paySplitPercentageNative: 100, //mumbai
                paySplitPercentage1: 0, // eth
                paySplitPercentage2: 0, // op
                paySplitPercentage3: 0, // avax
                paySplitPercentage4: 0 // bnb
            })
        });

        // update employees address mapping
        employees[_employeeAddress] = newEmployee;
        // update employeeId mapping
        employeeIds[employeeId] = newEmployee;

        // update salary/hourly array and index mapping
        if (_isSalary == true){
            salariedEmployees.push(_employeeAddress);
            uint256 index = salariedEmployees.length - 1;
            salariedEmployeeIndex[_employeeAddress] = index;
        } else {
            hourlyEmployees.push(_employeeAddress);
            uint256 index = hourlyEmployees.length - 1;
            hourlyEmployeeIndex[_employeeAddress] = index;
        }

        emit EmployeeAdded(_employeeAddress);
    }

    ///@dev if employee _isSalary = true then _payRate is their annual salary. 
    ///@dev if employee _isSalary = false then _payRate is their hourly rate.
    function setEmployeeSalary(address _employeeAddress, bool _isSalary, uint256 _payRate) external onlyOwner {
        //"Invalid address"
        if (_employeeAddress == address(0)) {
            revert InvalidAddress();
        }
        //"Employee does not exist"
        if (employees[_employeeAddress].employeeId == 0) {
            revert EmployeeDoesNotExists();
        }

        employees[_employeeAddress].isSalary = _isSalary;
        employees[_employeeAddress].payRate = _payRate;

        emit SalarySet(_employeeAddress);
    }

    function removeEmployee(address _employeeAddress) external onlyOwner {
        // might not be necessary
        if (employees[_employeeAddress].employeeId == 0) {
            revert EmployeeDoesNotExists();
        }

        Employee storage employee = employees[_employeeAddress];

        if (employee.isSalary == true) {
            uint256 index = salariedEmployeeIndex[_employeeAddress];
            _removeFromArray(index, salariedEmployees);
        } else {
            uint256 index = hourlyEmployeeIndex[_employeeAddress];
            _removeFromArray(index, hourlyEmployees);
        }

        //@todo do I need to update the mapping or address to employee struct too? see above
        delete employees[_employeeAddress];

        emit EmployeeFired(_employeeAddress);
    }

    //////////////////////////////////////////////////////////
    /// Employee & Owner Only Emloyee Management Functions ///
    //////////////////////////////////////////////////////////

    function changePrimaryWalletAddress(address _oldAddress, address _newAddress) public onlyEmployee {
        //"Invalid address"
        if (_newAddress == address(0)) {
            revert InvalidAddress();
        }
        //"Employee does not exist" -- @todo don't think I need check because of onlyEmployee modifier
        if (employees[_oldAddress].employeeId == 0) {
            revert EmployeeDoesNotExists();
        }

        // Copy to memory the employee
        Employee memory updatedEmployee = employees[_oldAddress];

        //@todo might need to update the mapping as well or use the employeeId for the mapping key
        updatedEmployee.primaryWallet = _newAddress; 
        
        if (employees[_oldAddress].isSalary == true) {
            // remove old wallet from appropriate array
            uint256 oldIndex = salariedEmployeeIndex[_oldAddress];
            _removeFromArray(oldIndex, salariedEmployees);
           
            // add new wallet to appropriate array & update index mapping
            salariedEmployees.push(_newAddress);
            uint256 newIndex = salariedEmployees.length - 1;
            salariedEmployeeIndex[_newAddress] = newIndex;
        } else {
            // remove old wallet from appropriate array
            uint256 oldIndex = hourlyEmployeeIndex[_oldAddress];
            _removeFromArray(oldIndex, hourlyEmployees);

            // add new wallet to appropriate array & update index mapping
            hourlyEmployees.push(_newAddress);
            uint256 newIndex = hourlyEmployees.length - 1;
            hourlyEmployeeIndex[_newAddress] = newIndex;
        }                
                
        //delete old address mapping -- do I need to delete and re-add?
        delete employees[_oldAddress];
        
        //update employee address mapping
        employees[_newAddress] = updatedEmployee;


        emit WalletAddressChanged(_oldAddress, _newAddress);

    }

    //@todo does _paySplit need to be callData?
    function setPaymentSplits(address _employeeAddress, uint8[5] calldata _paySplitPercentages) public onlyEmployeeOrOwner {
        uint8 totalPercentage = 0;

        for (uint i = 0; i < _paySplitPercentages.length; ++i) {
            totalPercentage += _paySplitPercentages[i];
        }

        if (totalPercentage != 100) {revert PercentageMustEqual100();}

         PaymentSplit memory newSplit = PaymentSplit({
            //@todo get the chainIds out of this struct
            paySplitPercentageNative: _paySplitPercentages[0], // mumbai
            paySplitPercentage1: _paySplitPercentages[1], // eth
            paySplitPercentage2: _paySplitPercentages[2], // op
            paySplitPercentage3: _paySplitPercentages[3], // avax
            paySplitPercentage4: _paySplitPercentages[4] // bnb
        });

        Employee storage employee = employees[_employeeAddress];
        employee.paymentSplits = newSplit;

        emit PaymentSplitSet(_employeeAddress, _paySplitPercentages);
    }
    
    // function setAutomationAddress(address _automationAddress) external onlyOwner {
    //     automationAddress = _automationAddress;
    // }
    ////////////////////
    /// Helper Funcs ///
    ////////////////////

    function _removeFromArray(uint256 _index, address[] storage array) internal {
        if (_index >= array.length) return;

        for (uint i = _index; i<array.length-1; ++i){
            array[i] = array[i+1];
        }
        
        array.pop();
    }
    


    function _calculateWeeklyPaymentSalary(address _employeeAddress) internal view returns (uint256 weeklyPay) {
        weeklyPay = employees[_employeeAddress].payRate / 52;
    }

    function _calculateWeeklyPaymentHourly(address _employeeAddress, uint8 _hoursWorked) internal view returns (uint256 weeklyPay) {
        weeklyPay = employees[_employeeAddress].payRate * _hoursWorked;
    }

    ///////////////////////////////////
    /// VIEW & GETTER FUNCS
    //////////////////////////////////
    function viewPaymentSplit(address _employeeAddress) public view returns (PaymentSplit memory){
       return employees[_employeeAddress].paymentSplits;
    }

    function getEmployee(address _employeeAddress) public view returns (Employee memory){
        return employees[_employeeAddress];
    }

    function doesEmployeeExist(address _employeeAddress) public view returns (bool){
        if (employees[_employeeAddress].employeeId == 0) {
            return false;
        } else {
            return true;
        }
    }

    function isOwner(address _address) public view returns (bool){
        return _address == owner();
    }   

    function getEmployeePaymentSplits(address _employeeAddress) public view returns (PaymentSplit memory){
        return employees[_employeeAddress].paymentSplits;
    }

    function getHourlyEmployees() public view returns (address[] memory){
        return hourlyEmployees;
    }   

    function getSalariedEmployees() public view returns (address[] memory){
        return salariedEmployees;
    }   

    // function getAutomationAddress() public view returns (address){
    //     return automationAddress;
    // }

}
