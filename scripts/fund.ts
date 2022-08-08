import { ethers } from "hardhat";
import { FundMe } from "../typechain-types";

async function main() {
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];
    const fundMe: FundMe = await ethers.getContract("FundMe", deployer.address);
    console.log("Funding Contract ...");
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.05"),
    });
    await transactionResponse.wait(1);
    console.log("Funded!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
