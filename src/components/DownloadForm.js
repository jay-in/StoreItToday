import React, { Component } from "react";

class DownloadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          inputString: '',
          modifiedString: '',
        };
        this.state = {
          vt: '',
          svtext: '',
        };
      }
    
      handleInputChange = (event) => {
        this.setState({ inputString: event.target.value });
      }
    
      handleModifyClick = () => {
        // perform modifications on input string and update state
        let modifiedString = 'https://ipfs.io/ipfs/' + this.state.inputString;
        this.setState({ modifiedString });
        let svtext = 'Click here to download the file';
        this.setState({svtext})
      }
    
      render() {
        return (
          <div style={styles.container}>
            <input
              type="text"
              style={styles.inputField}
              placeholder="Enter the hashed file key"
              onChange={this.handleInputChange}
            />
            <button
              style={styles.modifyButton}
              onClick={this.handleModifyClick}
            >
              Download the file
            </button>
            {/* <p style={styles.outputText}>{this.state.modifiedString}</p> */}
            <a style={styles.outputText} href={this.state.modifiedString}>{this.state.svtext}</a>
          </div>
        );
      }
    }
    
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh'
      },
      inputField: {
        padding: '10px',
        color: 'white',
        fontSize: '1.2rem',
        border: '1px solid gray',
        borderRadius: '5px',
        marginBottom: '20px',
        width: '80%'
      },
      modifyButton: {
        padding: '10px',
        fontSize: '1.2rem',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '80%',
        maxWidth: '200px'
      },
      outputText: {
        marginTop: '20px',
        fontSize: '1.2rem'
      }
    };
export default DownloadForm;