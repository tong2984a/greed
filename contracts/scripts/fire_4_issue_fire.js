const config = require('../config.json')
const game_config = require('../game_config.json')
const hre = require("hardhat")

//Ccontract Owner : SelfServeNFT
//cp .secretSelfServeNFT .secret
async function main() {
  console.log("\nfire_4_issue_fire starting ...")

  let fireFarmAddress = config['deployed']['fireFarmAddress']
  const FireFarm = await hre.ethers.getContractFactory("FireFarm")
  const fireFarmContract = await FireFarm.attach(fireFarmAddress)
  
  let usdcAddress = config['chains'][hre.network.name]['usdc']['contractAddress']
  const usdcContract = await ethers.getContractAt("IERC20", usdcAddress)

  let fireTokenAddress = config['deployed']['fireTokenAddress']
  const FireToken = await hre.ethers.getContractFactory("FireToken")
  const fireTokenContract = await FireToken.attach(fireTokenAddress)

  let player1Address = game_config['fire_4_issue_fire']['player1Address']
  let player1Name = game_config['fire_4_issue_fire']['player1Name']
  let player1Account = await hre.ethers.getSigner(player1Address)
  let player1AddressDisplay = [player1Address.substr(0, 4), player1Address.substr(38, 4)].join('...')

  let player2Address = game_config['fire_4_issue_fire']['player2Address']
  let player2Name = game_config['fire_4_issue_fire']['player2Name']
  let player2Account = await hre.ethers.getSigner(player2Address)
  let player2AddressDisplay = [player2Address.substr(0, 4), player2Address.substr(38, 4)].join('...')
  
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

  balance = await player2Account.getBalance()
  console.log(`${player2Name} ${player2AddressDisplay} `)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(player2Account.address)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(player2Account.address)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(player2Account.address)
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

  // let test = 0.000000000000000003
  // console.log('value_in_USDC', test)
  // test = test * 10 ** 18
  // test = ethers.utils.parseUnits(test.toString(), 18)
  // console.log('value_in_USDC2', test)
  // console.log(`format USDC 6 : ${ethers.utils.formatUnits(test, 18)}`)

  // let test_USDC = '1';
  // console.log('value_in_USDC', test_USDC)
  // let test_USDC2 = ethers.utils.parseUnits(test_USDC, 6)
  // console.log('value_in_USDC2', test_USDC2)
  // console.log(`format USDC 6 : ${ethers.utils.formatUnits(test_USDC2, 6)}`)
  
  // let test_convert = test_USDC2 / 1000000
  // console.log('test_convert', test_convert)
  // let test_convert2 = ethers.utils.parseUnits(test_convert.toString(), 18)
  // console.log('test_convert2', test_convert2)
  // console.log(`format test_convert2 18 : ${ethers.utils.formatUnits(test_convert2, 18)}`)

  // let test_FIRE = '1';
  // console.log('value_in_FIRE', test_FIRE)
  // let test_FIRE2 = ethers.utils.parseUnits(test_FIRE, 18)
  // console.log('value_in_FIRE2', test_FIRE2)
  // console.log(`format FIRE 18 : ${ethers.utils.formatUnits(test_FIRE2, 18)}`)

  transaction = await fireFarmContract.connect(player1Account).issueTokens(overrides)
  tx = await transaction.wait()
  console.log("IssueTokens event:", tx.events)

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

  balance = await ethers.provider.getBalance(fireFarmAddress)
  console.log(`FireFarm contract `)
  console.log(` balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await usdcContract.balanceOf(fireFarmAddress)
  console.log(` balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await fireTokenContract.balanceOf(fireFarmAddress)
  console.log(` balance(FireToken): ${ethers.utils.formatUnits(balance, 18)}`)
  balance = await fireFarmContract.stakingBalance(fireFarmAddress)
  console.log(` staking balance(USDC): ${ethers.utils.formatUnits(balance, 6)}`)

  console.log("\nfire_4_issue_fire completed successfully.")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
