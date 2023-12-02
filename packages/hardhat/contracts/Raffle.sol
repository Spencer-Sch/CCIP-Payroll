//SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {ITokenTransferor} from "./interfaces/ITokenTransferor.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";



// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

contract Raffle is AccessControl, ReentrancyGuard, VRFConsumerBaseV2 {
    
    ITokenTransferor public ccip;
    //VRFCoordinatorV2Interface private immutable i_vrfCoordinator;

    //////////////
    /// ERRORS ///
    //////////////
    error InvalidRaffle(bytes32 _raffleId);
    error AlreadyEntered(address _usr);
    error RaffleClosed();
    error RaffleStillOpen();
    //////////////
    /// EVENTS ///
    //////////////

    event RequestSent(uint256 requestId, uint32 numWords);
    event AddedToRaffle(address usr, bytes32 raffleId);

    event RequestFulfilled(
        uint256 requestId,
        uint256[] randomWords,
        bytes32 raffleId
    );

    address[] public entrants;

    //////////////
    // Mappings //
    //////////////

    /// requestId --> requestStatus 
    mapping(uint256 => RequestStatus) public s_requests; 

    /// mapping of vrf requestId to vrfInfo struct
    mapping(uint256 => vrfInfo) public chainlinkRaffleInfo;

    /// raffleId --> raffleInfo
    mapping(bytes32 => RaffleInfo) public raffle;

    /// raffleId --> entrants
    mapping(bytes32 => address[]) public raffleEntrants;

    /// mapping of raffleId to address to index in entrants array of that raffles entrants[]
    mapping (bytes32 => mapping(address => uint256)) public raffleEntryIndex;


    struct RaffleInfo {
        Status status;
        RaffleType raffleType;
        bytes32 id; // uniqueId for each raffle
        uint256 endTime; // ending timestamp 
        uint256 randomNumber; // random number from VRF to pick winner from array
        address prize; // address of the raffle prize
        uint256 prizeId; // Id of raffle prize if necessary
        uint256 prizeAmount; // amount of prize if necessary
        uint256 entryFee; // fee to enter raffle if necessary
        bool randomNumberAvailable; // has the contract recieved a number from Chainlink
        address winner; // winner of the raffle
    }

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }

    struct vrfInfo {
        bytes32 id; // raffle id
        uint256 size; // size of entry array
    }

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

    /////////////////////
    /// VRF Variables ///
    /////////////////////

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;

    // Your VRF V2 coordinator subscription ID.
    uint64 private immutable i_subscriptionId;

    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 5;
    uint8 private constant NUM_WORDS = 1;

    /////////////////
    /// Modifiers /// 
    /////////////////

    // modifier onlyAdmin() {
    //     require(msg.sender == admin), "Only admin can call this function");
    //     _;
    // }

    constructor(uint64 subscriptionId, bytes32 gasLane, uint32 callbackGasLimit, address vrfCoordinatorV2)
            //address payable destinationWallet
            VRFConsumerBaseV2(vrfCoordinatorV2) {
                i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
                i_subscriptionId = subscriptionId;
                i_gasLane = gasLane;
                i_callbackGasLimit = callbackGasLimit;
            }
    
    receive() external payable {}

    function withdrawEthFees(address _to) external /**access control */{
        uint256 amount = address(this).balance;
        (bool sent, ) = _to.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function withdrawERC20TokenFees(address _to, address _token) external /**access */ {
        uint256 amount = IERC20(_token).balanceOf(address(this));
        (bool sent) = IERC20(_token).transfer(_to, amount);
        require(sent, "Failed ERC20 Token Transfer");
    }

    //////////////////////////
    ///// VRFv2 functions ////
    //////////////////////////

    // this function is called be performUpkeep once a raffle has met the conditions for ending.
    // It will request a random number from the VRF and save the raffleId and the number of entries in the raffle in a map.
    // If a request is successful, the callback function, fulfillRandomWords will be called.
    // @param _id is the raffleID
    // @param _entriesSize is the number of entries in the raffle
    // @return requestId is the requestId generated by chainlink
    function requestRandomWords(
            bytes32 _raffleId
            // need to calc uint256 _entriesSize
        ) internal returns (uint256 requestId) {
            // Will revert if subscription is not set and funded.
            requestId = i_vrfCoordinator.requestRandomWords(
                i_gasLane,
                i_subscriptionId,
                REQUEST_CONFIRMATIONS,
                i_callbackGasLimit,
                NUM_WORDS
            );
            s_requests[requestId] = RequestStatus({
                randomWords: new uint256[](0),
                exists: true,
                fulfilled: false
            });

            requestIds.push(requestId);
            lastRequestId = requestId;

            uint256 numOfEntries = raffleEntrants[_raffleId].length - 1;

            // result is the requestId generated by chainlink. It is saved in a map linked to the param id
            chainlinkRaffleInfo[requestId] = vrfInfo({
                id: _raffleId,
                size: numOfEntries
            });
            emit RequestSent(requestId, NUM_WORDS);
            return requestId;
    }

    // This is the callback function called by the VRF when the random number is ready.
    // It will emit an event with the original raffleId and the random number.
    /// @param _requestId is the requestId generated by chainlink
    /// @param _randomWords is the random number generated by the VRF
    function fulfillRandomWords(
        uint256 _requestId, 
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
            
           
            // grabs RaffleInfo struct from raffle mapping.
            // uses chainlinkRaffleInfo[_requestId].id as the index which is a bytes32 raffleId
            RaffleInfo memory raffleInfo = raffle[chainlinkRaffleInfo[_requestId].id];

            raffleInfo.randomNumber =
                (_randomWords[0] % chainlinkRaffleInfo[_requestId].size) +
                1;
            raffleInfo.randomNumberAvailable = true;


            emit RequestFulfilled(
                _requestId,
                _randomWords,
                chainlinkRaffleInfo[_requestId].id
            );   
        // call the winning function / send what was wone to winner
        //transferNFTAndFunds(chainlinkRaffleInfo[_requestId].id);
    }

    function createRaffle(RaffleType  _raffleType, uint256 _endTime, address _prize, uint256 _prizeId, uint256 _prizeAmount, uint256 _entryFee) external returns (bytes32 raffleId) {
        //@note how can I make ID more random?
        raffleId = keccak256(abi.encodePacked(block.timestamp, msg.sender));

        RaffleInfo memory newRaffle = RaffleInfo({
            status: Status.PENDING,
            raffleType: _raffleType,
            id: raffleId,
            endTime: _endTime,
            randomNumber: 0,
            randomNumberAvailable: false,
            winner: address(0),
            prize: _prize,
            prizeId: _prizeId,
            prizeAmount: _prizeAmount,
            entryFee: _entryFee
        });

        raffle[raffleId] = newRaffle;
        //raffleEntrants[raffleId] = new address[];

    }

    function addToRaffle(address _usr, bytes32 _raffleId) external /**access */ {
        RaffleInfo memory raffleInfo = raffle[_raffleId];
        entrants = raffleEntrants[_raffleId];
        // raffle must be "open"
        if(raffleInfo.status != Status.PENDING) {
            revert InvalidRaffle(_raffleId);
        }

        if(block.timestamp >= raffleInfo.endTime){
            revert RaffleClosed();
        }
        // check if _usr is in the raffle
        if(raffleEntryIndex[_raffleId][_usr] != 0) {
            revert AlreadyEntered(_usr);
        }

        entrants.push(_usr);
        // can I just do this?
        //raffleEntryIndex[_usr] = entrants.length - 1;
        uint256 index = entrants.length - 1;
        raffleEntryIndex[_raffleId][_usr] = index;

        emit AddedToRaffle(_usr, _raffleId);

    }

    function enterRaffle(bytes32 _raffleId) external payable {
        RaffleInfo memory raffleInfo = raffle[_raffleId];
        entrants = raffleEntrants[_raffleId];

        if(raffleInfo.status != Status.PENDING) {
            revert InvalidRaffle(_raffleId);
        }

        if(block.timestamp >= raffleInfo.endTime){
            revert RaffleClosed();
        }

        if(raffleInfo.entryFee > 0 && msg.value != raffleInfo.entryFee) {
            require(msg.value == raffleInfo.entryFee, "Must send entry fee");
        }

        // check if _usr is in the raffle
        if(raffleEntryIndex[_raffleId][msg.sender] != 0) {
            revert AlreadyEntered(msg.sender);
        }

        entrants.push(msg.sender);
        // can I just do this?
        //raffleEntryIndex[_usr] = entrants.length - 1;
        uint256 index = entrants.length - 1;
        raffleEntryIndex[_raffleId][msg.sender] = index;

        emit AddedToRaffle(msg.sender, _raffleId);

    }

    function pickWinner(bytes32 _raffleId) public {
        RaffleInfo memory raffleInfo = raffle[_raffleId];
        entrants = raffleEntrants[_raffleId];

        // if(raffleInfo.status != Status.PENDING) {
        //     revert InvalidRaffle(_raffleId);
        // }
        if(block.timestamp < raffleInfo.endTime){
            revert RaffleStillOpen();
        }

        if(raffleInfo.raffleType == RaffleType.ERC721) {
            // do something
        } else if(raffleInfo.raffleType == RaffleType.ERC1155) {
            // do something
        } else if(raffleInfo.raffleType == RaffleType.ERC20) {
            // do something
        } else {
            revert InvalidRaffle(_raffleId);
        }

        raffleInfo.status = Status.DRAWING;
        raffle[_raffleId] = raffleInfo;

        requestRandomWords(_raffleId);
    }

    ///////////////////////////
    /// Getter / View Funcs ///
    ///////////////////////////

    function getRaffleInfo(bytes32 _raffleId) public view returns(RaffleInfo memory) {
        return raffle[_raffleId];
    }


}