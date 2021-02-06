
import React from 'react';
import ReactDOM from 'react-dom';
import '../block.css';
import axios from "axios"
import {search} from "../utils.js"

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: {},
      loading: false,
      message: ""
    }
  }

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({query: e.target.value});
  };

  handleSearchClick = () => {
    // alert("Hello world!");
    // axios.get("https://listen-api-test.listennotes.com/api/v2/search?q=startup")
    //       .then(res => {
    //         alert(res);
    //       })
  };


  search = async query => {
    this.setState({loading: true});
    console.log(encodeURIComponent(query));
    //await means async request
    const res = await search(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=show,episode&limit=10`);
    //access relevant information from data returned by the API
    const recommendations = await res
    this.setState({loading: false, results:recommendations});
  };

  render() {
    return (
      //React fragment: used to group multiple elements together
      <>
        <div className="searchBlock">
          <div className="inputContainer block wrapper">
            <input type="search" placeholder="Search for similar podcasts to"
                  onChange = {evt => this.onChangeHandler(evt)}
                  autoFocus/>
          {/*   ${this.autoCompletes && this.inputFocused
           ? AutoCompleteDropdown(this.autoCompletes, this.tabIdx)
           : null}*/}
          </div>
          <button onClick={this.handleSearchClick} className="block">Generate!</button>
        </div>

      </>

    );
  }
}

export default SearchBar
