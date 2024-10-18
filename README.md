# Taiko Trailblazers Send Transaction Tool

Auto send transaction by read and write contract (150 tx/day) 

## Prerequisites

### Before running the script, make sure you have the following:

- **Node.js and npm**: Install Node.js and npm (Node Package Manager).
- **Web3.js**: Install the Web3.js library using `npm install web3`.
- **Contract ABI**: Obtain the ABI of your Ethereum smart contract (save it as abi.json in the config folder).
- **Configuration**: Create a keys.json file in the config folder with the following information:
- **rpcUrl**: Your Ethereum node's RPC URL (e.g., from Infura).
- **privateKey\*\***: Your private key (keep this secure!).
- **contractAddress**: The address of your smart contract.
- **walletAddress**: Your wallet address.
- **etherAmount**: The amount of Ether to deposit in each transaction.

## Installation

- **Clone this repository**: git clone https://github.com/inanitynoupcase/TaikoTrailblazersTxTool
- **Install dependencies**: npm install
- Update config/keys.json with your configuration details.

## Usage

- **Run the script**: node test3.js (or whatever your script file is named)
- The script will connect to the Taiko network, make the specified number of deposits, and then withdraw the entire balance.
  Monitor the console output for transaction details and confirmation messages.

## Configuration

- Adjust the values in config/keys.json to customize your script's behavior:
  Change **etherAmount** to deposit different amounts in each transaction.
- Modify loop to control the number of deposits.

## Security Considerations

- Never share your private key with anyone.
- Store your private key securely. Consider using a hardware wallet or other secure storage method.
- Be aware of potential risks associated with interacting with smart contracts. Always verify the contract's code before depositing funds.

## Disclaimer

This script is provided for educational and demonstration purposes only. Use it at your own risk. The author is not responsible for any loss of funds or other damages that may occur as a result of using this script.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
