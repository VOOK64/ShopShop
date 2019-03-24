import React, { Component } from 'react';
import SwitchEshop from './SwitchEshop';
import './App.css';

class App extends Component {
  state = {
    games: [],
    prices: [],
  }

  getEurope = () => {
    SwitchEshop.getGamesEurope().then((games) => {
      console.log(`Europe`, games);
      this.setState({ games });
      console.log(this.state.games.length + ' games on eShop');

      const ids = games.filter(g => g.nsuid_txt[0]).map(g => g.nsuid_txt[0]);

      SwitchEshop.getPrices("AU", ids).then(prices => {
        //dunno what the fuck to do
        this.setState({ prices });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.getEurope}>Get all the things!</button>

        {this.state.games.length ? (
          <ul>
            {this.state.games.map((game, prices) => (
              <li key={game.title}>
              {game.title} ( {game.prices} )
              </li>
            ))}
          </ul>
        ) : null}    
      </div>
    );
  }
}

export default App;
