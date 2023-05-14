import { ConnectButton } from "web3uikit"
import Link from "next/link"
import styles from "../styles/Home.module.css"

export default function Header() {
    return (
        <nav className={styles.nav}>
            <h1 className={styles.title}>SmartPrice</h1>
            <div className="flex flex-row items-center">
                <Link
                    href="https://mumbai.polygonscan.com/address/0x08511dd62d81b59184b2fe718b8a9384e96497be#code"
                    className="mr-4 p-6"
                    target="blank"
                >
                    Contract
                </Link>
                <Link
                    href="https://github.com/palmcivet7/cl-truflation-price-adjust"
                    className="mr-4 p-6"
                    target="blank"
                >
                    Github
                </Link>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
