const { network } = require("hardhat")
const { developmentChains, oracleid, jobid, fee, token } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("---------------------------------------")
    const args = [oracleid, jobid, fee, token]
    const truflationTester = await deploy("TruflationTester", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(truflationTester.address, args)
    }
    log("---------------------------------------")
}

module.exports.tags = ["all", "truflationtester"]
