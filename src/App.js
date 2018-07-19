import React, { Component } from 'react';
import SwitchEshop from './SwitchEshop';
import './App.css';

class App extends Component {
  state = {
    games: [],
    prices: []
  }



  getEurope = () => {
    SwitchEshop.getGamesEurope().then((games) => {
      console.log(`Europe`, games);
      this.setState({ games });

      const ids = games.filter(g => g.nsuid_txt[0]).map(g => g.nsuid_txt[0]);

      SwitchEshop.getPrices("AU", ids).then(prices => {
        this.setState({ prices });
      })
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.getEurope}>Get Europe</button>

        {this.state.games.length ? (
          <ul>
            {this.state.games.map((game) => (
              <li
                key={game.title}
              >
                {game.title}
              </li>
            ))}
          </ul>
        ) : null}

      {this.state.prices.length ? (
          <ul>
            {this.state.games.prices.map((prices) => (
              <li
                key={prices.regular_price}
              >
                {prices.regular_price} [{prices.regular_price}]
              </li>
            ))}
          </ul>
        ) : null}        
      </div>
    );
  }
}

export default App;
