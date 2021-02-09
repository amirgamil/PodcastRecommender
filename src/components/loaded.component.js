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
          {this.props.load &&
            this.props.selectedPodcasts.map(
                      (query, i) =>
                        <a className="selectedPocast" key={i}>{query.name}</a>
                    )
          }
        </div>
      </>
    )
  }
}


export default Loaded
