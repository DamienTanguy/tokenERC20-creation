<template>
  <p>You have {{ balance }} {{ name }} ( {{ symbol }} ) over on total supply of  {{ totalSupply }} token</p>
</template>

<script>
import { ethers } from 'ethers';
import Token from '@/artifacts/contracts/Token.sol/Token.json';
export default {
  name: 'App',
  data() {
    return {
      contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      balance: 0,
      name: '',
      symbol: '',
      totalSupply: 0
    }
  },
  mounted(){
    this.getBalance();
  },
  methods : {
    getBalance: async function(){
      if(typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({method : 'eth_requestAccounts'});
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(this.contractAddress, Token.abi, provider); //new instance of the contract to interact with the function of the contract
        this.name =  await contract.name();
        this.symbol =  await contract.symbol();        
        let totalSupply =  await contract.totalSupply();
        totalSupply = totalSupply / (10 ** 18);
        this.totalSupply = totalSupply.toString();
        let balance =  await contract.balanceOf(accounts[0]);
        balance = balance / (10 ** 18);
        this.balance = balance.toString();
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
