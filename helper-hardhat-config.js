const networkConfig = {
    5: {
        name: "goerli",
    },
}

const developmentChains = ["hardhat", "localhost"]
const oracleid = "0x6888BdA6a975eCbACc3ba69CA2c80d7d7da5A344"
const jobid = "d220e5e687884462909a03021385b7ae"
const fee = "500000000000000000"
const token = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"

const TESTER_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const GOERLI_TESTER_ADDRESS = "0xcfB1d3fcAfa03DBeA4A67D6e9e5071F450098588"
const MUMBAI_TESTER_ADDRESS = "0x544d8bE957FBb07042E30922Ea1fE86b4BD757ab"
const TEST_INTERVAL = "600"
const MOCKV3AGGREGATOR = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const V3AGGREGATOR = "0x0715A7794a1dc8e42615F059dD6e406A6594651A"
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = {
    networkConfig,
    developmentChains,
    oracleid,
    jobid,
    fee,
    token,
    TESTER_ADDRESS,
    TEST_INTERVAL,
    GOERLI_TESTER_ADDRESS,
    MUMBAI_TESTER_ADDRESS,
    MOCKV3AGGREGATOR,
    V3AGGREGATOR,
    DECIMALS,
    INITIAL_ANSWER,
}
