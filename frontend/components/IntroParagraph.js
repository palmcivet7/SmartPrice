import React from "react"
import styles from "../styles/IntroParagraph.module.css"

const IntroParagraph = () => {
    return (
        <div className={styles.introContainer}>
            <p className={styles.introParagraph}>
                Welcome to SmartPrice, an inflation-adjusted pricing service built on the Web3
                technology stack. Submit a price to our smart contract and check back as often as
                you like for a cryptographically guaranteed, inflation-adjusted price.
                <br />
                <br />
                SmartPrice utilizes{" "}
                <a href="https://chain.link/" target="_blank" rel="noopener noreferrer">
                    Chainlink Oracles
                </a>{" "}
                for fetching real-time inflation data from{" "}
                <a href="https://truflation.com/" target="_blank" rel="noopener noreferrer">
                    Truflation
                </a>
                , and Chainlink Automation for updating the price. Currently, only whole number
                dollar values can be submitted. SmartPrice is available on the Polygon Mumbai
                testnet.
            </p>
        </div>
    )
}

export default IntroParagraph
