# Inflation Adjusted Pricing Contract
This project contains a smart contract for **adjusting the pricing of goods or services based on yearly inflation data**. The inflation data is fetched using [Chainlink](https://chain.link/) Oracles and provided by the [Truflation](https://truflation.com/) data feed. The contract uses [Chainlink Pricefeeds](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon#Mumbai%20Testnet) and is automated using [Chainlink Automation](https://docs.chain.link/docs/chainlink-automation/).

[Live demo on Mumbai Testnet](https://mumbai.polygonscan.com/address/0xbf6B0Eb274aa57d4DFAC2ca262Fb6Bd04C7573F3#code).

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Deployment](#deployment)
- [Testing](#testing)
- [License](#license)

## Overview
The InflationAdjustedPricing contract is designed to work with the TruflationTester contract, which retrieves yearly inflation data from the Truflation data feed via Chainlink oracles. The InflationAdjustedPricing contract allows users to set a base price for their product or service, and the contract will adjust the price according to the yearly inflation data. The base price is set, and the adjusted price is received using Chainlink Pricefeeds. It should be noted only whole dollar values can be used, ie. 1, 5, 7, 100 etc. Additionally, the contract utilizes Chainlink Automation to periodically update the adjusted price based on the specified update interval.

## Installation
To install the necessary dependencies, first ensure that you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed. Then, run the following command in the project's root directory:
```
yarn install
```
This project uses the [Hardhat](https://hardhat.org/) developer environment.

## Deployment
Deploy the TruflationTester contract first using the following command:
```
yarn hardhat deploy --tags truflationtester
```

Update the helper-hardhat-config.js file with the correct TESTER_ADDRESS and GOERLI_TESTER_ADDRESS values for your deployment.

To deploy the InflationAdjustedPricing contract to your desired network, run the following command:
```
yarn hardhat deploy --tags pricing --network <network-name>
```
Replace <network-name> with the name of the network you'd like to deploy to, such as localhost, hardhat, or goerli.

Please note what [networks](https://github.com/truflation/quickstart/blob/main/network.md) Truflation's data is available on.

## Testing
To run the unit tests for the InflationAdjustedPricing contract, execute the following command:
```
yarn hardhat test
```

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).
