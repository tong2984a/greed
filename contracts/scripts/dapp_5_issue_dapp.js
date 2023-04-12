const config = require('../config.json')
const game_config = require('../game_config.json')
const hre = require("hardhat")

async function main() {
  console.log("\ndapp_5_issue_dapp starting ...")
  let balance

  let daiTokenContractAddress = config['deployed']['daiTokenAddress']
  const DaiToken = await hre.ethers.getContractFactory("DaiToken")
  const daiTokenContract = await DaiToken.attach(daiTokenContractAddress)

  let dappTokenContractAddress = config['deployed']['dappTokenAddress']
  const DappToken = await hre.ethers.getContractFactory("DappToken")
  const dappTokenContract = await DappToken.attach(dappTokenContractAddress)

  let dappFarmAddress = config['deployed']['dappFarmAddress']
  const DappFarm = await hre.ethers.getContractFactory("DappFarm")
  const dappFarmContract = await DappFarm.attach(dappFarmAddress)
  balance = await ethers.provider.getBalance(dappFarmAddress)
  console.log(`DappFarm contract balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await daiTokenContract.balanceOf(dappFarmAddress)
  console.log(`DappFarm contract balance(DaiToken): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await dappTokenContract.balanceOf(dappFarmAddress)
  console.log(`DappFarm contract balance(DappToken): ${ethers.utils.formatUnits(balance, 6)}`)

  let accounts = await ethers.getSigners()
  let owner = accounts[0]
  let ownerAddressDisplay = [owner.address.substr(0, 4), owner.address.substr(38, 4)].join('...')
  balance = await owner.getBalance()
  console.log(`Owner ${ownerAddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await daiTokenContract.balanceOf(owner.address)
  console.log(`Owner ${ownerAddressDisplay} balance(DaiToken): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await dappTokenContract.balanceOf(owner.address)
  console.log(`Owner ${ownerAddressDisplay} balance(DappToken): ${ethers.utils.formatUnits(balance, 6)}`)

  let player1Address = game_config['dapp_5_issue_dapp']['player1Address']
  let player1Name = game_config['dapp_5_issue_dapp']['player1Name']
  let player1Account = await hre.ethers.getSigner(player1Address)
  let player1AddressDisplay = [player1Address.substr(0, 4), player1Address.substr(38, 4)].join('...')

  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await daiTokenContract.balanceOf(player1Account.address)
  console.log(`${player1Name} ${player1AddressDisplay} balance(DaiToken): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await dappTokenContract.balanceOf(player1Account.address)
  console.log(`${player1Name} ${player1AddressDisplay} balance(DappToken): ${ethers.utils.formatUnits(balance, 6)}`)

  let transaction
  let tx
  let event

  let overrides = {
    // The maximum units of gas for the transaction to use
    gasLimit: 2100000,
    // The price (in wei) per unit of gas
    gasPrice: ethers.utils.parseUnits('8.0', 'gwei')
  }

  transaction = await dappFarmContract.connect(owner).issueTokens(overrides)
  tx = await transaction.wait()
  event = tx.events[0] //event 
  console.log("IssueTokens event:", event)

  balance = await owner.getBalance()
  console.log(`Owner ${ownerAddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await daiTokenContract.balanceOf(owner.address)
  console.log(`Owner ${ownerAddressDisplay} balance(DaiToken): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await dappTokenContract.balanceOf(owner.address)
  console.log(`Owner ${ownerAddressDisplay} balance(DappToken): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await player1Account.getBalance()
  console.log(`${player1Name} ${player1AddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await daiTokenContract.balanceOf(player1Account.address)
  console.log(`${player1Name} ${player1AddressDisplay} balance(DaiToken): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await dappTokenContract.balanceOf(player1Account.address)
  console.log(`${player1Name} ${player1AddressDisplay} balance(DappToken): ${ethers.utils.formatUnits(balance, 6)}`)

  console.log("\ndapp_5_issue_dapp completed successfully.")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });