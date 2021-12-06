import React, {useEffect, useState } from 'react';
import {  checkIfWalletIsConnected, connectWallet} from './web3/phantom'
import { frmatAccount } from './utils/displayAccounts'
import RibbonAlert from './components/ribbonAlert';
import CandyMachine from './CandyMachine';
import { reason, TWITTER_LINK, TWITTER_HANDLE } from './utils/constants';
import twitterLogo from './assets/twitter-logo.svg';

import './App.css';


const App = () => {

    // state vars
  // Hold Solana Object injected into the browser if it exists
  //const [, setSolana] = useState(null)              
  // Solana Phantom Wallet address the user has connected to our Dapp
  const [walletAddress, setWalletAddress] = useState(null)  
  // Set it  to display alert at top of page if precondtions are not met
  const [ribbonAlert, setAlertRibbon] = useState(null)


// on Load methods ************************************************************************
// When our component first mounts, let's check to see if we have a connected Phantom Wallet from previous
// user visits to our Dapp; let's pass in the state var setting method for the UI to display accordingly
useEffect(() => {
  const onLoad = async () => {
    const { solana } = window
    if (solana) {
      const  address = await checkIfWalletIsConnected(solana);
      console.log('address regreso con', address)
      setWalletAddress(address)
     } else {
          alert('Solana object not found! Get a Phantom Wallet 👻');
          console.log(reason.NOT_PHANTOM_WALLET)
          setAlertRibbon(reason.NOT_PHANTOM_WALLET)
     }
  };
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
}, []);


  // Handling Methods *******************************************************************
const handleConnection = async () => {
  const address = await connectWallet();
  if (address) {
      await setWalletAddress(address);
    }
}

// rendering functions ************************************************************************

// We want to render this UI when the user hasn't connected their wallet to our app yet 
// or in case they already have a connected wallet but they have purposedly locked their wallet or set a timeout
// to lock it, this will ask for the unlocking password and set the address up 
const renderNotConnectedContainer = () => (
  <button
    className="cta-button connect-wallet-button"
    onClick={ handleConnection }
  >
 Connect to Phantom Wallet
</button>
);


  return (
    <div className="App">
      { (ribbonAlert && ribbonAlert.length!==0)  && <RibbonAlert reasonAlert={ribbonAlert} />}
      <div className="account">
            {walletAddress && frmatAccount(walletAddress)}
        </div>      
      <div className="container">
        <div className="header-container">
          <p className="header">🌇 Cities NFT </p>
          <p className="sub-text">An Implementation through Solana Candy DropNFT drop machine </p>
          <p className="sub-text">City Photos I've shooted</p>
          {!walletAddress  && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
        {walletAddress && <CandyMachine walletAddress={window.solana} />}        
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
