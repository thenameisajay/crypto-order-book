const tokenData: Record<string, string> = {
    'BTC/USD': `Bitcoin is the world's first cryptocurrency, introduced by an anonymous person or group of people using the pseudonym Satoshi Nakamoto in 2009.`,
    'ETH/USD': `As the native cryptocurrency of the Ethereum platform, ETH is used to pay for transaction fees and computational services.`,
    'LTC/USD': `Litecoin is a peer-to-peer cryptocurrency created as a "silver" to Bitcoin's "gold." It was designed to provide fast, low-cost transactions compared to Bitcoin.`,
    'DOGE/USD': `Dogecoin  It features a friendly Shiba Inu dog as its logo .DOGE transactions are fast and have low fees, making it popular for tipping and small payments.`,
    'XRP/USD': `XRP is a digital payment protocol that operates as both a cryptocurrency and a technology for payment settlements.`,
};

export const getTokenDescription = (token: string) => {
    console.log(tokenData[token]);
    return tokenData[token];
};
