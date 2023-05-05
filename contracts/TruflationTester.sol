// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract TruflationTester is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    int256 public yoyInflationWei;
    address public oracleId;
    string public jobId;
    uint256 public fee;

    constructor(
        address oracleId_,
        string memory jobId_,
        uint256 fee_,
        address token_
    ) ConfirmedOwner(msg.sender) {
        setChainlinkToken(token_);
        oracleId = oracleId_;
        jobId = jobId_;
        fee = fee_;
    }

    function requestYoyInflationWei() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            bytes32(bytes(jobId)),
            address(this),
            this.fulfillYoyInflationWei.selector
        );
        req.add("service", "truflation/current");
        req.add("keypath", "yearOverYearInflation");
        req.add("abi", "int256");
        req.add("multiplier", "1000000000000000000");
        req.add("refundTo", Strings.toHexString(uint160(msg.sender), 20));
        return sendChainlinkRequestTo(oracleId, req, fee);
    }

    function fulfillYoyInflationWei(
        bytes32 _requestId,
        int256 _inflation
    ) public recordChainlinkFulfillment(_requestId) {
        yoyInflationWei = _inflation;
    }

    function changeOracle(address _oracle) public onlyOwner {
        oracleId = _oracle;
    }

    function changeJobId(string memory _jobId) public onlyOwner {
        jobId = _jobId;
    }

    function changeFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function getChainlinkToken() public view returns (address) {
        return chainlinkTokenAddress();
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }
}
