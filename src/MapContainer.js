import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
export class MapContainer extends React.Component {
state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <div className="App">


    <div className="container">
      <div className="options-box">
        <h1>Târgu Jiu - Brîncuși - Home town</h1>
        <div>
          <input id="show-listings" type="button" value="Show Listings"/>
          <input id="hide-listings" type="button" value="Hide Listings"/>
          <hr/>
          <span className="text"> Draw a shape to search within it for homes!</span>
          <input id="toggle-drawing"  type="button" value="Drawing Tools"/>
        </div>
        <hr/>
        <div>
          <input id="zoom-to-area-text" type="text" placeholder="Enter your favorite area!"/>
          <input id="zoom-to-area" type="button" value="Zoom"/>
        </div>
        <hr/>
        <div>
          <span className="text"> Within </span>
          <select id="max-duration">
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="60">1 hour</option>
          </select>
          <select id="mode">
            <option value="DRIVING">drive</option>
            <option value="WALKING">walk</option>
            <option value="BICYCLING">bike</option>
            <option value="TRANSIT">transit ride</option>
          </select>
          <span>of</span>
          <input id="search-within-time-text" type="text" placeholder="Ex: Google Office NYC or 75 9th Ave, New York, NY"/>
          <input id="search-within-time" type="button" value="Go"/>
        </div>
      </div>
       <div id="map">
       <Map
          google={this.props.google}
           initialCenter={{
            lat: 45.039638,
            lng: 23.266628
          }}
          zoom={15}
          onClick={this.onMapClicked}
        >
  <Marker onClick={this.onMarkerClick}
    title={'Endless column'}
    name={'Endless column'}
    position={{lat: 45.037426, lng: 23.285344}} />
  <Marker onClick={this.onMarkerClick}
  	title={'The gate of the kiss'}
    name={'The gate of the kiss'}
    position={{lat: 45.039405, lng: 23.268641}} />
  <Marker />
  <Marker onClick={this.onMarkerClick}
    name={'The Table of Silence'}
    position={{lat: 45.039638, lng: 23.266628}} />
  <Marker onClick={this.onMarkerClick}
    name={'Chairs Street'}
    position={{lat: 45.039585, lng: 23.267191}} />
  <Marker onClick={this.onMarkerClick}
    name={'Gorj County Museum'}
    position={{lat: 45.0392, lng: 23.276107}} />
  <Marker onClick={this.onMarkerClick}
    name={'Saints Peter and Paul Church'}
    position={{lat: 45.038293, lng: 23.27872}} />

    <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
     </InfoWindow>

      </Map>
      </div>
    </div>
      </div>

    );
  }
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyB7Ma3Ggl2TFUdsMaW8E4_F62uR65DPHZQ",
  v: "3.30"
})(MapContainer);
