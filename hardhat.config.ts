import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "dotenv/config";
import "hardhat-gas-reporter";

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL! || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY! || "https//:";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY! || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY! || "";

const config: HardhatUserConfig = {
    // solidity: "0.8.8",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.8" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
        },
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            //accounts: [],
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        // token: "MATIC",
    },
    namedAccounts: {
        deployer: /* User welcher deployed */ {
            default: 0,
            // 4: 1, // Definition eines Standard Netzwerks (Chain-Id)
        },
        user: /* User welcher testet */ {
            default: 1,
        },
    },
};

export default config;
