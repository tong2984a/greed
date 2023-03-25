const config = require('../config.json')
const game_config = require('../game_config.json')
const hre = require("hardhat")

//Ccontract Owner : SelfServeNFT
//cp .secretSelfServeNFT .secret
async function main() {
  console.log("\nfire_3_transfer_fire starting ...")
  
  let value_in_FIRE = game_config['fire_3_transfer_fire']['value_in_FIRE']
  const amount = ethers.utils.parseUnits(value_in_FIRE, 18)
  console.log('amount: ', amount)

  let fireFarmAddress = config['deployed']['fireFarmAddress']
  const FireFarm = await hre.ethers.getContractFactory("FireFarm")
  const fireFarmContract = await FireFarm.attach(fireFarmAddress)
  
  let usdcAddress = config['chains'][hre.network.name]['usdc']['contractAddress']
  const usdcContract = await ethers.getContractAt("IERC20", usdcAddress)

  let fireTokenAddress = config['deployed']['fireTokenAddress']
  const FireToken = await hre.ethers.getContractFactory("FireToken")
  const fireTokenContract = await FireToken.attach(fireTokenAddress)

  let player1Address = game_config['fire_3_transfer_fire']['player1Address']
  let player1Name = game_config['fire_3_transfer_fire']['player1Name']
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

  let overrides = {
    // The maximum units of gas for the transaction to use
    gasLimit: 2100000,
    // The price (in wei) per unit of gas
    gasPrice: ethers.utils.parseUnits('8.0', 'gwei')
  }

  transaction = await fireTokenContract.connect(player1Account).transfer(fireFarmAddress, amount, overrides)
  tx = await transaction.wait()
  console.log("Transfer FIRE event:", tx.events)
  
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

  console.log("\nfire_3_transfer_fire completed successfully.")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
