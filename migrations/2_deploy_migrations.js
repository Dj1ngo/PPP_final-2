/* eslint-disable no-undef */
const NFT = artifacts.require('NFT')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(NFT, 'created NFTs', 'TNT', 10, accounts[1])
}