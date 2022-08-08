import { ethers } from "hardhat";
import { FundMe } from "../typechain-types";

async function main() {
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];
    const fundMe = await ethers.getContract("FundMe", deployer.address);
    console.log("Withdrawing funds ...");
    const transactionResponse = await fundMe.withdraw();
    await transactionResponse.wait(1);
    console.log("Funds withdrawed!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
