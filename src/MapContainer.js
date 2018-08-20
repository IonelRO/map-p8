import React, { Component } from 'react';
import logo from './media/camera.svg';
import PropTypes from 'prop-types';
import defaultIcon from './media/map-marker.svg';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as maps from './maps.js';
import ImageViewer from './ImageViewer.js'
import './App.css';


class MapContainer extends Component {
static propTypes = {
  }
  state = {
    imageSrc: {}, 
    venueDetails: {},
    detailsString: '',
    success: false,
    infoLoaded: false,
    flickrImgimages: [],
  }
  
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.state = {
      showingInfoWindow: false,
      selectedPlace: {},
      activeMarker: {},
      venuesDetail: [],
      Photos: {},     
      venues: [],      
      venuesId: {},
      Locationid: [],
      img: {},
      flickrImgimages: [],
      infoLoaded: true
    };
  }

//getid = () => {
//    let venuesId = this.state.selectedPlace.id === "" ?  "4e37c5286284fcf7399e92ce" : this.state.activeMarker.id
//}

   //return () {
   //   this.venuesId
         
  // }

getImages() {
        maps.getflickrImg()
        .then(flickrImgimages => {
        this.setState({ flickrImgimages: flickrImgimages })
       // this.setState({ venuesId: venues.id }) 
          
  })
  }


  getLocations() {
        maps.getLocationsAll()
        .then(venues => {

        this.setState({ venues: venues })
       // this.setState({ venuesId: venues.id }) 
          
  })
  }

   
  componentWillMount () {
    this.getLocations()
    this.getImages()
    let img
    let constructString


    function handleErrors(response) {
        if (response === undefined) {
          console.log('[Venue details ]response status Text',  response)
          this.setState({
          success:false
        })
            throw Error(response.statusText);
        }
        return response;
    }

    maps.getVenueDetails(this.props.venueId)
    .then(handleErrors)
    .then(data => {
    
    if(data !== undefined && data !== null) {
    const bestPhoto =  data.bestPhoto
    if(bestPhoto !== undefined && bestPhoto !== null) {
      img =`${bestPhoto.prefix}${bestPhoto.width}x${bestPhoto.height}${bestPhoto.suffix}`
    } else {
      img = process.env.PUBLIC_URL+'/no-photo-available.jpg'
    }
    
    let isOpen = ((data.hours !== undefined && data.hours.isopen))? 'Working Hours: '+ data.hours.isopen : 'Un available working hours'
    let address = ((data.Location !== undefined && data.location.address )? 'Location : '+ data.location.address : '')
    let phone = ((data.contact !== undefined && data.contact.phone) ? 'Phone: '+ data.contact.phone : '' )
    let likes =  ((data.likes !== undefined && data.likes.count) ? 'Likes :' + data.likes.count : '')
    let rating =  (data.rating !== undefined ? 'Rating :'+data.rating : '' )
    constructString =`${phone}   ${address} 
              ${likes}  
              ${rating} ${isOpen} Time Zone: ${data.timeZone}`

    }
    this.setState({
      success: true,
      venueDetails : data,
      imageSrc: img,
      detailsString: constructString
    })    
    }).catch(error => {
      console.log(`Error while Getting Venue Details FourSquareService May Be un reachable or unavailable `, error)
      alert('Error while Getting Venue Details FourSquareAPiService may be un reachable or unavailable') 
      this.setState({
        success:false
      })
    })
  }

    componentDidMount () {
    fetch(
         "https://api.flickr.com/services/rest/?"+
         "method=flickr.photos.search&api_key=cc486d5a638ecbda69e566971f130c71"+
         "&tags="+       
         "&lat=45.0411633&lon=23.2662036&radius=1&radius_units=&format=json&nojsoncallback=1&auth_token=72157698813831471-52ba3a104b4bb378&api_sig=0a5df792edb0c83e20a82c99b45502d5"
           )
 

        .then(function(response) {
          return response.json();
        })
        .then(
          function(j) {
            let picArray = j.photos.photo.map(pic => {
              var srcPath =
                "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg";
              return  <img key={pic.id} alt={pic.title} src={srcPath} />;
            });
            this.setState({ pictures: picArray });
            }.bind(this)
        );
  //  this.setState({ Content: this.state.venuesDetail.bestPhoto })
     
//  venuesDetailUpdate = (venuesId) => {
 //   maps.getVenueDetails(venuesId).then(() => {
   //         this.getDetails()
  //    })
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
   //   venuesId: this.state.selectedPlace.id,
      icon: logo,
     // venuesDetailUpdate: this.venuesDetailUpdate

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
     const {title, latlng, venueId} = this.props
  //  const {venuesId} = this.props;
 function WindowInf(props) {
       const Locationid = this.props.venues.map(venue => 
        <div key={venue.id}
        title={venue.title}>
       </div>
      );
  return (
    <div>
     
      </div>
      );
    }

 

     return (
      <div>

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
          content={this.state.selectedPlace.name}
          onClose={this.onInfoWindowClose} 
          onClick={this.onMarkerClick}
          
          updateContent={this.state.selectedPlace.name}
          venuesDetailUpdate={this.venuesDetailUpdate}
          content={this.state.selectedPlace.name}
          >
               {this.state.venues.map(info =>        
            <div key={info.id}> <h1> 
             {this.state.selectedPlace.id === info.id ? info.name : ''} </h1>
            <p>{this.state.selectedPlace.id === info.id ?info.location.address : ''} </p>
            <p>{this.state.selectedPlace.id === info.id ?info.location.crossStreet : ''} </p>
            

            <div className="picture-Style" tabIndex = {0} aria-label="Info window">
        <div className="window-title" tabIndex = {0}> {title }  </div>  
        { 
        (this.state.success) && (this.state.imageSrc !== undefined && this.state.imageSrc !== null) && (
          <ul id="images-list" tabIndex = {0}>          
              <ImageViewer  imageSrc = {this.state.imageSrc} 
               detailsData = {this.state.detailsString} >
              </ImageViewer>
            
          </ul>)
        }
        {(!this.state.success) && 
        ( <div className="load-failed">Failed to Load data from foursquare API to get Venue details</div>)}       
      </div>


             </div>  )}
           
  
      
        
   
              
           
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
