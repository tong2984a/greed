const hre = require("hardhat")
const fs = require('fs')
const config = require('../config.json')

async function main () {

  const TokenFarm = await hre.ethers.getContractFactory("TokenFarm")
  console.log('Deploying TokenFarm...')
  const tokenFarm = await TokenFarm.deploy(config['chains'][hre.network.name]['usdc']['contractAddress']);
  await tokenFarm.deployed();
  console.log("TokenFarm deployed to:", tokenFarm.address);

  let contract_owner = config['chains'][hre.network.name]['contract_owner']
  let envChain = config['chains'][hre.network.name]['chain']

  let tokenFarmAddress = tokenFarm.address

  config['deployed'] = {
    tokenFarmAddress,
    envChain,
    contract_owner
  }

  fs.writeFileSync('config.json', JSON.stringify(config, null, 4))
}

main();
