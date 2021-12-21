import React from 'react';
import Client from './contracts/Client.json';
import  './App.css';
import Web3 from "web3";
import {ABI, Address} from './EthereumSetup';


class App extends React.Component{

  async componentWillMount() {
    this.loadWeb3();
    this.loadBlockchainData();   
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#282c34";
  }


  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.sendToken = this.sendToken.bind(this);
    // this.loadBlockchainData = this.loadBlockchainData.bind(this);

    this.state = {
      name : "",
      name2 : " ",
      account : "",
      link : ''
    }
 }

  

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  handleChange = (event) => {
    this.setState({
      name2 : event.target.value
    });
  };


  async sendToken() {
    const web3 = window.web3;
    const webeProvider = new Web3(Web3.givenProvider);
    const accounts = await webeProvider.eth.getAccounts();

    this.setState({ account: accounts[0] });
    console.log("Sender :  " + accounts[0]);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Client.networks[networkId];

    const instance = new web3.eth.Contract(
      Client.abi,
      deployedNetwork.address
    );

    await instance.methods
      .setName(this.state.name2)
      .send({
        from: accounts[0],
      });

    // const totalSupply = await instance.methods.totalSupply().call();
    // this.setState({ totalSupply: totalSupply });
    // console.log("Total Supply" + totalSupply);
  }





  async loadBlockchainData() {
    const web3 = window.web3;
    const webeProvider = new Web3(Web3.givenProvider);
    const accounts = await webeProvider.eth.getAccounts();

    this.setState({ account: accounts[0] });
    console.log("Sender :  " + accounts[0]);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Client.networks[networkId];

    const instance = new web3.eth.Contract(
      Client.abi,
      deployedNetwork.address
    );

    const name = await instance.methods.showName().call();
    this.setState({ name: name });

 
    }


  // sendName2() {
  //   this.setState({name : this.state.name2})dfdff
  // }



  render(){
    return (
      <div>
      {/* <h>Amins Sabte Ahval</h> */}
      <div className="App">
        

       <form class="row g-3">
        <div class="col-auto">
          {/* <label for="staticEmail2" class="visually-hidden">Email</label> */}
          {/* <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="email@example.com"/> */}
        </div>
        <div class="col-auto">
          <p>{this.state.name}</p>

          <input 
          type="text" 
          value={this.state.name2} 
          onChange={this.handleChange}
          class="form-control" 
          id="inputPassword2" 
          placeholder="name"
          />

        </div>
        <div class="col-auto">
          <button type="submit" onClick={this.sendToken} class="btn btn-primary mb-3">SetName</button>
           <button type="submit" onClick={this.loadBlockchainData} class="btn btn-primary mb-3">ShowName</button>
        </div>
      </form>
        

      </div>
      </div>
    );
  }
}

export default App;
