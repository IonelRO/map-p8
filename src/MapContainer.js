import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
class MapContainer extends Component {

  state = {
      markerData: [],
      activeMarker: {},
      activeMarkerIndex: false,
      selectedPlace: {},
      showingInfoWindow: false
      
  };

 constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.state = {
      showingInfoWindow: false,
     
      activeMarker: {},
      selectedPlace: {},
      fillColor: {}
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

	onMouseoverMarker(props, marker, e) {
  		this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true    
    });
	};
 
  render() {
     const myMarkers = [
        {title: 'Endless column', name:'Endless column', position:{lat: 45.037426, lng: 23.285344}},
        {title: 'The gate of the kiss', name:'The gate of the kiss', position: {lat: 45.039405, lng: 23.268641,}},
        {title: 'The Table of Silence', name:'The Table of Silence', position: {lat: 45.039638, lng: 23.266628}},
        {title: 'Chairs Street', name:'Chairs Street', position: {lat: 45.039585, lng: 23.267191}},
        {title: 'Gorj County Museum', name:'Gorj County Museum', position: {lat: 45.0392, lng: 23.276107}},
        {title: 'Saints Peter and Paul Church', name:'aints Peter and Paul Church', position: {lat: 45.038293, lng: 23.27872}}
       ]	

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
          <span className="text">of</span>
          <input id="search-within-time-text" type="text" placeholder="Ex: Google Office NYC or 75 9th Ave, New York, NY"/>
          <input id="search-within-time" type="button" value="Go"/>
        </div>
      </div>
       <div id="map">

       <Map
          
          google={this.props.google}
          onMapClicked={this.props.onMapClicked}         
           initialCenter={{
            lat: 45.039638,
            lng: 23.266628
          }}          
          zoom={15}
        > 
        {myMarkers.map(myMarker => 
        <Marker key={myMarker.name}
                               
                                onClick={this.onMarkerClick}
                              //  onMouseover={this.onMouseoverMarker}
                                position={myMarker.position}
                                title={myMarker.title}
                                name={myMarker.name}                               
                                animation={this.props.google.maps.Animation.DROP}
                            />
         )}
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