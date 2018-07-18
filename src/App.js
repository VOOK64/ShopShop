import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const SwitchEshop = require('nintendo-switch-eshop');

SwitchEshop.getGamesAmerica().then(games => {
    const ids = games.filter(g => g.nsuid).map(g => g.nsuid);

    SwitchEshop.getPrices("US", ids).then(priceData => {
        // 
    })
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}

export default App;
