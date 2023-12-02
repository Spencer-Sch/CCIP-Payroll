// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

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

    event TokenTransferorDeployed(address indexed deployer, address contractAddress);
    event PayrollDeployed(address indexed deployer, address contractAddress, address tokenTransferorAddress);

    constructor(address _router, address _linkToken, address _paymentToken) {
        router = IRouterClient(_router);
        linkToken = IERC20(_linkToken);
        paymentToken = IERC20(_paymentToken);
    }

    function deployPayrollAndTokenTransferor() external payable returns (address payrollAddress, address tokenTransferorAddress) {
        require(msg.value >= deployment_fee, "Insufficient funds sent for deployment");

        tokenTransferorAddress = deployTokenTransferor();
        payrollAddress = deployPayroll(tokenTransferorAddress);
        return (payrollAddress, tokenTransferorAddress);
    }

    // Function to deploy TokenTransferor
    ///@dev Transfer ownership is done in 2 steps for TokenTransferor. New Owner must call acceptOwnership() on TokenTransferor.
    function deployTokenTransferor() internal returns (address) {
        //require(msg.value >= deployment_fee, "Insufficient funds sent for deployment");

        TokenTransferor newTokenTransferor = new TokenTransferor(address(router), address(linkToken));
        newTokenTransferor.transferOwnership(msg.sender);  
        emit TokenTransferorDeployed(msg.sender, address(newTokenTransferor));
        return address(newTokenTransferor);
    }

    // Function to deploy Payroll
    function deployPayroll(address tokenTransferorAddress) internal returns (address) {
        //require(msg.value >= deployment_fee, "Insufficient funds sent for deployment");

        Payroll newPayroll = new Payroll(tokenTransferorAddress, address(paymentToken));
        newPayroll.transferOwnership(msg.sender);  // Transfer ownership
        emit PayrollDeployed(msg.sender, address(newPayroll), tokenTransferorAddress);
        return address(newPayroll);
    }

    function updateDeploymentFee(uint256 newFee) external onlyOwner {
        deployment_fee = newFee;
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
