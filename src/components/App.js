import DStorage from '../abis/DStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';
import { get } from 'babel-register/lib/cache';

const ipfsClient = require('ipfs-http-client');
const INFURA_ID="2NeUJyIEr4hgyU79zTq8Dyhgmcf"
const INFURA_SECRET_KEY="c827d016570d96697a923d7929f17e6f"
const auth = 'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
// const ipfsClient = require('ipfs-http-client')

  const ipfs =  ipfsClient.create(
      {
        host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
          authorization: auth,  
      }
    }
  );
  
  



class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
   
    const networkId = await web3.eth.net.getId()
    const networkData = DStorage.networks[networkId]
    if(networkData) {
 
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)
      this.setState({ dstorage })
    
      const filesCount = await dstorage.methods.fileCount().call()
      this.setState({ filesCount })
  
      for (var i = filesCount; i >= 1; i--) {
        const file = await dstorage.methods.files(i).call()
        this.setState({
          files: [...this.state.files, file]
        })
      }
    } else {
      window.alert('DStorage contract not deployed to detected network.')
    }
  }

  captureFile = event => {
    event.preventDefault()

    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer', this.state.buffer)
    }
  }

  uploadFile = async (description) => {
    console.log("Submitting file to IPFS...")
   
   const m =  await ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', m.cid)
      if(result){
        console.log("success")
        console.log(m.cid)
      }
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
     
      if(this.state.type === ''){
        this.setState({type: 'none'})
      }
      this.state.dstorage.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
         loading: false,
         type: null,
         name: null
       })
       window.location.reload()
      }).on('error', (e) =>{
        window.alert('Error')
        this.setState({loading: false})
      })
    })
    alert("fle has been uploaded")


  }

  getFile = async() => {
    const files = []

    let data = ipfs.pin.ls((err, pinset) => {

      if (err) {
        console.error(err);
      } else {
        console.log(pinset);
      }
    });

    for await (const itr of data) {
      let cid = itr.cid
      cid = String(cid)
      files.push("https://ipfs.io/ipfs/"+cid)
      console.log(cid)
    }
    return files
  }


  

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dstorage: null,
      files: [],
      loading: false,
      type: null,
      name: null
    }
    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.getFile = this.getFile.bind(this)
  }

  componentDidMount() {
    this.getFile().then((data) => {
      this.setState({ files: data });
    });
  }

  render() {
   //history 



    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
       <div className="adam1">
         
        
         
       </div>
      </div>
    );
  }
}

export default App;