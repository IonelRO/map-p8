import React, { Component } from 'react';
import logo from './media/camera.svg';
import PropTypes from 'prop-types';
import InfoWindowContent from './InfoWindowsContent'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as maps from './maps.js';
import './App.css';

class MapContainer extends Component {


 
 constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.state = {
      showingInfoWindow: false,
      selectedPlace: {},
      activeMarker: {},       
      venues: [],
    
      selectedMarkerId: -1 ,
      
    };
  }
  
   componentDidMount() {
        //Get 6 FourSquare (third party) API details
        const url = 'https://api.foursquare.com/v2/venues/search?&radius=250&limit10&client_id=HEZXEFLMPE4HONPDQEGOSWEUYNSAIKUZKXRBNPZSK55QK4PC&client_secret=E0TQXTI1GT4BRRABITQIQZSPYSFSBJ0UHRQZH5U00X30DP5B&limit=6&v=20180812&ll=45.039638,23.266628';
        fetch(url)
            .then(data => {
                if (data.ok) {
                    //console.log(data.json());
                    return data.json();
                } else {
                    throw new Error(data.statusText)
                }
            })
            .then(data => {
                const venues = data.response["venues"];
                this.setState({ venues: venues });
                this.Map();
                this.onclickLocation();
               
            })
            .catch(err => {
                this.setState({ error: err.toString() })
            })
          }
     
  
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      markericon: logo

    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        markericon: {}
      })
    }
  };

	onMouseoverMarker(props, marker, e) {
  		this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      
    });
	};
 
  onInfoWindowClose= (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        markericon: {}
      })
    }
  };

  
 
  render() {
     // const myMarkers = [
      //  {id:'ChIJzfT-fWqKTUcRnrl89u6v4TE', title: 'Endless column', name:'Endless column', position:{lat: 45.037426, lng: 23.285344}},
      //  {id:'ChIJCUZ-MmeKTUcRVvFxlambvOUtitle', title: 'The gate of the kiss', name:'The gate of the kiss', position: {lat: 45.039405, lng: 23.268641,}},
      //  {id:'ChIJY3IW52CKTUcRqIdjh9CM0CI', title: 'The Table of Silence', name:'The Table of Silence', position: {lat: 45.039638, lng: 23.266628}},
      //  {id:'ChIJkWy20WCKTUcRTgbOJzqzDuk', title: 'Chairs Street', name:'Chairs Street', position: {lat: 45.039585, lng: 23.267191}},
      //  {id:'ChIJG2hvBmiKTUcR4Zwsh_8J_oA', title: 'Gorj County Museum', name:'Gorj County Museum', position: {lat: 45.0392, lng: 23.276107}},
      //  {id:'ChIJ_SXJzGmKTUcRpRJO0vXWc2k', title: 'Saints Peter and Paul Church', name:'Saints Peter and Paul Church', position: {lat: 45.038293, lng: 23.27872}}
      // ]
 //var defaultIcon = {
  //      url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|0091ff|40|_|%E2%80%A2', // url
   //     scaledSize: new this.props.google.maps.Size(20, 30), // scaled size
  //  };
  //   var highlightedIcon = {
  //      url:  'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2', // url
 //       scaledSize: new this.props.google.maps.Size(20, 30), // scaled size
 //   };


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
          onClick={this.onMapClicked}
          //icon={this.state.activeMarker === null ? '' : logo}
           initialCenter={{
            lat: 45.039638,
            lng: 23.266628
          }}
          zoom={15}


        >
        {this.state.venues.map(myMarker =>
        <Marker key={myMarker.id}
                               // onMouseover={this.onMouseoverMarker}
                               id={myMarker.id}
                                onClick={this.onMarkerClick}
                                icon = {this.state.markerIcon}
                                //icon={this.state.activeMarker === null ? '' : logo}
                                position={myMarker.location}
                                title={myMarker.title}
                               // icon={logo}
                                name={myMarker.name}
                                //animation={this.props.google.maps.Animation.DROP}
                                //animation={(this.state.activeMarker === myMarker.name)
                                //&& this.props.google.maps.Animation.BOUNCE}

                               // animation={this.state.activeMarker ? (this.state.venues.id === this.state.selectedPlace.title ? '1' : '0') : '0'}
                                                       > 
                            </Marker>
                            

         )} 

      <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose} 
          onClick={this.onMarkerClick}

          >
          
            <div>
             <h1> <InfoWindowContent/></h1>
                         
     
              
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


    //.catch(error => {console.log(`Error while Getting Venue Details `, error)})
