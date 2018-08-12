import React, { Component } from 'react';
import logo from './logo.svg';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
export class MapContainer extends React.Component {
state = {
    selectedPlace:{lat: 45.039638, lng: 23.266628}    
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
  render() {
    return (
      <div className="App">
        
 
    <div class="container">
      <div class="options-box">
        <h1>Târgu Jiu - Brîncuși - Home town</h1>
        <div>
          <input id="show-listings" type="button" value="Show Listings"/>
          <input id="hide-listings" type="button" value="Hide Listings"/>
          <hr/>
          <span class="text"> Draw a shape to search within it for homes!</span>
          <input id="toggle-drawing"  type="button" value="Drawing Tools"/>
        </div>
        <hr/>
        <div>
          <input id="zoom-to-area-text" type="text" placeholder="Enter your favorite area!"/>
          <input id="zoom-to-area" type="button" value="Zoom"/>
        </div>
        <hr/>
        <div>
          <span class="text"> Within </span>
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
          <span class="text">of</span>
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
                name={'Current location'} />
      <InfoWindow onClose={this.onInfoWindowClose}>
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