const config = require('../config.json')
const game_config = require('../game_config.json')
const fs = require('fs')
const hre = require("hardhat")

async function main() {
  console.log("\nusdc_3_fund starting ...")
  
  let value_in_USDC = game_config['usdc_3_fund']['value_in_USDC']
  const amount = ethers.utils.parseUnits(value_in_USDC, 6)
  console.log('amount: ', amount)

  let tokenFarmAddress = config['deployed']['tokenFarmAddress']
  const TokenFarm = await hre.ethers.getContractFactory("TokenFarm")
  const tokenFarmContract = await TokenFarm.attach(tokenFarmAddress)

  let usdcContractAddress = config['chains'][hre.network.name]['usdc']['contractAddress']
  const erc20Contract = await ethers.getContractAt("IERC20", usdcContractAddress)

  let player1Address = game_config['usdc_3_fund']['player1Address']
  let player1Name = game_config['usdc_3_fund']['player1Name']
  let player1Account = await hre.ethers.getSigner(player1Address)
  let player1AddressDisplay = [player1Address.substr(0, 4), player1Address.substr(38, 4)].join('...')

  const privateKey = fs.readFileSync(".secret").toString().trim()
  const signer_wallet = new ethers.Wallet(privateKey)
  signer_wallet.address = player1Address
  const signer = await signer_wallet.connect(hre.ethers.provider)
  console.log("json", await signer_wallet.encrypt("123456789"))

  let balance
  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player1Account.address)
  console.log(`${player1Name} ${player1AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await ethers.provider.getBalance(tokenFarmAddress)
  console.log(`TokenFarm contract balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(tokenFarmAddress)
  console.log(`TokenFarm contract balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  let transaction
  let tx
  let event

  let overrides = {
    // The maximum units of gas for the transaction to use
    gasLimit: 2100000,
    // The price (in wei) per unit of gas
    gasPrice: ethers.utils.parseUnits('8.0', 'gwei')
  }
  
  transaction = await tokenFarmContract.connect(signer).Fund(value_in_USDC, overrides)
  // transaction = await erc20Contract.connect(player1Account).transfer(tokenFarmAddress, amount)
  tx = await transaction.wait()
  event = tx.events[0] //event RewardsIncreased
  console.log("Fund event:", event)

  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player1Account.address)
  console.log(`${player1Name} ${player1AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await ethers.provider.getBalance(tokenFarmAddress)
  console.log(`TokenFarm contract balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(tokenFarmAddress)
  console.log(`TokenFarm contract balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  console.log("\nusdc_3_fund completed successfully.")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
