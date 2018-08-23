import React, { Component } from 'react';
import logo from './media/camera.svg';
import defaultIcon from './media/map-marker.svg';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as maps from './maps.js';
import Header from './Header.js';
import Footer from './Footer.js';
import './App.css';


class App extends Component {
static propTypes = {
  }
  state = {
    imageSrc: {}, 
    venueDetails: {},
    detailsString: '',
    success: false,
    infoLoaded: false,
    flickrImgimages: [],
    selectedPlace: "",

  }
  
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.state = {
      showingInfoWindow: false,
      selectedPlace: "",
      activeMarker: {},
      venues: [],      
      infoLoaded: true,
      query: "",
      findPlaces: [],
      markerfl: null,
      hasError: false
    };
  }

  //Handles error catching
  componentDidCatch(err) {
    console.log("An error occured " + err);
    this.setState({ hasError: true });
  }

  getLocations() {
        maps.getLocationsAll()
        .then(venues => {
        this.setState({ venues: venues })       
          
  })
  }  
   
componentDidMount () {
  this.getLocations()
}

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,

      activeMarker: this.refs.marker,
     
      showingInfoWindow: true,
      icon: logo,
     });
  };
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: props,
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
updateQuery = (query) => {
    this.setState({ query: query })
     this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        icon: defaultIcon,

      })
    this.updatesfindLocations(query)   
  }

updatesfindLocations = (query) => {
        //query interogation, look for books that match
        if (query) {
            //using maps display matching places
            maps.getSelectedAll(query).then((findPlaces) => {
                //check if search query doesn't exist or generate error, then no results, empty array               
                //Reference: https://dev.to/sarah_chima/error-boundaries-in-react-3eib
                if (findPlaces.error) {
                    this.setState({ findPlaces: [] })
                } else {
                //in books math with query then it are displayed
                    this.setState({ findPlaces: findPlaces })
                    this.setState({ venues: findPlaces })
                    
                }
            })
            //no query shows us no results, empty array
        } else {
            this.setState({ findPlaces: [] })
        }
    }
  
  render() {
    
     const {hasError } = this.state;
     
     const {markerfl}=this.state.selectedPlace.id === "" ? {id : this.selectedPlace.id, position : this.selectedPlace.location, title: this.selectedPlace.title}: "";
     
     return (
     
     
    
    <div className="wrapper">
  <header className="header"><Header/></header>
  <article className="main">
    
    {hasError ? (
            window.alert(
              "Something went wrong. Please check your Google Maps API key or internet connection and reload the browser"
            )
          ) : (
            
         
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
        <Marker 
          key={myMarker.id}
          id={myMarker.id}
          onClick={this.onMarkerClick}
          icon={this.state.selectedPlace.id === myMarker.id ? this.state.icon : defaultIcon }
          position={myMarker.location}
          title={myMarker.title}
          name={myMarker.name} 
          animation={this.state.selectedPlace ? (myMarker.id === this.state.selectedPlace.id ? '1' : '0') : '0'}
        > 
        </Marker>
      )} 
      
        <InfoWindow 

          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}         
          onClose={this.onInfoWindowClose}
        >
           <div key={this.state.selectedPlace.id}>                    
           <h1> {this.state.selectedPlace.name} </h1>
          {this.state.venues.map(info =>            
           <div key={info.id}> 
           <p>{this.state.selectedPlace.id === info.id ?info.location.address : ''} </p>
           <p>{this.state.selectedPlace.id === info.id ?info.location.crossStreet : ''} </p>
           </div>  
        )}
            </div>
        </InfoWindow>       

      </Map>
       )}
    
  </article>
  <aside className="aside aside-1">
        <h1>Find places on the map</h1>
        
         

      <div className="input-wrapper">
          <input
            type="text"
            placeholder="Find places on map"
            aria-label="Find places on map"
            onChange={e => this.updateQuery(e.target.value)}
          />
      </div>
      <div>
        <ul className="filtered-list" tabIndex="0">
          {
        
        this.state.venues.map(place =>
              <li ref="{this.state.marker}"
               
                key={place.id}
                className="result-item"
                tabIndex="0"
                id={place.id}                
               
                onClick={e => this.onMarkerClick(place, this.state.marker, e)}                
                          
              >
                {place.name}
          
              </li>

            )
          }
        </ul>
        
      </div>
    
      </aside>

  <footer className="footer"><Footer/></footer>
</div>

 



    );
  }
}


    export default GoogleApiWrapper({
      apiKey: "AIzaSyB7Ma3Ggl2TFUdsMaW8E4_F62uR65DPHZQ",
      v: "3.30"
    })(App);