const config = require('../config.json')
const game_config = require('../game_config.json')
const fs = require('fs')
const hre = require("hardhat")

async function main() {
  console.log("\nusdc_4_reward starting ...")
  
  let value_in_USDC = game_config['usdc_4_reward']['value_in_USDC']
  const amount = ethers.utils.parseUnits(value_in_USDC, 6)
  console.log('amount: ', amount)

  let tokenFarmAddress = config['deployed']['tokenFarmAddress']
  const TokenFarm = await hre.ethers.getContractFactory("TokenFarm")
  const tokenFarmContract = await TokenFarm.attach(tokenFarmAddress)

  let usdcContractAddress = config['chains'][hre.network.name]['usdc']['contractAddress']
  const erc20Contract = await ethers.getContractAt("IERC20", usdcContractAddress)

  let player1Address = game_config['usdc_4_reward']['player1Address']
  let player1Name = game_config['usdc_4_reward']['player1Name']
  let player1Account = await hre.ethers.getSigner(player1Address)
  let player1AddressDisplay = [player1Address.substr(0, 4), player1Address.substr(38, 4)].join('...')

  let player2Address = game_config['usdc_4_reward']['player2Address']
  let player2Name = game_config['usdc_4_reward']['player2Name']
  let player2Account = await hre.ethers.getSigner(player2Address)
  let player2AddressDisplay = [player2Address.substr(0, 4), player2Address.substr(38, 4)].join('...')

  const privateKey = fs.readFileSync(".secretHardhat1").toString().trim()
  const signer_wallet = new ethers.Wallet(privateKey)
  signer_wallet.address = player1Address
  const signer = await signer_wallet.connect(hre.ethers.provider)

  let balance
  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player1Account.address)
  console.log(`${player1Name} ${player1AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player2Account.getBalance()
  console.log(`${player2Name} ${player2AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player2Account.address)
  console.log(`${player2Name} ${player2AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await ethers.provider.getBalance(tokenFarmAddress)
  console.log(`TokenFarm contract balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(tokenFarmAddress)
  console.log("balance", balance)
  console.log(`TokenFarm contract balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  let transaction
  let tx

  transaction = await erc20Contract.connect(signer).transfer(tokenFarmAddress, amount)
  tx = await transaction.wait()
  console.log("transfer event:", tx.events)
  
  transaction = await tokenFarmContract.connect(player2Account).ReceiveFund()
  tx = await transaction.wait()
  console.log("Receive Fund event:", tx.events)

  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player1Account.address)
  console.log(`${player1Name} ${player1AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player2Account.getBalance()
  console.log(`${player2Name} ${player2AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player2Account.address)
  console.log(`${player2Name} ${player2AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await ethers.provider.getBalance(tokenFarmAddress)
  console.log(`TokenFarm contract balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(tokenFarmAddress)
  console.log(`TokenFarm contract balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  console.log("\nusdc_4_reward completed successfully.")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
