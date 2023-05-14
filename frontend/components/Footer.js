// components/Footer.js
import React from "react"
import styles from "../styles/Home.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                &copy; {new Date().getFullYear()} SmartPrice by{" "}
                <a href="https://etherscan.io/address/palmcivet.eth/" target="_blank">
                    palmcivet.eth
                </a>
                . All rights reserved.
            </p>
        </footer>
    )
}

export default Footer
