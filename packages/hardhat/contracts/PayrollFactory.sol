// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {TokenTransferor} from "./TokenTransferor.sol";
import {Payroll} from "./Payroll.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";

contract PayrollFactory is Ownable {
    // Set the deployment fee
    uint256 public deployment_fee = 1 wei; // Example fee
    
    IRouterClient public router;
    IERC20 public linkToken;
    IERC20 public paymentToken;

    error InvalidAddress();
    error InsufficientFunds(uint256 amount);

    event TokenTransferorDeployed(address indexed deployer, address contractAddress);
    event PayrollDeployed(address indexed deployer, address contractAddress, address tokenTransferorAddress);

    ///@param _router The address of the Chainlink Router for local chain
    ///@param _linkToken The address of the LINK token for local chain
    ///@param _paymentToken The address of the payment token for Payroll Contract on native chain
    constructor(address _router, address _linkToken, address _paymentToken) {
        router = IRouterClient(_router);
        linkToken = IERC20(_linkToken);
        paymentToken = IERC20(_paymentToken);
    }

    ///@dev Deploys TokenTransferor and Payroll contracts
    function deployPayrollAndTokenTransferor() external payable returns (address payrollAddress, address tokenTransferorAddress) {
        if(msg.value < deployment_fee){
            revert InsufficientFunds(msg.value);
        } 

        tokenTransferorAddress = deployTokenTransferor();
        payrollAddress = deployPayroll(tokenTransferorAddress);
        return (payrollAddress, tokenTransferorAddress);
    }

    // Function to deploy TokenTransferor
    ///@dev transfers ownership of TokenTransferor to caller of deployPayrollAndTokenTransferor
    function deployTokenTransferor() internal returns (address) {
        //require(msg.value >= deployment_fee, "Insufficient funds sent for deployment");

        TokenTransferor newTokenTransferor = new TokenTransferor(address(router), address(linkToken));
        newTokenTransferor.transferOwnership(msg.sender);  
        emit TokenTransferorDeployed(msg.sender, address(newTokenTransferor));
        return address(newTokenTransferor);
    }

    /// Function to deploy Payroll
    ///@dev transfers ownership of Payroll to caller of deployPayrollAndTokenTransferor
    ///@param tokenTransferorAddress The address of the newly deployed TokenTransferor contract
    function deployPayroll(address tokenTransferorAddress) internal returns (address) {
        //require(msg.value >= deployment_fee, "Insufficient funds sent for deployment");

        Payroll newPayroll = new Payroll(tokenTransferorAddress, address(paymentToken));
        newPayroll.transferOwnership(msg.sender);  // Transfer ownership
        emit PayrollDeployed(msg.sender, address(newPayroll), tokenTransferorAddress);
        return address(newPayroll);
    }

    /// Functions to update deployment params so that they can be changed in the future or for deployment on other chains
    function updateDeploymentFee(uint256 newFee) external onlyOwner {
        deployment_fee = newFee;
    }

    function changeRouter(address newRouter) external onlyOwner {
        router = IRouterClient(newRouter);
    }

    function changeLinkToken(address newLinkToken) external onlyOwner {
        linkToken = IERC20(newLinkToken);
    }

    function changePaymentToken(address newPaymentToken) external onlyOwner {
        paymentToken = IERC20(newPaymentToken);
    }

    // Fallback function to receive ETH
    receive() external payable {}

    // Function to withdraw collected fees
    function withdrawFees(address payable _beneficiary) public onlyOwner {
        // Only contract owner should be able to withdraw fees
        // Implement ownership and access control
        if (_beneficiary == address(0)) {
            revert InvalidAddress();
        }
        _beneficiary.transfer(address(this).balance);
    }
}
