import React, { Component } from 'react';
import SwitchEshop from './SwitchEshop';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    games: [],
    prices: []
  }

  getAmerica = () => {
    SwitchEshop.getGamesAmerica().then((games) => {
      console.log(`America`, games);
      this.setState({ games });
    });
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

  getJapan = () => {
    SwitchEshop.getGamesJapan().then((games) => {
      console.log(`Japan  `, games);
      this.setState({ games });
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.getAmerica}>Get America</button>
        <button onClick={this.getEurope}>Get Europe</button>
        <button onClick={this.getJapan}>Get Japan</button>

        {this.state.games.length ? (
          <ul>
            {this.state.games.map((game, prices) => (
              <li
                key={game.title || game.TitleName}
              >
                {game.title || game.TitleName} [{prices.regular_price}]
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default App;
