import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
<<<<<<< HEAD
export class MapContainer extends React.Component {
state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
||||||| merged common ancestors
export class MapContainer extends React.Component {
state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}    
=======
import data from './data';
class MapContainer extends Component {

  state = {
      markerData: [],
      activeMarker: {},
      activeMarkerIndex: false,
      selectedPlace: {},
      showingInfoWindow: false
      
  };
  makeMarkerIcon(markerColor) {
    const markerImage = new window.google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor + '|40|_|%E2%80%A2',
      new window.google.maps.Size(21, 34),//This marker is 21 pixels wide by 34 pixels high
      new window.google.maps.Point(0, 0),//The origin for this image is (0, 0)
      new window.google.maps.Point(10, 34),//The anchor for this image is (10, 34)
      new window.google.maps.Size(21,34)//scaledSize
    );
    return markerImage;
>>>>>>> 94203cec070e9269c5b40f5d465201915cefbd98
  }
<<<<<<< HEAD

constructor(props) {
||||||| merged common ancestors
  
constructor(props) {
=======

 constructor(props) {
>>>>>>> 94203cec070e9269c5b40f5d465201915cefbd98
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
        activeMarker: null,
        fillColor: {},
        
      })
    }
  };

	onMouseoverMarker(props, marker, e) {
  		this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      icon: 'markerColor'    
    });
	};
 
	

  render() {
<<<<<<< HEAD
    return (
      <div className="App">


    <div className="container">
      <div className="options-box">
||||||| merged common ancestors
    return (
      <div className="App">
        
 
    <div class="container">
      <div class="options-box">
=======
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
>>>>>>> 94203cec070e9269c5b40f5d465201915cefbd98
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
<<<<<<< HEAD
          <span>of</span>
||||||| merged common ancestors
          <span class="text">of</span>
=======
          <span className="text">of</span>
>>>>>>> 94203cec070e9269c5b40f5d465201915cefbd98
          <input id="search-within-time-text" type="text" placeholder="Ex: Google Office NYC or 75 9th Ave, New York, NY"/>
          <input id="search-within-time" type="button" value="Go"/>
        </div>
      </div>
       <div id="map">

       <Map
          
          google={this.props.google}
<<<<<<< HEAD
||||||| merged common ancestors
          onClick={this.onMapClicked}
=======
          onMapClicked={this.props.onMapClicked}         
>>>>>>> 94203cec070e9269c5b40f5d465201915cefbd98
           initialCenter={{
            lat: 45.039638,
            lng: 23.266628
          }}
          zoom={15}
<<<<<<< HEAD
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

||||||| merged common ancestors
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

=======
        > 
        {myMarkers.map(myMarker => 
        <Marker key={myMarker.name}
                               
                                onClick={this.onMarkerClick}
                                onMouseover={this.onMouseoverMarker}
                                position={myMarker.position}
                                title={myMarker.title}
                                name={myMarker.name}                               
                                animation={this.props.google.maps.Animation.DROP}
                            />
         )}
>>>>>>> 94203cec070e9269c5b40f5d465201915cefbd98
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
