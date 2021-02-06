
import React from 'react';
import ReactDOM from 'react-dom';
import '../block.css';
import Header from "./header.component"
import SearchBar from "./searchbar.component"

class Main extends React.Component {
  render() {
    return (
      //React fragment: used to group multiple elements together
      <>
        <div className="main">
          <Header />
          <SearchBar />
        </div>

      </>

    )
  }
}

export default Main
