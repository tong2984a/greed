const config = require('../config.json')
const game_config = require('../game_config.json')
const hre = require("hardhat")

async function main() {
  console.log("\nusdc_1_check_wallets starting ...")
  let usdcContractAddress = config['chains'][hre.network.name]['usdc']['contractAddress']
  const erc20Contract = await ethers.getContractAt("IERC20", usdcContractAddress)
  
  let player1Address = game_config['usdc_1_check_wallets']['player1Address']
  let player1Name = game_config['usdc_1_check_wallets']['player1Name']
  let player1Account = await hre.ethers.getSigner(player1Address)
  let player1AddressDisplay = [player1Address.substr(0, 4), player1Address.substr(38, 4)].join('...')

  let player2Address = game_config['usdc_1_check_wallets']['player2Address']
  let player2Name = game_config['usdc_1_check_wallets']['player2Name']
  let player2Account = await hre.ethers.getSigner(player2Address)
  let player2AddressDisplay = [player2Address.substr(0, 4), player2Address.substr(38, 4)].join('...')

  let player3Address = game_config['usdc_1_check_wallets']['player3Address']
  let player3Name = game_config['usdc_1_check_wallets']['player3Name']
  let player3Account = await hre.ethers.getSigner(player3Address)
  let player3AddressDisplay = [player3Address.substr(0, 4), player3Address.substr(38, 4)].join('...')

  let player4Address = game_config['usdc_1_check_wallets']['player4Address']
  let player4Name = game_config['usdc_1_check_wallets']['player4Name']
  let player4Account = await hre.ethers.getSigner(player4Address)
  let player4AddressDisplay = [player4Address.substr(0, 4), player4Address.substr(38, 4)].join('...')

  let player5Address = game_config['usdc_1_check_wallets']['player5Address']
  let player5Name = game_config['usdc_1_check_wallets']['player5Name']
  let player5Account = await hre.ethers.getSigner(player5Address)
  let player5AddressDisplay = [player5Address.substr(0, 4), player5Address.substr(38, 4)].join('...')

  let player6Address = game_config['usdc_1_check_wallets']['player6Address']
  let player6Name = game_config['usdc_1_check_wallets']['player6Name']
  let player6Account = await hre.ethers.getSigner(player6Address)
  let player6AddressDisplay = [player6Address.substr(0, 4), player6Address.substr(38, 4)].join('...')

  let balance
  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player1Account.address)
  console.log(`${player1Name} ${player1AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player2Account.getBalance()
  console.log(`${player2Name} ${player2AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player2Account.address)
  console.log(`${player2Name} ${player2AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player3Account.getBalance()
  console.log(`${player3Name} ${player3AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player3Account.address)
  console.log(`${player3Name} ${player3AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player4Account.getBalance()
  console.log(`${player4Name} ${player4AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player4Account.address)
  console.log(`${player4Name} ${player4AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player5Account.getBalance()
  console.log(`${player5Name} ${player5AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player5Account.address)
  console.log(`${player5Name} ${player5AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player6Account.getBalance()
  console.log(`${player6Name} ${player6AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(player6Account.address)
  console.log(`${player6Name} ${player6AddressDisplay} balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  let tokenFarmAddress = config['deployed']['tokenFarmAddress']
  balance = await ethers.provider.getBalance(tokenFarmAddress)
  console.log(`TokenFarm contract balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await erc20Contract.balanceOf(tokenFarmAddress)
  console.log(`TokenFarm contract balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  console.log("\nusdc_1_check_wallets completed successfully.")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
