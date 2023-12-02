// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {Payroll} from "../../contracts/Payroll.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {TokenTransferor} from "../../contracts/TokenTransferor.sol";

contract PayRollForkTest is Test {

    // struct Employee { 
    //     // Unique identifier for the employee - hash of the originally assigned wallet and block.timestamp
    //     bytes32 employeeId;
    //     // Primary wallet address of the employee, could be used on any chain, is updateable by employee or employeer
    //     address primaryWallet;
    //     bool isSalary;
    //     bool localChainPayment;
    //     uint256 payRate;
    //     // the split information for each chain
    //     PaymentSplit paymentSplits; 
    // }

    // struct PaymentSplit {
    //     // The percentage of pay to be sent to those chains
    //     uint8 paySplitPercentageEth; 
    //     uint8 paySplitPercentageOp; 
    //     //uint8 paySplitPercentageAvax; 
    //     //uint8 paySplitPercentageArb; 
    //     uint8 paySplitPercentagePolygon; 
    //     uint8 paySplitPercentageBnb; 
    //     uint8 paySplitPercentageBase; 
    // }
    
    // eth sepolia
    uint64 public immutable i_destinationChainIdEth = 16015286601757825753;
    // OP goerli
    uint64 public immutable i_destinationChainIDdOP = 2664363617261496610;
    // Avax Fuji
    // uint64 public immutable i_destinationChainIdAvax = 14767482510784806043;
    // ARB Goerli
    // uint64 public immutable i_destinationChainIdArb = 6101244977088475029; 
    // Polygon Mumbai
    uint64 public immutable i_destinationChainIdPolygon = 12532609583862916517;
    // BNB Testnet
    uint64 public immutable i_destinationChainIdBnb = 13264668187771770619;
    // Base Goreli
    uint64 public immutable i_destinationChainIdBase = 5790810961207155433;

    Payroll public payroll;
    IERC20 public bnmToken;
    address public employeerAddress;
    TokenTransferor public ccip;

    uint256 fujiFork;
    string AVALANCHE_FUJI_URL = vm.envString("AVALANCHE_FUJI_URL");

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
        fujiFork = vm.createFork(AVALANCHE_FUJI_URL);
        vm.selectFork(fujiFork);

        employeerAddress = 0x5a2B59bad54c7561C14755d70f8E6937e81857a5;
        ccip = TokenTransferor(payable(0xFfbCedcDE7a51cd29010c17f8e3aff6665C6Ac4f));
        bnmToken = IERC20(0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4);
        payroll = Payroll(0x77091418C1ceB29FAD114ebB39CEb7b4c067911A);

        //vm.prank(employeerAddress);
        //ccip.addToWhitelist(address(payroll));
        //console2.log(ccip.owner());
        //might want to mint tokens 
    }

    function testfork_setUp() public {
        assertEq(payroll.owner(), employeerAddress);
    }

    //////////////////////////////
    /// Whitelisting on CCIP   ///
    //////////////////////////////
    function testfork_canWhitelistAddress() public {
        vm.prank(employeerAddress);
        ccip.addToWhitelist(employee2);

        assertEq(ccip.isWhitelisted(employee2), true);
    }

    // function testfork_canAllowlistDestinationChain() public {
    //     vm.prank(employeerAddress);
    //     ccip.allowlistDestinationChain(i_destinationChainIdEth, true);
    //     // 11/22 added to contract - wont work on current fork
    //     assertEq(ccip.isChainIdAllowed(i_destinationChainIdEth, true));
    // }

    // function testfork_canDelistChainId() public {
    //     vm.stratPrank(employeerAddress);
    //     ccip.allowlistDestinationChain(i_destinationChainIdEth, true);
    //     assertEq(ccip.isChainIdAllowed(i_destinationChainIdEth, true));

    //     ccip.allowlistDestinationChain(i_destinationChainIdEth, false);
    //     assertEq(ccip.isChainIdAllowed(i_destinationChainIdEth, false));
    // }

    function testfork_canAddEmployeeForked() public {
        vm.startPrank(employeerAddress);
        payroll.addEmployee(employee1, true, 52000);

        Payroll.Employee memory employee = payroll.getEmployee(employee1);
        Payroll.PaymentSplit memory paymentSplits = payroll.getEmployeePaymentSplits(employee1);

        assertEq(employee.employeeId, keccak256(abi.encodePacked(employee1, block.timestamp)));
        assertEq(employee.primaryWallet, employee1);
        assertEq(employee.isSalary, true);
        //assertEq(employee.localChainPayment, true);
        assertEq(employee.payRate, 52000);
        assertEq(paymentSplits.paySplitPercentageNative, 100);
    }
    
    //////////////////////////////
    /// Setting / Changing Pay ///
    //////////////////////////////
    function testfork_canSetEmployeeSalary() public {
        vm.startPrank(employeerAddress);
        payroll.addEmployee(employee1, true, 52000);
        payroll.setEmployeeSalary(employee1, true, 100000);

        Payroll.Employee memory employee = payroll.getEmployee(employee1);

        assertEq(employee.payRate, 100000);
    }

    function testfork_canChangePayToHourly() public {
        vm.startPrank(employeerAddress);
        payroll.addEmployee(employee1, true, 52000);
        payroll.setEmployeeSalary(employee1, false, 100000);

        Payroll.Employee memory employee = payroll.getEmployee(employee1);

        assertEq(employee.isSalary, false);
    }

    function testfork_canChangePayToSalary() public {
        vm.startPrank(employeerAddress);
        payroll.addEmployee(employee1, false, 52000);
        payroll.setEmployeeSalary(employee1, true, 100000);

        Payroll.Employee memory employee = payroll.getEmployee(employee1);

        assertEq(employee.isSalary, true);
    }

    function testfork_getOwner() public {
        address owner = ccip.owner();
        assertEq(owner, employeerAddress);
    }

 
 // set `block.number` of a fork
    function testCanSetForkBlockNumber() public {
        vm.selectFork(fujiFork);
        vm.rollFork(28_022_107);

        assertEq(block.number, 28_022_107);
    }

    function test_canSelectFork() public {
        vm.selectFork(fujiFork);
        assertEq(vm.activeFork(), fujiFork);
    }
}