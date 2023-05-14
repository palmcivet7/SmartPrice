import "../styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import { createClient, WagmiConfig } from "wagmi"
import { configureChains } from "@wagmi/core"
import {
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet,
    fantom,
    fantomTestnet,
    foundry,
    goerli,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    sepolia,
} from "@wagmi/core/chains"
import { extendTheme } from "@chakra-ui/react"
import { publicProvider } from "wagmi/providers/public"
import { SessionProvider } from "next-auth/react"
// import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"

const { provider, webSocketProvider } = configureChains(
    [
        arbitrum,
        arbitrumGoerli,
        avalanche,
        avalancheFuji,
        bsc,
        bscTestnet,
        fantom,
        fantomTestnet,
        foundry,
        goerli,
        mainnet,
        optimism,
        optimismGoerli,
        polygon,
        polygonMumbai,
        sepolia,
    ],
    [publicProvider()]
)

const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
})

function App({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <ChakraProvider>
                    <WagmiConfig client={client}>
                        <SessionProvider session={pageProps.session} refetchInterval={0}>
                            <Component {...pageProps} />
                        </SessionProvider>
                    </WagmiConfig>
                </ChakraProvider>
            </NotificationProvider>
        </MoralisProvider>
    )
}

export default App
