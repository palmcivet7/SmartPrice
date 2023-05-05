const { expect } = require("chai")
const { ethers } = require("hardhat")
const { BigNumber } = require("ethers")
const {
    oracleid,
    jobid,
    fee,
    token,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../../helper-hardhat-config")

describe("InflationAdjustedPricing", function () {
    let TruflationTester, truflationTester, InflationAdjustedPricing, inflationAdjustedPricing
    const updateInterval = 600
    const basePriceUSD = BigNumber.from(1000)

    beforeEach(async () => {
        // Deploy and configure PriceFeed (AggregatorV3Interface) contract
        const PriceFeed = await ethers.getContractFactory("MockV3Aggregator")
        priceFeed = await PriceFeed.deploy(DECIMALS, INITIAL_ANSWER)
        await priceFeed.deployed()

        // Deploy TruflationTester contract
        TruflationTester = await ethers.getContractFactory("TruflationTester")
        truflationTester = await TruflationTester.deploy(oracleid, jobid, fee, token)
        await truflationTester.deployed()

        // Deploy InflationAdjustedPricing contract
        InflationAdjustedPricing = await ethers.getContractFactory("InflationAdjustedPricing")
        inflationAdjustedPricing = await InflationAdjustedPricing.deploy(
            truflationTester.address,
            updateInterval,
            priceFeed.address
        )
        await inflationAdjustedPricing.deployed()
    })

    it("Should set base price in USD and get adjusted price in USD", async function () {
        const [owner] = await ethers.getSigners()

        // Set the base price in USD
        await inflationAdjustedPricing.connect(owner).setBasePriceInUSD(basePriceUSD)

        // Get the adjusted price in USD
        const adjustedPriceUSD = await inflationAdjustedPricing
            .connect(owner)
            .getAdjustedPriceInUSD(owner.address)

        // Check if the adjusted price in USD is greater than or equal to the base price in USD
        expect(adjustedPriceUSD).to.be.at.least(basePriceUSD)
    })

    it("Should update the adjusted price in USD after the update interval", async function () {
        const [owner] = await ethers.getSigners()

        // Set the base price in USD
        await inflationAdjustedPricing.connect(owner).setBasePriceInUSD(basePriceUSD)

        // Get the initial adjusted price in USD
        const initialAdjustedPriceUSD = await inflationAdjustedPricing
            .connect(owner)
            .getAdjustedPriceInUSD(owner.address)

        // Fast-forward time by the update interval
        await ethers.provider.send("evm_increaseTime", [updateInterval])
        await ethers.provider.send("evm_mine")

        // Call performUpkeep with an empty bytes array as the argument
        await inflationAdjustedPricing.connect(owner).performUpkeep("0x")

        // Get the updated adjusted price in USD
        const updatedAdjustedPriceUSD = await inflationAdjustedPricing
            .connect(owner)
            .getAdjustedPriceInUSD(owner.address)

        // Check if the updated adjusted price in USD is greater than the initial adjusted price in USD
        expect(updatedAdjustedPriceUSD).to.be.at.least(initialAdjustedPriceUSD)
    })
})
