import React, { Component } from 'react';
import Identicon from 'identicon.js';
import './Navbar.css';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark p-0 text-monospace">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          rel="noopener noreferrer"
        >
         <span className="span1">S</span> 
         <span className="span2">T</span> 
         <span className="span3">O</span> 
         <span className="span3">R</span> 
         <span className="span3">E</span> 
         <span className="span3">&nbsp;</span> 
         <span className="span3">I</span> 
         <span className="span3">T</span> 
         <span className="span3">&nbsp;</span> 
         <span className="span3">T</span> 
         <span className="span3">O</span> 
         <span className="span3">D</span> 
         <span className="span3">A</span> 
         <span className="span3">Y</span> 
          
        </a>
        <ul className="navbar-nav px-3">
          <li>
            <small id="account">
              <a target="_blank"
                 alt=""
                 className="text-white"
                 rel="noopener noreferrer"
                 href={"https://etherscan.io/address/" + this.props.account}>
                {this.props.account.substring(0,6)}...{this.props.account.substring(38,42)}
              </a>
            </small>
            { this.props.account
              ? <img id="dpround"
                  alt=""
                  className='ml-2'
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;