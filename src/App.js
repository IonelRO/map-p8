import React, { Component } from 'react';
import MapContainer from './MapContainer';
import './App.css';
import * as maps from './maps.js';

class App extends Component {
  state = {
  seletedMarkerId: {}

  }
  markerUpdate() {
        maps.getVenueDetails().then((seletedMarkerId) => {
        this.setState({ seletedMarkerId: seletedMarkerId })
        })
    }
  componentDidMount () {
    this.markerUpdate()
    }  
  render() {
    return (
      <div className="App">
     

        <MapContainer 
        //seletedMarkerId={this.state.seletedMarkerId}
         onMarkerClick = {this.onMarkerClick}
        />
      </div>
    );
  }
}

export default App;
