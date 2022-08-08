interface INetworkConfigInfo {
    [id: number]: NetworkConfigItem;
}

type NetworkConfigItem = {
    name?: string;
    ethUsdPriceFeed?: string;
    blockConfirmations?: number;
};

export const networkConfig: INetworkConfigInfo = {
    4: {
        name: "rinkeby",
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
        blockConfirmations: 6,
    },
    137: {
        name: "polygon",
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
};

export const developmentChains = ["hardhat", "localhost"];

export const DECIMALS = 8;
export const INITIAL_ANSWER = 200000000000;
