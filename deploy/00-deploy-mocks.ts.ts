import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} from "../helper-hardhat-config";

const deployMocks: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainName = network.name;

    if (developmentChains.includes(chainName)) {
        log("Local network detected! Deploying mocks ...");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true, // logs information about the deployment
            args: [DECIMALS, INITIAL_ANSWER],
        });
        log("Mocks deployed!");
        log("----------------------------------------");
    }
};

export default deployMocks;
deployMocks.tags = ["all", "mocks"];
