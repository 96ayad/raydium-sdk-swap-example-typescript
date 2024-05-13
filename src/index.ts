import RaydiumSwap from './RaydiumSwap';
import { Transaction, VersionedTransaction } from '@solana/web3.js';
import 'dotenv/config';
import { swapConfig } from './swapConfig'; // Import the configuration

////////////ayad//////////
import {
  LiquidityPoolKeys,
} from '@raydium-io/raydium-sdk';
import { web3 } from "@project-serum/anchor";

/**
 * Performs a token swap on the Raydium protocol.
 * Depending on the configuration, it can execute the swap or simulate it.
 */
const swap = async () => {
  /**
   * The RaydiumSwap instance for handling swaps.
   */
  const raydiumSwap = new RaydiumSwap(process.env.RPC_URL, process.env.WALLET_PRIVATE_KEY);
  console.log(`Raydium swap initialized`);
  console.log(`Swapping ${swapConfig.tokenAAmount} of ${swapConfig.tokenAAddress} for ${swapConfig.tokenBAddress}...`)

  /**
   * Load pool keys from the Raydium API to enable finding pool information.
   */
  await raydiumSwap.loadPoolKeys(swapConfig.liquidityFile);
  console.log(`Loaded pool keys`);



  /////////ayad/////////////
  /**
   * Find pool information for the given token pair.
   */
  // const poolInfo = raydiumSwap.findPoolInfoForTokens(swapConfig.tokenAAddress, swapConfig.tokenBAddress);
  // console.log('Found pool info');

  const poolInfo : LiquidityPoolKeys = {
    // "_id":"6641bf8d7fdfe653a776471b",
    // id:"2viGyp1hY8PGw7GEPzJvLdPAQpe7zL745oHp1C6a3jcJ",
    id: new web3.PublicKey("2viGyp1hY8PGw7GEPzJvLdPAQpe7zL745oHp1C6a3jcJ"),
    baseMint: new web3.PublicKey("Duqm5K5U1H8KfsSqwyWwWNWY5TLB9WseqNEAQMhS78hb"),
    quoteMint: new web3.PublicKey("So11111111111111111111111111111111111111112"),
    lpMint: new web3.PublicKey("89ZKE4aoyfLBe2RuV6jM3JGNhaV18Nxh8eNtjRcndBip"),
    baseDecimals:9,
    quoteDecimals:9,
    lpDecimals:6,
    version:4,
    programId: new web3.PublicKey("HWy1jotHpo6UqeQxx49dpYYdQB8wj9Qk9MdxwjLvDHB8"),
    authority: new web3.PublicKey("5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1"),
    openOrders: new web3.PublicKey("6Su6Ea97dBxecd5W92KcVvv6SzCurE2BXGgFe9LNGMpE"),
    targetOrders: new web3.PublicKey("5hATcCfvhVwAjNExvrg8rRkXmYyksHhVajWLa46iRsmE"),
    baseVault: new web3.PublicKey("Em6rHi68trYgBFyJ5261A2nhwuQWfLcirgzZZYoRcrkX"),
    quoteVault: new web3.PublicKey("3mEFzHsJyu2Cpjrz6zPmTzP7uoLFj9SbbecGVzzkL1mJ"),
    withdrawQueue: new web3.PublicKey("11111111111111111111111111111111"),
    lpVault: new web3.PublicKey("11111111111111111111111111111111"),
    marketVersion:3,
    marketProgramId: new web3.PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX"),
    marketId: new web3.PublicKey("BzcDHvKWD4LyW4X1NUEaWLBaNmyiCUKqcd3jXDRhwwAG"),
    marketAuthority: new web3.PublicKey("7SdieGqwPJo5rMmSQM9JmntSEMoimM4dQn7NkGbNFcrd"),
    marketBaseVault: new web3.PublicKey("6U6U59zmFWrPSzm9sLX7kVkaK78Kz7XJYkrhP1DjF3uF"),
    marketQuoteVault: new web3.PublicKey("4YEx21yeUAZxUL9Fs7YU9Gm3u45GWoPFs8vcJiHga2eQ"),
    marketBids: new web3.PublicKey("C1nEbACFaHMUiKAUsXVYPWZsuxunJeBkqXHPFr8QgSj9"),
    marketAsks: new web3.PublicKey("4DNBdnTw6wmrK4NmdSTTxs1kEz47yjqLGuoqsMeHvkMF"),
    marketEventQueue: new web3.PublicKey("4HGvdannxvmAhszVVig9auH6HsqVH17qoavDiNcnm9nj"),
    lookupTableAccount: new web3.PublicKey("73mV3Cihr7vMUHeoS2KfQ12gaPur8Zf9BGxmuDtQaG6p"),
    // createdAt:"2024-05-13T07:21:49.907Z",
    // updatedAt:"2024-05-13T07:21:49.907Z",
    // __v:0
  }



  /**
   * Prepare the swap transaction with the given parameters.
   */
  const tx = await raydiumSwap.getSwapTransaction(
    swapConfig.tokenBAddress,
    swapConfig.tokenAAmount,
    poolInfo,
    swapConfig.maxLamports, 
    swapConfig.useVersionedTransaction,
    swapConfig.direction
  );

  /**
   * Depending on the configuration, execute or simulate the swap.
   */
  if (swapConfig.executeSwap) {
    /**
     * Send the transaction to the network and log the transaction ID.
     */
    const txid = swapConfig.useVersionedTransaction
      ? await raydiumSwap.sendVersionedTransaction(tx as VersionedTransaction, swapConfig.maxRetries)
      : await raydiumSwap.sendLegacyTransaction(tx as Transaction, swapConfig.maxRetries);

    console.log(`https://solscan.io/tx/${txid}`);

  } else {
    /**
     * Simulate the transaction and log the result.
     */
    const simRes = swapConfig.useVersionedTransaction
      ? await raydiumSwap.simulateVersionedTransaction(tx as VersionedTransaction)
      : await raydiumSwap.simulateLegacyTransaction(tx as Transaction);

    console.log(simRes);
  }
};

swap();
