import Image from "next/image"
import styles from "../styles/ImageComponent.module.css"

function ImageComponent() {
    return (
        <div className={styles.inflationChart}>
            <Image
                src="/inflation-chart.jpg" //
                alt="Chart showing buying power of USD over time."
                width={400}
                height={150}
            />
        </div>
    )
}

export default ImageComponent
