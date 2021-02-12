import React from 'react';
import ReactDOM from 'react-dom';
import '../block.css';


class Loaded extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        <div className="storedResults">
          <ul>
          {this.props.load &&
            this.props.selectedPodcasts.map(
                      (query, i) =>
                        <li className="selectedPocast" key={i}>{query.name}</li>
                    )
          }
          </ul>
        </div>
      </>
    )
  }
}


export default Loaded
