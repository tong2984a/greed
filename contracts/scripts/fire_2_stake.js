const config = require('../config.json')
const game_config = require('../game_config.json')
const hre = require("hardhat")

//Ccontract Owner : SelfServeNFT
//cp .secretGreed .secret
async function main() {
  console.log("\nfire_2_stake starting ...")
  
  let value_in_USDC = game_config['fire_2_stake']['value_in_USDC']
  const amount = ethers.utils.parseUnits(value_in_USDC, 6)
  console.log('amount: ', amount)

  let fireTokenAddress = config['deployed']['fireTokenAddress']
  const FireToken = await hre.ethers.getContractFactory("FireToken")
  const fireTokenContract = await FireToken.attach(fireTokenAddress)

  let usdcAddress = config['chains'][hre.network.name]['usdc']['contractAddress']
  const usdcContract = await ethers.getContractAt("IERC20", usdcAddress)

  let fireFarmAddress = config['deployed']['fireFarmAddress']
  const FireFarm = await hre.ethers.getContractFactory("FireFarm")
  const fireFarmContract = await FireFarm.attach(fireFarmAddress)

  let player1Address = game_config['fire_2_stake']['player1Address']
  let player1Name = game_config['fire_2_stake']['player1Name']
  let player1Account = await hre.ethers.getSigner(player1Address)
  let player1AddressDisplay = [player1Address.substr(0, 4), player1Address.substr(38, 4)].join('...')
  
  let balance
  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} `)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(player1Account.address)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(player1Account.address)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(player1Account.address)
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

  let transaction
  let tx
  let event

  transaction = await usdcContract.connect(player1Account).approve(fireFarmAddress, amount)
  tx = await transaction.wait()
  console.log("approve event:", tx.events)
  
  transaction = await fireFarmContract.connect(player1Account).stakeTokens(amount)
  tx = await transaction.wait()
  console.log("StakeTokens event:", tx.events)
  
  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} `)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(player1Account.address)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(player1Account.address)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(player1Account.address)
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

  console.log("\nfire_2_stake completed successfully.")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
