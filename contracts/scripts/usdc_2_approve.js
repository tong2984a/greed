const config = require('../config.json')
const game_config = require('../game_config.json')
const hre = require("hardhat")

async function main() {
  console.log("\nusdc_2_approve starting ...")
  
  let value_in_USDC = game_config['usdc_2_approve']['value_in_USDC']
  const amount = ethers.utils.parseUnits(value_in_USDC, 6)
  console.log('amount: ', amount)

  let tokenFarmAddress = config['deployed']['tokenFarmAddress']

  let usdcContractAddress = config['chains'][hre.network.name]['usdc']['contractAddress']
  const erc20Contract = await ethers.getContractAt("IERC20", usdcContractAddress)

  let player1Address = game_config['usdc_2_approve']['player1Address']
  let player1Name = game_config['usdc_2_approve']['player1Name']
  let player1Account = await hre.ethers.getSigner(player1Address)
  let player1AddressDisplay = [player1Address.substr(0, 4), player1Address.substr(38, 4)].join('...')
  
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

  transaction = await erc20Contract.connect(player1Account).approve(tokenFarmAddress, amount)
  tx = await transaction.wait()
  event = tx.events[0]
  console.log("approve event:", event)
  
  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player1Account.address)
  console.log(`${player1Name} ${player1AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await ethers.provider.getBalance(tokenFarmAddress)
  console.log(`TokenFarm contract balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(tokenFarmAddress)
  console.log(`TokenFarm contract balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  console.log("\nusdc_2_approve completed successfully.")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
