const CONTRACT_ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_truflationTesterAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_updateInterval",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_priceFeedAddress",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "checkUpkeep",
        outputs: [
            {
                internalType: "bool",
                name: "upkeepNeeded",
                type: "bool",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "getAdjustedPriceInUSD",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "lastUpdateTimes",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "performUpkeep",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_basePriceUSD",
                type: "uint256",
            },
        ],
        name: "setBasePriceInUSD",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]
const CONTRACT_ADDRESS = "0x08511Dd62d81B59184B2FE718b8a9384E96497bE"

export { CONTRACT_ABI, CONTRACT_ADDRESS }
