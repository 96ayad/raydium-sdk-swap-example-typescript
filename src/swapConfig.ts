export const swapConfig = {
  executeSwap: false, // Send tx when true, simulate tx when false
  useVersionedTransaction: true,
  tokenAAmount: 0.5, // Swap 0.01 SOL for USDT in this example
  tokenAAddress: "So11111111111111111111111111111111111111112", // Token to swap for the other, SOL in this case
  // tokenBAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC address

  tokenBAddress: "Duqm5K5U1H8KfsSqwyWwWNWY5TLB9WseqNEAQMhS78hb", // SALD address

  maxLamports: 1500000, // Micro lamports for priority fee
  direction: "in" as "in" | "out", // Swap direction: 'in' or 'out'
  // liquidityFile: "https://api.raydium.io/v2/sdk/liquidity/mainnet.json",

  liquidityFile: "https://simple-crud-app-backend.onrender.com/v2/sdk/liquidity/mint",

  maxRetries: 20,
};
