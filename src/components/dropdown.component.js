import React from 'react';
import ReactDOM from 'react-dom';
import '../block.css';
import axios from "axios"
import {search} from "../utils.js"


class DropDown extends React.Component {
  constructor(props) {
    super(props);
  }
  //todo: fix this
  handleClick = (evt, q, i, link) => {
    // window.location = loc;
    this.props.parentCallBack(q, true);
    evt.preventDefault();
  }

  render() {
    return (
      <>
        <div className="autoCompleteDropDown">
          {this.props.load &&
            this.props.displayResults.map(
                      (query, i) =>
                        <div className="autoCompleteItem" onClick =
                        {evt => this.handleClick(evt, query, i, query.link)} key={i}>{query.name}</div>
                    )
          }
        </div>
      </>
    )
  }
}


export default DropDown
