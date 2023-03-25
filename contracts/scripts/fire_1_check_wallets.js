const config = require('../config.json')
const game_config = require('../game_config.json')
const hre = require("hardhat")

//Ccontract Owner : SelfServeNFT
async function main() {
  console.log("\nfire_1_check_wallets starting ...")
  let usdcAddress = config['chains'][hre.network.name]['usdc']['contractAddress']
  const usdcContract = await hre.ethers.getContractAt("IERC20", usdcAddress)

  let fireTokenAddress = config['deployed']['fireTokenAddress']
  const FireToken = await hre.ethers.getContractFactory("FireToken")
  const fireTokenContract = await FireToken.attach(fireTokenAddress)

  let fireFarmAddress = config['deployed']['fireFarmAddress']
  const FireFarm = await hre.ethers.getContractFactory("FireFarm")
  const fireFarmContract = await FireFarm.attach(fireFarmAddress)

  let balance
  let accounts = await ethers.getSigners()
  let owner = accounts[0]
  let ownerAddressDisplay = [owner.address.substr(0, 4), owner.address.substr(38, 4)].join('...')
  balance = await owner.getBalance()
  console.log(`Owner ${ownerAddressDisplay} `)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(owner.address)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(owner.address)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(owner.address)
  console.log(` staking balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  let player1Address = game_config['fire_1_check_wallets']['player1Address']
  let player1Name = game_config['fire_1_check_wallets']['player1Name']
  let player1Account = await hre.ethers.getSigner(player1Address)
  let player1AddressDisplay = [player1Address.substr(0, 4), player1Address.substr(38, 4)].join('...')

  let player2Address = game_config['fire_1_check_wallets']['player2Address']
  let player2Name = game_config['fire_1_check_wallets']['player2Name']
  let player2Account = await hre.ethers.getSigner(player2Address)
  let player2AddressDisplay = [player2Address.substr(0, 4), player2Address.substr(38, 4)].join('...')

  let player3Address = game_config['fire_1_check_wallets']['player3Address']
  let player3Name = game_config['fire_1_check_wallets']['player3Name']
  let player3Account = await hre.ethers.getSigner(player3Address)
  let player3AddressDisplay = [player3Address.substr(0, 4), player3Address.substr(38, 4)].join('...')

  let player4Address = game_config['fire_1_check_wallets']['player4Address']
  let player4Name = game_config['fire_1_check_wallets']['player4Name']
  let player4Account = await hre.ethers.getSigner(player4Address)
  let player4AddressDisplay = [player4Address.substr(0, 4), player4Address.substr(38, 4)].join('...')

  let player5Address = game_config['fire_1_check_wallets']['player5Address']
  let player5Name = game_config['fire_1_check_wallets']['player5Name']
  let player5Account = await hre.ethers.getSigner(player5Address)
  let player5AddressDisplay = [player5Address.substr(0, 4), player5Address.substr(38, 4)].join('...')

  let player6Address = game_config['fire_1_check_wallets']['player6Address']
  let player6Name = game_config['fire_1_check_wallets']['player6Name']
  let player6Account = await hre.ethers.getSigner(player6Address)
  let player6AddressDisplay = [player6Address.substr(0, 4), player6Address.substr(38, 4)].join('...')

  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} `)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(player1Account.address)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(player1Account.address)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(player1Account.address)
  console.log(` staking balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player2Account.getBalance()
  console.log(`${player2Name} ${player2AddressDisplay} `)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(player2Account.address)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(player2Account.address)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(player2Account.address)
  console.log(` staking balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player3Account.getBalance()
  console.log(`${player3Name} ${player3AddressDisplay}`)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(player3Account.address)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(player3Account.address)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(player3Account.address)
  console.log(` staking balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player4Account.getBalance()
  console.log(`${player4Name} ${player4AddressDisplay}`)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(player4Account.address)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(player4Account.address)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(player4Account.address)
  console.log(` staking balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player5Account.getBalance()
  console.log(`${player5Name} ${player5AddressDisplay} `)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(player5Account.address)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(player5Account.address)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(player5Account.address)
  console.log(` staking balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player6Account.getBalance()
  console.log(`${player6Name} ${player6AddressDisplay} `)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(player6Account.address)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(player6Account.address)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(player6Account.address)
  console.log(` staking balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await ethers.provider.getBalance(fireFarmAddress)
  console.log(`FireFarm contract `)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(fireFarmAddress)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(fireFarmAddress)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(fireFarmAddress)
  console.log(` staking balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  console.log("\nfire_1_check_wallets completed successfully.")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
