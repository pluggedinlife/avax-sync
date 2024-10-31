import Web3 from "web3";
const AVALANCHE_RPC_URL = "https://api.avax.network/ext/bc/C/rpc";
const web3 = new Web3(new Web3.providers.HttpProvider(AVALANCHE_RPC_URL));

export default web3;
