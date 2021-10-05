import Web3 from "web3";

// const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

export  const ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "setName",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "showName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]

export const Address = '0x068Da649b833eE3C34Bb1BcEdA298beb797fcC67';

// let Contract = new web3.eth.contract(ABI, Address);

