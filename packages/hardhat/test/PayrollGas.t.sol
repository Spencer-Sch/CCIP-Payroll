// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {PayrollGas} from "../contracts/PayrollGas.sol";
import {ERC20Mock} from "@openzeppelin/contracts-v0.7/mocks/ERC20Mock.sol";
import {TokenTransferor} from "../contracts/TokenTransferor.sol";

contract PayRollGasTest is Test {
    PayrollGas public payroll;
    ERC20Mock public mockBnMToken;
    //address public employeerAddress;
    TokenTransferor public ccip;

    // eth sepolia
    uint64 public immutable i_destinationChainIdEth = 16015286601757825753;
    // OP goerli
    uint64 public immutable i_destinationChainIDdOP = 2664363617261496610;
    // Ploygon Mumbai
    uint64 public immutable i_destinationChainIdPolygon = 12532609583862916517;
    // BNB Testnet
    uint64 public immutable i_destinationChainIdBnb = 13264668187771770619;
    // Base Goreli
    uint64 public immutable i_destinationChainIdBase = 5790810961207155433;




    // add addressses
        address employee1 = vm.addr(1);
        //vm.makePersistent(employee1);
        address employee2 = vm.addr(2);
        //vm.makePersistent(employee2);
        address employee3 = vm.addr(3);
        //vm.makePersistent(employee3);
        address employee4 = vm.addr(4);
        //vm.makePersistent(employee4);
        address employee5 = vm.addr(5);
        //vm.makePersistent(employee5);
        address employee6 = vm.addr(6);
        //vm.makePersistent(employee6);
        address employee7 = vm.addr(7);
        //vm.makePersistent(employee7);
        address employee8 = vm.addr(8);
        //vm.makePersistent(employee8);
        address employee9 = vm.addr(9);
        //vm.makePersistent(employee9);
        address employee10 = vm.addr(10);
        //vm.makePersistent(employee10);



    function setUp() public {

        mockBnMToken = new ERC20Mock("BnMToken", "BnM", address(this), 18);
        payroll = new PayrollGas(address(ccip), address(mockBnMToken));

    }

    ////////////////////////
    /// Only Owner Funcs ///
    ////////////////////////
    
    function testfuzz_onlyOwnerCanSetAutomationAddress(address caller) public {
        vm.assume(caller != address(0) && caller != payroll.owner());

        vm.prank(caller);
        vm.expectRevert("Ownable: caller is not the owner");
        payroll.setAutomationAddress(address(1));
    }

    function testfuzz_onlyOwnerCanRemoveEmployee(address caller) public {
        vm.assume(caller != address(0) && caller != payroll.owner());

        vm.prank(caller);
        vm.expectRevert("Ownable: caller is not the owner");
        payroll.removeEmployee(address(1));
    }

    function testfuzz_onlyOwnerCanSetEmployeeSalary(address caller) public {
        vm.assume(caller != address(0) && caller != payroll.owner());

        vm.prank(caller);
        vm.expectRevert("Ownable: caller is not the owner");
        payroll.setEmployeeSalary(address(1), true, 52);
    }
    function testfuzz_onlyOwnerCanAddEmployee(address caller) public {
        vm.assume(caller != address(0) && caller != payroll.owner());

        vm.prank(caller);
        vm.expectRevert("Ownable: caller is not the owner");
        payroll.addEmployee(address(1), true, 52);
    }

    function testfuzz_onlyOwnerCanTransferOwnership(address caller) public {
        vm.assume(caller != address(0) && caller != payroll.owner());

        vm.prank(caller);
        vm.expectRevert("Ownable: caller is not the owner");
        payroll.transferOwnership(address(1));
    }

    function testfuzz_onlyOwnerCanWithdraw(address caller) public {
        vm.assume(caller != address(0) && caller != payroll.owner());

        vm.prank(caller);
        vm.expectRevert("Ownable: caller is not the owner");
        payroll.withdraw(payable(msg.sender));
    }



    ///////////////////////////////////
    /// Add / Update Employee Tests ///
    ///////////////////////////////////
  
    function test_AddEmployee() public {
        payroll.addEmployee(employee1, true, 52000);

        PayrollGas.Employee memory employee = payroll.getEmployee(employee1);
        PayrollGas.PaymentSplit memory paymentSplits = payroll.getEmployeePaymentSplits(employee1);

        assertEq(employee.employeeId, keccak256(abi.encodePacked(employee1, block.timestamp)));
        assertEq(employee.primaryWallet, employee1);
        assertEq(employee.isSalary, true);
        assertEq(employee.weeklyPay, 1000);
       // assertEq(employee.localChainPayment, true);
        assertEq(employee.payRate, 52000);
        assertEq(paymentSplits.paySplitPercentageNative, 100);
    }

     function test_canChangePayRate() public {
        payroll.addEmployee(employee1, true, 52000);
        payroll.setEmployeeSalary(employee1, true, 100000);

        PayrollGas.Employee memory employee = payroll.getEmployee(employee1);

        assertEq(employee.payRate, 100000);
    }

    function test_canChangePayToHourly() public {
        payroll.addEmployee(employee1, true, 52000);
        payroll.setEmployeeSalary(employee1, false, 100000);

        PayrollGas.Employee memory employee = payroll.getEmployee(employee1);

        assertEq(employee.isSalary, false);
    }

    function test_canChangePayToSalary() public {
        payroll.addEmployee(employee1, false, 52000);
        payroll.setEmployeeSalary(employee1, true, 100000);

        PayrollGas.Employee memory employee = payroll.getEmployee(employee1);

        assertEq(employee.isSalary, true);
    }

    function test_updateWallet() public {
        // add employee1 for testing
        payroll.addEmployee(employee1, true, 52000);
       
        // grab employee1 struct
        PayrollGas.Employee memory employee = payroll.getEmployee(employee1);
        bytes32 idFromOldAddress = employee.employeeId;

        address newWallet = vm.addr(69);
        vm.prank(employee1);
        // update employee1's wallet
        payroll.changePrimaryWalletAddress(employee1, newWallet);

        // Fetch the updated employee record using the new wallet address
        PayrollGas.Employee memory updatedEmployee = payroll.getEmployee(newWallet);

        assertEq(updatedEmployee.primaryWallet, newWallet, "Primary wallet address not updated correctly");
        assertEq(idFromOldAddress, updatedEmployee.employeeId);

        // Use the old wallet address to fetch the Employee struct - should be all 0 now.
        PayrollGas.Employee memory oldEmployee = payroll.getEmployee(employee1);

        payroll.getEmployee(employee1);
        assertEq(oldEmployee.primaryWallet, address(0));

    }

    function test_updateWalletMultiEmployees() public {
        // add employee1 for testing
        payroll.addEmployee(employee2, true, 52000);
        payroll.addEmployee(employee3, true, 52000);
        payroll.addEmployee(employee1, true, 52000);
        payroll.addEmployee(employee4, true, 52000);
        payroll.addEmployee(employee5, true, 52000);
        // grab employee1 struct
        PayrollGas.Employee memory employee = payroll.getEmployee(employee1);
        bytes32 idFromOldAddress = employee.employeeId;

        address newWallet = vm.addr(69);
        vm.prank(employee1);
        // update employee1's wallet
        payroll.changePrimaryWalletAddress(employee1, newWallet);

        // Fetch the updated employee record using the new wallet address
        PayrollGas.Employee memory updatedEmployee = payroll.getEmployee(newWallet);

        assertEq(updatedEmployee.primaryWallet, newWallet, "Primary wallet address not updated correctly");
        assertEq(idFromOldAddress, updatedEmployee.employeeId);

        // Use the old wallet address to fetch the Employee struct - should be all 0 now.
        PayrollGas.Employee memory oldEmployee = payroll.getEmployee(employee1);
        assertEq(oldEmployee.primaryWallet, address(0));

    }

    function test_canChangePaymentSplits() public {
        payroll.addEmployee(employee1, true, 52000);
        payroll.setPaymentSplits(employee1, [20,20,20,20,20]);

        PayrollGas.PaymentSplit memory paymentSplits = payroll.getEmployeePaymentSplits(employee1);

        assertEq(paymentSplits.paySplitPercentageNative, 20);
        assertEq(paymentSplits.paySplitPercentage1, 20);
        assertEq(paymentSplits.paySplitPercentage2, 20);
        assertEq(paymentSplits.paySplitPercentage3, 20);
        assertEq(paymentSplits.paySplitPercentage4, 20);
        //assertEq(paymentSplits.paySplitPercentage5, 20);
        
    }

    function test_removeEmployee() public {
        payroll.addEmployee(employee2, true, 52000);
        payroll.addEmployee(employee3, true, 52000);
        payroll.addEmployee(employee1, true, 52000);
        payroll.addEmployee(employee4, true, 52000);
        payroll.addEmployee(employee5, true, 52000);

        address[] memory salaryEmployees = payroll.getSalariedEmployees();
        uint256 length = salaryEmployees.length;
        //console2.log();
        assertEq(length, 5);

        payroll.removeEmployee(employee1);

        address[] memory salaryEmployeesRemoved = payroll.getSalariedEmployees();
        uint256 lengthRemoved = salaryEmployeesRemoved.length;
        assertEq(lengthRemoved, 4);


    }

    ///////////////////////////
    /// CCIP Contract Tests ///
    ///////////////////////////
    //@note should fork test these
    // function test_canAllowlistDestinationChain() public {
    //     // address owner = ccip.owner();
    //     // vm.prank(owner);
    //     ccip.allowlistDestinationChain(i_destinationChainIdEth, true);
    //     // 11/22 added to contract - wont work on current fork
    //     assertEq(ccip.isChainIdAllowed(i_destinationChainIdEth), true);
    // }

    // function test_canDelistChainId() public {
    //     //vm.stratPrank(employeerAddress);
    //     ccip.allowlistDestinationChain(i_destinationChainIdEth, true);
    //     assertEq(ccip.isChainIdAllowed(i_destinationChainIdEth), true);

    //     ccip.allowlistDestinationChain(i_destinationChainIdEth, false);
    //     assertEq(ccip.isChainIdAllowed(i_destinationChainIdEth), false);
    // }

}


    
