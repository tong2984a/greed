const hre = require("hardhat")
const fs = require('fs')
const config = require('../config.json')

//Ccontract Owner : SelfServeNFT
//cp .secretSelfServeNFT .secret
async function main () {
  const FireToken = await hre.ethers.getContractFactory("FireToken")
  console.log('Deploying FireToken...')
  const fireToken = await FireToken.deploy();
  await fireToken.deployed();
  console.log("FireToken deployed to:", fireToken.address);

  const DaiToken = await hre.ethers.getContractFactory("DaiToken")
  console.log('Deploying DaiToken...')
  const daiToken = await DaiToken.deploy();
  await daiToken.deployed();
  console.log("DaiToken deployed to:", daiToken.address);

  const DappToken = await hre.ethers.getContractFactory("DappToken")
  console.log('Deploying DappToken...')
  const dappToken = await DappToken.deploy();
  await dappToken.deployed();
  console.log("DappToken deployed to:", dappToken.address);

  const DappFarm = await hre.ethers.getContractFactory("DappFarm")
  console.log('Deploying DappFarm...')
  const dappFarm = await DappFarm.deploy(dappToken.address, daiToken.address);
  await dappFarm.deployed();
  console.log("DappFarm deployed to:", dappFarm.address);

  const FireFarm = await hre.ethers.getContractFactory("FireFarm")
  console.log('Deploying FireFarm...')
  const fireFarm = await FireFarm.deploy(fireToken.address, config['chains'][hre.network.name]['usdc']['contractAddress']);
  await fireFarm.deployed();
  console.log("FireFarm deployed to:", fireFarm.address);

  const TokenFarm = await hre.ethers.getContractFactory("TokenFarm")
  console.log('Deploying TokenFarm...')
  const tokenFarm = await TokenFarm.deploy(config['chains'][hre.network.name]['usdc']['contractAddress']);
  await tokenFarm.deployed();
  console.log("TokenFarm deployed to:", tokenFarm.address);

  let contract_owner = config['chains'][hre.network.name]['contract_owner']
  let envChain = config['chains'][hre.network.name]['chain']

  let dappTokenAddress = dappToken.address
  let daiTokenAddress = daiToken.address
  let fireTokenAddress = fireToken.address
  let fireFarmAddress = fireFarm.address
  let dappFarmAddress = dappFarm.address
  let tokenFarmAddress = tokenFarm.address

  config['deployed'] = {
    tokenFarmAddress,
    dappFarmAddress,
    fireFarmAddress,
    dappTokenAddress,
    daiTokenAddress,
    fireTokenAddress,
    envChain,
    contract_owner
  }

  fs.writeFileSync('config.json', JSON.stringify(config, null, 4))
}

main();
