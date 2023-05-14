import { ethers } from "ethers"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants"

export function getContract(provider) {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider.getSigner())
}
