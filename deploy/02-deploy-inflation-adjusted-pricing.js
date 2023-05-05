const { network } = require("hardhat")
const {
    developmentChains,
    TESTER_ADDRESS,
    TEST_INTERVAL,
    GOERLI_TESTER_ADDRESS,
    MUMBAI_TESTER_ADDRESS,
    MOCKV3AGGREGATOR,
    V3AGGREGATOR,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("---------------------------------------")
    const testerAddress = developmentChains.includes(network.name)
        ? TESTER_ADDRESS
        : MUMBAI_TESTER_ADDRESS
    const priceFeedAddress = developmentChains.includes(network.name)
        ? MOCKV3AGGREGATOR
        : V3AGGREGATOR
    const args = [testerAddress, TEST_INTERVAL, priceFeedAddress]
    const inflationAdjustedPricing = await deploy("InflationAdjustedPricing", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(inflationAdjustedPricing.address, args)
    }
    log("---------------------------------------")
}

module.exports.tags = ["all", "pricing"]
