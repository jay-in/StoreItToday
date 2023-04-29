import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment'



import './Main.css';
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
async function getData(hash) {


  let asyncitr = ipfs.cat(hash)

  for await (const itr of asyncitr) {

      let data = Buffer.from(itr).toString()
      // console.log(data)
  }
}



getData("Qmc4vP8WAQsgY4zEZ1XUkmKgjRQRwZ2AV3Eph5ni4z18dM");
class Main extends Component {
  

  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              <div className="card mb-3 mx-auto "  id="onee" style={{ maxWidth: '512px'}} >
                <h2 className="h2ahne text-black text-monospace" ><b><span style={{color:'red', fontSize:55}}>
                <span style={{color:'red', fontSize:100}}>STORE</span>
                {/* <span style={{color:'red', fontSize:65}}>T</span>
                <span style={{color:'red', fontSize:65}}>O</span>
                <span style={{color:'red', fontSize:65}}>R</span>
    <span style={{color:'red', fontSize:65}}>E</span> */}
              
                
                </span> <span style={{color:'rd'}}>it</span> <span style={{color:' '}}>today!</span></b></h2>
                <br></br>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.fileDescription.value
                    this.props.uploadFile(description)
                  }} >
                      <div className="form-group">
  
                        <br></br>
                          <input
                            id="fileDescription"
                            type="text"
                            ref={(input) => { this.fileDescription = input }}
                            className="form-control text-monospace"
                            placeholder="description..."
                            required />
                      </div>
                      <div className="onelinee" >  <input type="file"  onChange={this.props.captureFile} className="btn btn-white]"/> </div>
                     
                <div className="onelinee" >  <button type="submit"  style={{ color: "white", background: "black"}}  className="btn btn-dark"><b>Upload!</b></button> 
                </div>   
 
                      
                   
                    

                  </form>
              </div>
              <p>&nbsp;</p>
              <table className="table table-striped table-hover" style={{ width: '1000px', maxHeight: '450px'}}>
                <thead style={{ 'fontSize': '15px' }}>
                  <tr className="bg-dark text-white">
                    
                    <th scope="col" style={{ width: '230px'}}>Description</th>
                    <th scope="col" style={{ width: '200px'}}>File</th>
                    {/* <th scope="col" style={{ width: '120px'}}>Type</th>
                    <th scope="col" style={{ width: '90px'}}>Size</th>
                    <th scope="col" style={{ width: '90px'}}>Date</th>
                    <th scope="col" style={{ width: '120px'}}>Uploader/view</th>
                    <th scope="col" style={{ width: '120px'}}>Hash/view/get</th>
                    <th scope="col" style={{ width: '120px'}}>Qr code</th>
                    <th scope="col" style={{ width: '120px'}}>Share!</th> */}
                  </tr>
                </thead>
                { this.props.files.map((file, key) => {
                  return(
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr style={{ 'text-align': 'left' }}>
                        
                        <td>{file.fileDescription}</td>
                        <td><a href={file} target="_blank">{file}</a></td>
                        {/* <td>{file.fileType}</td>
                        <td>{convertBytes(file.fileSize)}</td>
                        <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                        <td>
                          <a
                            href={"https://etherscan.io/address/" + file.uploader}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.uploader.substring(0,10)}...
                          </a>
                         </td>
                         
                         <td>
                          <a
                            href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.fileHash.substring(0,10)}...
                          </a>
                         </td>
                        <td>
                          <img
                            src={"https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://ipfs.infura.io/ipfs/"  + file.fileHash}
                            >
                      
                          </img>
                        </td>
                        <td>
                        <a href={"whatsapp://send?text=https://ipfs.infura.io/ipfs/" + file.fileHash} data-action="share/whatsapp/share"> <img src="https://cdn-icons.flaticon.com/png/512/3670/premium/3670051.png?token=exp=1638032014~hmac=1458dfcedc3ab96e295096e579e6956a" height="20" width="20"></img> </a>
                        
                        <a href={"http://www.twitter.com/share?url=https://ipfs.infura.io/ipfs/" + file.fileHash} data-action="share/whatsapp/share"> <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" height="20" width="20"></img> </a>
                        </td> */}


                      </tr>
                    </thead>
                  )
                })}
              </table>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;