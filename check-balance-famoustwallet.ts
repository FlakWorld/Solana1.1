import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

// Check's the validation of Private Key
try {
  new PublicKey(suppliedPublicKey);
} catch (error) {
  throw new Error("Invalid public key provided!");
}

// The using of Mainnet
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

const publicKey = new PublicKey(suppliedPublicKey);

(async () => {
  try {
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
      `✅ Finished! The balance for the wallet at address ${publicKey.toString()} is ${balanceInSOL} SOL!`
    );
  } catch (error) {
    console.error("Failed to retrieve balance:", error);
  }
})();

// Searching of famous wallet's
const famousWallets = [{ name: "toly.sol", publicKeyFamous: "GgJJRwLg9NzFQ97o1CJLGLp1KLSUMBwFc6eQNVEr4fbW"},
{ name: "shaq.sol", publicKeyFamous: "DtvCuBKG2hrLL7mVUGmaRRv4pFfMAQP7jdyTih9TX5aR" }, 
{ name: "mccann.sol", publicKeyFamous: "0xfbe2cd9c8f5e4fa7596a605e07eaca70a03c0f11" }];
for (const wallet of famousWallets) {
  (async () => {
    try {
      const walletAddress = new PublicKey(wallet.publicKeyFamous);
      const balanceInLamports = await connection.getBalance(walletAddress);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

      console.log(
        `Balance for the famous wallet ${wallet.name}: ${balanceInSOL} SOL`
      );
    } catch (error) {
      console.error(`Failed to retrieve balance for ${wallet.name}:`, error);
    }
  })();
}
