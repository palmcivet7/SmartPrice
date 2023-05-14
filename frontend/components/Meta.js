import Head from "next/head"

const Meta = ({ title, keywords, description }) => {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: "SmartPrice",
    keywords: "inflation, price, pricing, smart contract",
    description: "Inflation Adjusted Pricing service built on Web3.",
}

export default Meta
