// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {Raffle} from "../contracts/Raffle.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
import {ERC721Mock} from "@openzeppelin/contracts/mocks/ERC721Mock.sol";
import {ERC1155Mock} from "@openzeppelin/contracts/mocks/ERC1155Mock.sol";
import {VRFCoordinatorV2Mock} from "@chainlink/contracts/src/v0.8/mocks/VRFCoordinatorV2Mock.sol";
import {MockLinkToken} from "@chainlink/contracts/src/v0.8/mocks/MockLinkToken.sol";
import {TokenTransferor} from "../contracts/TokenTransferor.sol";

contract RaffleTest is Test {
    Raffle public raffleContract;
    ERC20Mock public mock20;
    ERC721Mock public mock721;
    ERC1155Mock public mock1155;
    VRFCoordinatorV2Mock public mockVRF;
    MockLinkToken public mockLink;
    //address public employeerAddress;
    TokenTransferor public ccip;

    /// Structs/enums from Raffle ///
    enum RaffleType {
        ERC1155,
        ERC721,
        ERC20
    }

    enum Status {
        PENDING,
        DRAWING,
        ENDING
    }


    // mumbai vrf info 
    // 6612
    // 0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f gaslane
    // 500000
    // 0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed vrf


function setUp() public {
    mock20 = new ERC20Mock("ERC20Token", "COIN", address(this), 18);
    mock721 = new ERC721Mock("Name", "NFT");
    mock1155 = new ERC1155Mock("URI");
    mockVRF = new VRFCoordinatorV2Mock(500, 5000);
    mockLink = new MockLinkToken();
    raffleContract = new Raffle(6612, 0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f, 500000, address(mockVRF));

}

//function createRaffle(RaffleType  _raffleType, uint256 _endTime, address _prize, uint256 _prizeId, uint256 _prizeAmount, uint256 _entryFee) external onlyOwner returns (bytes32 raffleId) {
//uint256 public endTime = block.timestamp + 10 minutes;

function createERC20RaffleRaffleType(/*RaffleType, uint256, address, uint256, uint256, uint256*/) public returns (bytes32 raffleId) {
    return raffleContract.createRaffle(Raffle.RaffleType.ERC20, (block.timestamp + 10 minutes), address(mock20), 0, 20, 0);
}

function createERC721RaffleRaffleType(/*RaffleType, uint256, address, uint256, uint256, uint256*/) public returns (bytes32 raffleId) {
    return raffleContract.createRaffle(Raffle.RaffleType.ERC721, (block.timestamp + 10 minutes), address(mock721), 1, 1, 0);
}

function createERC1155RaffleRaffleType(/*RaffleType, uint256, address, uint256, uint256, uint256*/) public returns (bytes32 raffleId) {
    return raffleContract.createRaffle(Raffle.RaffleType.ERC1155, (block.timestamp + 10 minutes), address(mock1155), 1, 1, 0);
}

function createERC1155MultipleRaffleRaffleType(/*RaffleType, uint256, address, uint256, uint256, uint256*/) public returns (bytes32 raffleId) {
    return raffleContract.createRaffle(Raffle.RaffleType.ERC1155, (block.timestamp + 10 minutes), address(mock1155), 1, 22, 0);
}

function test_CreateRaffle() public {
    bytes32 raffleId = raffleContract.createRaffle(Raffle.RaffleType.ERC20, (block.timestamp + 10 minutes), address(mock20), 0, 20, 0);

    Raffle.RaffleInfo memory raffleInfo = raffleContract.getRaffleInfo(raffleId);

    //assertEq(RaffleNoVrf.RaffleInfo.Status, 0);
    assertEq(raffleInfo.id, keccak256(abi.encodePacked(block.timestamp, address(this))));
    assertEq(raffleInfo.randomNumber, 0);
    assertEq(raffleInfo.randomNumberAvailable, false);
    assertEq(raffleInfo.winner, address(0));
    assertEq(raffleInfo.prize, address(mock20));
    assertEq(raffleInfo.prizeId, 0);
    assertEq(raffleInfo.prizeAmount, 20);
    assertEq(raffleInfo.entryFee, 0);
}

////////////////////////////////
/// Transfer To Raffle Tests ///
////////////////////////////////
function test_transferPrizeToRaffleWithERC20() public {
    address raffleCreator = makeAddr("raffleCreator");
    deal(address(mock20), raffleCreator, 21);
    
    vm.startPrank(raffleCreator);
    bytes32 raffleId = createERC20RaffleRaffleType();
    mock20.approve(address(raffleContract), 20);

    raffleContract.stakePrize(raffleId);

    assertEq(mock20.balanceOf(address(raffleContract)), 20);
    assertEq(mock20.balanceOf(raffleCreator), 1);

}

function test_transferPrizeToRaffleWithERC721() public {
    address raffleCreator = makeAddr("raffleCreator");
    mock721.mint(raffleCreator, 1);
    
    vm.startPrank(raffleCreator);
    bytes32 raffleId = createERC721RaffleRaffleType();
    mock721.setApprovalForAll(address(raffleContract), true);

    raffleContract.stakePrize(raffleId);

    assertEq(mock721.balanceOf(address(raffleContract)), 1);
    assertEq(mock721.balanceOf(raffleCreator), 0);
}

function test_transferPrizeToRaffleWithERC1155() public {
    address raffleCreator = makeAddr("raffleCreator");
    mock1155.mint(raffleCreator, 1, 1, "");
    
    vm.startPrank(raffleCreator);
    bytes32 raffleId = createERC1155RaffleRaffleType();
    mock1155.setApprovalForAll(address(raffleContract), true);

    raffleContract.stakePrize(raffleId);

    assertEq(mock1155.balanceOf(address(raffleContract), 1), 1);
    assertEq(mock1155.balanceOf(address(raffleCreator), 1), 0);
}

///////////////////////////////////////////////////
/// Transfer From Raffle to Winner Tests No VRF ///
///////////////////////////////////////////////////

// function test_sendERC20ToWinner() public {
//     address raffleCreator = makeAddr("raffleCreator");
//     address winner = makeAddr("winner");

//     deal(address(mock20), raffleCreator, 21);
    
//     vm.startPrank(raffleCreator);
//     bytes32 raffleId = createERC20RaffleRaffleType();
//     mock20.approve(address(raffleContract), 20);

//     raffleContract.stakePrize(raffleId);

//     assertEq(mock20.balanceOf(address(raffleContract)), 20);
//     assertEq(mock20.balanceOf(raffleCreator), 1);

//     vm.warp(10 minutes + 1 seconds);

//     raffleContract._transferPrizeToWinnerTest(raffleId, winner);

//     assertEq(mock20.balanceOf(address(raffleContract)), 0);
//     assertEq(mock20.balanceOf(raffleCreator), 1);
//     assertEq(mock20.balanceOf(winner), 20);
// }

// function test_sendERC721ToWinner() public {
//     address raffleCreator = makeAddr("raffleCreator");
//     address winner = makeAddr("winner");
//     mock721.mint(raffleCreator, 1);
    
//     vm.startPrank(raffleCreator);
//     bytes32 raffleId = createERC721RaffleRaffleType();
//     mock721.setApprovalForAll(address(raffleContract), true);

//     raffleContract.stakePrize(raffleId);

//     assertEq(mock721.balanceOf(address(raffleContract)), 1);
//     assertEq(mock721.balanceOf(raffleCreator), 0);

//     vm.warp(10 minutes + 1 seconds);

//     raffleContract._transferPrizeToWinnerTest(raffleId, winner);

//     assertEq(mock721.balanceOf(address(raffleContract)), 0);
//     assertEq(mock721.balanceOf(winner), 1);
// }

// function test_sendERC1155ToWinner() public {
//     address raffleCreator = makeAddr("raffleCreator");
//     address winner = makeAddr("winner");
//     mock1155.mint(raffleCreator, 1, 1, "");
    
//     vm.startPrank(raffleCreator);
//     bytes32 raffleId = createERC1155RaffleRaffleType();
//     mock1155.setApprovalForAll(address(raffleContract), true);

//     raffleContract.stakePrize(raffleId);

//     assertEq(mock1155.balanceOf(address(raffleContract), 1), 1);
//     assertEq(mock1155.balanceOf(address(raffleCreator), 1), 0);

//     vm.warp(10 minutes + 1 seconds);

//     raffleContract._transferPrizeToWinnerTest(raffleId, winner);

//     assertEq(mock1155.balanceOf(address(raffleContract), 1), 0);
//     assertEq(mock1155.balanceOf(address(raffleCreator), 1), 0);
//     assertEq(mock1155.balanceOf(address(winner), 1), 1);
// }

// function test_sendMultiERC1155ToWinner() public {
//     address raffleCreator = makeAddr("raffleCreator");
//     address winner = makeAddr("winner");
//     mock1155.mint(raffleCreator, 1, 30, "");
    
//     vm.startPrank(raffleCreator);
//     bytes32 raffleId = createERC1155MultipleRaffleRaffleType();
//     mock1155.setApprovalForAll(address(raffleContract), true);

//     raffleContract.stakePrize(raffleId);

//     assertEq(mock1155.balanceOf(address(raffleContract), 1), 22);
//     assertEq(mock1155.balanceOf(address(raffleCreator), 1), 8);

//     vm.warp(10 minutes + 1 seconds);

//     raffleContract._transferPrizeToWinnerTest(raffleId, winner);

//     assertEq(mock1155.balanceOf(address(raffleContract), 1), 0);
//     assertEq(mock1155.balanceOf(address(raffleCreator), 1), 8);
//     assertEq(mock1155.balanceOf(address(winner), 1), 22);
// }

////////////////////////////////
/// Test OnlyOwner Functions ///
////////////////////////////////
function test_fuzzOnlyOwnerCanChangeGasLimit(address caller) public {
    vm.assume(caller != address(0) && caller != raffleContract.owner());

    assertEq(raffleContract.getCurrentGasLimit(), 500000);

    vm.prank(caller);
    vm.expectRevert("Ownable: caller is not the owner");
    raffleContract.changeGasLimit(100000);

}

function test_onlyOwnerCanChangeGasLimit() public {
    assertEq(raffleContract.getCurrentGasLimit(), 500000);

    raffleContract.changeGasLimit(100000);

    assertEq(raffleContract.getCurrentGasLimit(), 100000);
}
}