import { useState } from "react"
import { ethers } from "ethers"
import { getContract } from "../utils/getContract"
import Meta from "../components/Meta"
import Header from "../components/Header"
import IntroParagraph from "../components/IntroParagraph"
import Footer from "../components/Footer"
import { Button, useNotification } from "web3uikit"
import styles from "../styles/Home.module.css"
import ImageComponent from "@/components/ImageComponent"

export default function Home() {
    const [basePrice, setBasePrice] = useState(0)
    const [adjustedPrice, setAdjustedPrice] = useState(0)
    const [basePriceError, setBasePriceError] = useState("")

    const dispatch = useNotification()

    const handleBasePriceSet = () => {
        dispatch({
            type: "success",
            message: "Base Price Set On-chain",
            title: "Price Submitted!",
            // icon,
            position: "topR",
        })
    }

    const handleBasePriceError = () => {
        dispatch({
            type: "error",
            message: "Please enter a valid price",
            title: "Error",
            // icon,
            position: "topR",
        })
    }

    function validateBasePrice() {
        if (isNaN(basePrice) || basePrice <= 0) {
            handleBasePriceError()
            return false
        } else {
            setBasePriceError("")
            return true
        }
    }

    async function setBasePriceInUSD() {
        if (!validateBasePrice()) {
            return
        }

        if (!window.ethereum) {
            alert("Please install MetaMask!")
            return
        }

        try {
            // Show the spinner
            document.getElementById("spinner").style.display = "inline-block"

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = getContract(provider)

            const tx = await contract.setBasePriceInUSD(basePrice)
            await tx.wait()

            // Hide the spinner
            document.getElementById("spinner").style.display = "none"

            // alert("Base price set!");
            handleBasePriceSet()
        } catch (error) {
            console.error(error)
            // Hide the spinner
            document.getElementById("spinner").style.display = "none"

            dispatch({
                type: "error",
                message: "An error occurred while submitting the base price.",
                title: "Error",
                position: "topR",
            })
        }
    }

    async function getAdjustedPriceInUSD() {
        if (!window.ethereum) {
            alert("Please install MetaMask!")
            return
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = getContract(provider)
            const signerAddress = await provider.getSigner().getAddress()

            const adjustedPriceUSD = await contract.getAdjustedPriceInUSD(signerAddress)
            setAdjustedPrice(adjustedPriceUSD.toString())
        } catch (error) {
            console.error(error)
            dispatch({
                type: "error",
                message: "An error occurred while fetching the SmartPrice.",
                title: "Error",
                position: "topR",
            })
        }
    }

    async function getLastPriceUpdateTime() {
        if (!window.ethereum) {
            alert("Please install MetaMask!")
            return
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = getContract(provider)
            const signerAddress = await provider.getSigner().getAddress()

            const lastUpdateTime = await contract.lastUpdateTimes(signerAddress)
            const timestamp = new Date(lastUpdateTime.toNumber() * 1000) // Convert the timestamp from seconds to milliseconds

            alert(`Last Time Price Submitted: ${timestamp.toLocaleString()}`)
        } catch (error) {
            console.error(error)
            dispatch({
                type: "error",
                message: "An error occurred while fetching the last time a price was submitted.",
                title: "Error",
                position: "topR",
            })
        }
    }

    return (
        <div>
            <Meta />
            <Header />
            <div className={styles.buttons}>
                <div className={styles.submitAndUpdate}>
                    <div className={styles.inputDiv}>
                        <p>$</p>
                        <input
                            className={styles.input}
                            type="number"
                            value={basePrice}
                            onChange={(e) => setBasePrice(e.target.value)}
                        />
                        <Button
                            onClick={(function noRefCheck() {}, setBasePriceInUSD)}
                            text="Submit Price"
                            theme="primary"
                        />
                        <div
                            className={styles.spinner}
                            id="spinner"
                            style={{ display: "none" }}
                        ></div>
                    </div>
                    {/* <Button visibility="hidden" text="Get SmartPrice" theme="primary" /> */}
                    <div className={styles.updateButton}>
                        <Button
                            onClick={(function noRefCheck() {}, getLastPriceUpdateTime)}
                            text="Last Price Submit"
                            theme="secondary"
                        />
                    </div>
                </div>
                <div className={styles.getSmartPrice}>
                    <Button
                        onClick={(function noRefCheck() {}, getAdjustedPriceInUSD)}
                        text="Get SmartPrice"
                        theme="primary"
                        size="xl"
                    />
                    <br />
                    {/* <div className={styles.spinner} id="spinner2" style={{ display: "none" }}></div> */}
                    <p>Your SmartPrice: ${adjustedPrice}</p>
                </div>
            </div>
            <IntroParagraph />
            <ImageComponent />
            <Footer />
        </div>
    )
}
