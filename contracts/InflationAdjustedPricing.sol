// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./TruflationTester.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract InflationAdjustedPricing is AutomationCompatibleInterface {
    TruflationTester internal truflationTester;
    AggregatorV3Interface internal priceFeed;

    uint256 internal updateInterval;
    mapping(address => uint256) internal basePrices;
    mapping(address => uint256) public lastUpdateTimes;

    constructor(
        address _truflationTesterAddress,
        uint256 _updateInterval,
        address _priceFeedAddress
    ) {
        truflationTester = TruflationTester(_truflationTesterAddress);
        updateInterval = _updateInterval;
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    // function setBasePrice(uint256 _basePrice) public {
    //     basePrices[msg.sender] = _basePrice;
    //     lastUpdateTimes[msg.sender] = block.timestamp;
    // }

    function getAdjustedPrice(address user) internal view returns (uint256) {
        int256 yoyInflationWei = truflationTester.yoyInflationWei();
        int256 inflationMultiplier = (10000 + yoyInflationWei / 1e18);
        uint256 adjustedPrice = (uint256(inflationMultiplier) * basePrices[user]) / 10000;
        return adjustedPrice;
    }

    function getLatestEthUsdPrice() internal view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    function setBasePriceInUSD(uint256 _basePriceUSD) public {
        int256 ethUsdPrice = getLatestEthUsdPrice();
        uint256 basePriceWei = (_basePriceUSD * 1e18) / uint256(ethUsdPrice);
        basePrices[msg.sender] = basePriceWei;
        lastUpdateTimes[msg.sender] = block.timestamp;
    }

    function getAdjustedPriceInUSD(address user) public view returns (uint256) {
        uint256 adjustedPriceWei = getAdjustedPrice(user);
        int256 ethUsdPrice = getLatestEthUsdPrice();
        uint256 adjustedPriceUSD = (adjustedPriceWei * uint256(ethUsdPrice)) / 1e18;
        return adjustedPriceUSD;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    ) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp - lastUpdateTimes[msg.sender]) > updateInterval;
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        if ((block.timestamp - lastUpdateTimes[msg.sender]) > updateInterval) {
            lastUpdateTimes[msg.sender] = block.timestamp;
            basePrices[msg.sender] = getAdjustedPrice(msg.sender);
        }
    }
}
