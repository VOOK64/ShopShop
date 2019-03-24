import React, { Component } from 'react';
import './App.css';


import { getGamesEurope, getPrices, parseNSUID, Region} from 'nintendo-switch-eshop';

import { JsonTable } from 'ts-react-json-table';


class App extends Component {
  runGetGames = async () => {
 

      console.log("Starting to fetch games...");
      const games = await getGamesEurope();


      const gameIds = games.map(g => parseNSUID(g, Region.EUROPE));

      console.log(`Fetching prices for ${gameIds.length} games in 'Australia'...`);
      const priceData = await getPrices("AU", gameIds);
      const gamesOnSale = [];
      // Filter games with discount
      const discountPrices = priceData.prices.filter(p => p.discount_price);

      // Filter games on our discount list
      discountPrices.forEach(price => {
        const game = games.find(g => parseNSUID(g, Region.EUROPE) == price.title_id);
        if (game) {
          game.price_data = price;
          gamesOnSale.push(game);
        }
      });

      console.log(`Found ${gamesOnSale.length} games on sale`);

      const jsonData = JSON.stringify(gamesOnSale, null, 4);

      console.log(jsonData)

      var items = [
        {jsonData}
      ]

      React.createElement(<JsonTable rows = {items} />), document.getElementsByClassName('table')

  };

  render() {
    return (
      <div className="App">
        <button onClick={this.runGetGames}>Get all the things!</button>

        <div className="table" />
        
      </div>
    );
  }
}

export default App;
