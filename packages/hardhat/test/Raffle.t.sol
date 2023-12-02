// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {RaffleNoVrf} from "../contracts/RaffleNoVrf.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
import {ERC721Mock} from "@openzeppelin/contracts/mocks/ERC721Mock.sol";
import {ERC1155Mock} from "@openzeppelin/contracts/mocks/ERC1155Mock.sol";
import {TokenTransferor} from "../contracts/TokenTransferor.sol";

contract RaffleTest is Test {
    RaffleNoVrf public raffleContract;
    ERC20Mock public mock20;
    ERC721Mock public mock721;
    ERC1155Mock public mock1155;
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





function setUp() public {
    mock20 = new ERC20Mock("ERC20Token", "COIN", address(this), 18);
    mock721 = new ERC721Mock("Name", "NFT");
    mock1155 = new ERC1155Mock("URI");
    raffleContract = new RaffleNoVrf();

}

function test_CreateRaffle() public {
    bytes32 raffleId = raffleContract.createRaffle(RaffleNoVrf.RaffleType.ERC20, (block.timestamp + 10 minutes), address(mock20), 0, 20, 0);

    RaffleNoVrf.RaffleInfo memory raffleInfo = raffleContract.getRaffleInfo(raffleId);

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


}