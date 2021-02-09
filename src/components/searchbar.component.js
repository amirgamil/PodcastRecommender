
import React from 'react';
import '../block.css';
import {search} from "../utils.js"
import DropDown from "./dropdown.component"


class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      resultsEmpty: true,
      loading: false,
      access_token: ""
    };
  }

  onChangeHandler = async e => {
    if (e.target.value) {
      this.search(e.target.value);
      this.setState({query: e.target.value});
    }
  };

  handleSearchClick = () => {
    // alert("Hello world!");
    // axios.get("https://listen-api-test.listennotes.com/api/v2/search?q=startup")
    //       .then(res => {
    //         alert(res);
    //       })
  };


  async authorize() {
      const apiIDs = {my_clientID: process.env.REACT_APP_CLIENT_ID,
               client_secret: process.env.REACT_APP_CLIENT_SECRET};
      const stringRequest = new Buffer(apiIDs.my_clientID + ":" + apiIDs.client_secret).toString('base64')

      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Basic ${stringRequest}`);
      // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "client_credentials");

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      }

      let res = await fetch("https://accounts.spotify.com/api/token", requestOptions);
      res = await res.json();
      return res.access_token;
    }

  search = async query => {
    this.setState({loading: true});
    const set_token = await this.authorize();
    this.setState({access_token:set_token});

    //await means async request
    const res = await search(set_token, `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=episode&limit=8&market=us`);

    //access relevant information from data returned by the API
    const recommendations = await res
    this.setState({loading: false});
    this.handleRecommendations(recommendations);
  };

  handleRecommendations(recs) {
    var resultsArray = [];
    try {
      recs.episodes.items.forEach(dict => resultsArray.push({name:dict.name,
                                                            link: dict.external_urls.spotify})
                                 );
    } catch (error) {
      console.log('Error processing result of search');
    }
    this.setState({results: resultsArray});
    if (resultsArray.length != 0) {
      this.setState({resultsEmpty: false});
    }
    console.log(recs);
  }

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
           <DropDown displayResults={this.state.results}
                     load={!this.state.resultsEmpty}/>
          </div>
          <button onClick={this.handleSearchClick} className="block">Generate!</button>
        </div>

      </>

    );
  }
}

export default SearchBar
