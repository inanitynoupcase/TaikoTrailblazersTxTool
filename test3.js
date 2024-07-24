const { Web3 } = require("web3");
const abi = require("./config/abi");
const config = require("./config/keys");

let nonce;
const web3 = new Web3(config.rpcUrl);
const contract = new web3.eth.Contract(abi, config.contractAddress);

// Read balanceOf
async function getBalance(address) {
  try {
    const balance = await contract.methods.balanceOf(address).call();
    return balance;
  } catch (error) {
    console.error("Error reading balance:", error);
  }
}

// Deposit
async function deposit(amount) {
  try {
    const tx = {
      from: config.walletAddress,
      to: config.contractAddress,
      nonce: nonce,
      gas: 100000,
      data: contract.methods.deposit().encodeABI(),
      value: web3.utils.toWei(amount, "ether"),
      gasPrice: await web3.eth.getGasPrice(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      config.privateKey
    );
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  } catch (error) {
    console.error("Error making deposit:", error);
  }
}

// Withdraw
async function withdraw(amount) {
  try {
    const tx = {
      from: config.walletAddress,
      to: config.contractAddress,
      gas: 100000,
      data: contract.methods.withdraw(amount).encodeABI(),
      gasPrice: await web3.eth.getGasPrice(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      config.privateKey
    );
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  } catch (error) {
    console.error("Error making withdrawal:", error);
  }
}

// Get balance and then withdraw all
async function performWithdraw() {
  const balance = await getBalance(config.walletAddress);

  if (balance > 0) {
    await withdraw(balance);
  } else {
    console.log("No withdraw because u poor.");
  }
}

async function main() {
  for (let loopCount = 0; loopCount < config.totalLoop; loopCount++) {
    console.log(`\nStarting loop ${loopCount + 1} of ${config.totalLoop}`);

    nonce = await web3.eth.getTransactionCount(config.walletAddress);
    const depositPromises = [];

    for (let i = 0; i < config.loop - 1; i++) {
      console.log(`Transaction ${loopCount * 10 + (i + 1)}`);
      depositPromises.push(deposit(config.etherAmount));
      nonce++;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    await Promise.all(depositPromises);
    console.log(`Transaction ${loopCount * 10 + config.loop}`);
    await performWithdraw();
    console.log("Done with this loop\n");
  }

  console.log("Finished all loops!");
}

main();
