import React, { Component } from 'react';
import logo from './media/camera.svg';
import PropTypes from 'prop-types';
import defaultIcon from './media/map-marker.svg';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as maps from './maps.js';
import InfoWindowContent from './InfoWindowsContent'
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
      venuesDetail: {},
      Photos: {},     
      venues: [],      
      venuesId: {}
      
    };
  }

getid = () => {
    let venuestId = this.state.selectedPlace.id === "" ?  "4e37c5286284fcf7399e92ce" : this.state.activeMarker.id
}

   render () {
         this.venuestId
    }

  getLocations() {
        maps.getLocationsAll()
        .then(venues => {
        this.setState({ venues: venues }) 
        this.setState({ venuesId: venues.id })
        })
    }
  componentWillMount () {
    this.getLocations();
}
    getDetails() {
        maps.getVenueDetails("4e37c5286284fcf7399e92ce")
        .then((venuesDetail) => {
        this.setState({ venuesDetail: venuesDetail })
        this.setState({ Photos: venuesDetail.bestPhoto })

        })
    }
  componentDidMount () {
    this.getDetails();
    
    }  
  venuesDetailUpdate = (venuesID) => {
    maps.getVenueDetails(venuesID).then(() => {
            this.getDetails()
      })
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      venuesID: this.state.selectedPlace.id,
      icon: logo,
      venuesDetailUpdate: this.venuesDetailUpdate

    });
  };
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        icon: defaultIcon,
        
      })
    }
  };

	onMouseoverMarker(props, marker, e) {
  		this.setState({
      selectedPlace: props,
      activeMarker: marker,
      icon: defaultIcon
      
    });
	};
 
  onInfoWindowClose= (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
       showingInfoWindow: false,
       activeMarker: null,
       icon: defaultIcon
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
          <span className="text">of</span>
          <input id="search-within-time-text" type="text" placeholder="Ex: Google Office NYC or 75 9th Ave, New York, NY"/>
          <input id="search-within-time" type="button" value="Go"/>
        </div>
      </div>

       <div id="map">
       
       <Map

          google={this.props.google}
          onClick={this.onMapClicked}
         
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
                               icon={this.state.selectedPlace.id === myMarker.id ? this.state.icon : defaultIcon }
                                position={myMarker.location}
                                title={myMarker.title}
                                name={myMarker.name}
                               // animation={this.state.selectedPlace.id === myMarker.id ? '1' : '0'}
                               
            //Bounce animation for the marker
           // infowindow.marker = marker.setAnimation(window.google.maps.Animation.BOUNCE);
            //setTimeout(function () {
            //    marker.setAnimation(null);
           // }, 1000);
                                //animation={this.props.google.maps.Animation.DROP}
                                //animation={(this.state.activeMarker === myMarker.name)
                                //&& this.props.google.maps.Animation.BOUNCE}

                               animation={this.state.activeMarker ? (myMarker.id === this.state.selectedPlace.id ? '1' : '0') : '0'}
                                                       > 
                            </Marker>
                            

         )} 

      <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose} 
          onClick={this.onMarkerClick}
          venuesDetailUpdate={this.venuesDetailUpdate}
          >
                      
             <h1> {this.state.selectedPlace.name}</h1>
           
   <img id="img" tabIndex = {0} alt={this.state.selectedPlace.name} className="site-image" src={this.state.Photos.prefix+this.state.Photos.width+'x'+this.state.Photos.height+this.state.Photos.suffix} />
      
        
   
              
           
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
