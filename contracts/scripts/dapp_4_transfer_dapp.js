const config = require('../config.json')
const game_config = require('../game_config.json')
const hre = require("hardhat")

async function main() {
  console.log("\ndapp_4_transfer_dapp starting ...")
  let balance

  let daiTokenContractAddress = config['deployed']['daiTokenAddress']
  const DaiToken = await hre.ethers.getContractFactory("DaiToken")
  const daiTokenContract = await DaiToken.attach(daiTokenContractAddress)

  let dappTokenContractAddress = config['deployed']['dappTokenAddress']
  const DappToken = await hre.ethers.getContractFactory("DappToken")
  const dappTokenContract = await DappToken.attach(dappTokenContractAddress)

  let dappFarmAddress = config['deployed']['dappFarmAddress']
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

  let value_in_Dapp = game_config['dapp_4_transfer_dapp']['value_in_Dapp']
  const amount = ethers.utils.parseUnits(value_in_Dapp, 6)
  console.log('amount: ', amount)

  let transaction
  let tx
  let event

  transaction = await dappTokenContract.connect(owner).transfer(dappFarmAddress, amount)
  tx = await transaction.wait()
  event = tx.events[0] //event 
  console.log("Transfer Dapp event:", event)

  balance = await owner.getBalance()
  console.log(`Owner ${ownerAddressDisplay} balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await daiTokenContract.balanceOf(owner.address)
  console.log(`Owner ${ownerAddressDisplay} balance(DaiToken): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await dappTokenContract.balanceOf(owner.address)
  console.log(`Owner ${ownerAddressDisplay} balance(DappToken): ${ethers.utils.formatUnits(balance, 6)}`)

  balance = await ethers.provider.getBalance(dappFarmAddress)
  console.log(`DappFarm contract balance(ETH): ${ethers.utils.formatEther(balance)}`)
  balance = await daiTokenContract.balanceOf(dappFarmAddress)
  console.log(`DappFarm contract balance(DaiToken): ${ethers.utils.formatUnits(balance, 6)}`)
  balance = await dappTokenContract.balanceOf(dappFarmAddress)
  console.log(`DappFarm contract balance(DappToken): ${ethers.utils.formatUnits(balance, 6)}`)

  console.log("\ndapp_4_transfer_dapp completed successfully.")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
