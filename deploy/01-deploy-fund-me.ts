import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import "dotenv/config";
import { verify } from "../utils/verify";

import { networkConfig, developmentChains } from "../helper-hardhat-config";

const deployFundMe: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId: number = network.config.chainId!;
    const chainName: string = network.name;

    let ethUsdPriceFeedAddress: string;
    let waitConfirmations: number;
    if (developmentChains.includes(chainName)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
        waitConfirmations = 0;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed!;
        waitConfirmations = networkConfig[chainId].blockConfirmations || 1;
    }

    const fundMeArgs = [ethUsdPriceFeedAddress];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: fundMeArgs,
        log: true,
        waitConfirmations: waitConfirmations,
    });

    if (
        !developmentChains.includes(chainName) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, fundMeArgs);
    }
    log("-----------------------------------");
};

export default deployFundMe;
deployFundMe.tags = ["all", "fundMe"];
