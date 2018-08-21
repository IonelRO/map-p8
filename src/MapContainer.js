import React, { Component } from 'react';
import logo from './media/camera.svg';
import PropTypes from 'prop-types';
import defaultIcon from './media/map-marker.svg';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as maps from './maps.js';
import ImageViewer from './ImageViewer.js'
import FindPage from './Filter.js'
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
      infoLoaded: true,
      query: "",
      findPlaces: []
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

    maps.getVenueDetails("4db56c2bfa8c350240f8fe5a")
    .then(handleErrors)
    .then(data => {
    
    if(data !== undefined && data !== null) {
    const bestPhoto =  data.bestPhoto
    if(bestPhoto !== undefined && bestPhoto !== null) {
      img =`${bestPhoto.prefix}${bestPhoto.width}x${bestPhoto.height}${bestPhoto.suffix}`
    } else {
      img = process.env.PUBLIC_URL+'/no-photo-available.jpg'
    }
    
    let address = ((data.Location !== undefined && data.location.address )? 'Location : '+ data.location.address : '')
    let phone = ((data.contact !== undefined && data.contact.phone) ? 'Phone: '+ data.contact.phone : '' )
    let likes =  ((data.likes !== undefined && data.likes.count) ? 'Likes :' + data.likes.count : '')
    let rating =  (data.rating !== undefined ? 'Rating :'+data.rating : '' )
    constructString =`${phone}   ${address} 
              ${likes}  
              ${rating}`

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

  //  componentDidMount () {
  //  fetch(
   //      "https://api.flickr.com/services/rest/?"+
   //      "method=flickr.photos.search&api_key=57f57e014d43c73972e4880901e92e34"+
   //      "&tags="+       
    //     "&lat=45.0411633&lon=23.2662036&radius=1&format=json&nojsoncallback=1&auth_token=72157700452507615-df26ea9789e97b9e&api_sig=2d28fadcf01d41f10278bcc323808742"
    //       )
   //       .then(res => res.json())
   

  //      .then(
   //       function(j) {
   //         let picArray = j.photos.photo.map(pic => {
   //           var srcPath =
  //              "https://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg";
   //           return  <img key={pic.id} alt={pic.title} src={srcPath} />;
   //         });
   //         this.setState({ pictures: picArray });
   //         }.bind(this)
   //     );
  //  this.setState({ Content: this.state.venuesDetail.bestPhoto })
     
//  venuesDetailUpdate = (venuesId) => {
 //   maps.getVenueDetails(venuesId).then(() => {
   //         this.getDetails()
  //    })
 // }
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
updateQuery = (query) => {
    this.setState({ query: query })
    this.updatefindLocations(query)
  }

updatefindLocations = (query) => {
        //query interogation, look for books that match
        if (query) {
            //using BooksAPI display matching books
            maps.getLocationsAll(query).then((findPlaces) => {
                //check if search query doesn't exist or generate error, then no results, empty array               
                //Reference: https://dev.to/sarah_chima/error-boundaries-in-react-3eib
                if (findPlaces.error) {
                    this.setState({ findPlaces: [] })
                } else {
                //in books math with query then it are displayed
                    this.setState({ findPlaces: findPlaces })
                }
            })
            //no query shows us no results, empty array
        } else {
            this.setState({ findPlaces: [] })
        }
    }
  
  render() {
     const {title, venueId} = this.props
      
      this.state.findPlaces.map((findPlaces) => {
            
            this.state.findPlaces.map((venue) => {
                findPlaces.id === venue.id ? findPlaces.name=venue.name : ""}
            )})
 
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
          <input type="text" 
          placeholder="Search by title or author"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
          />
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
                              
                               id={myMarker.id}
                               onClick={this.onMarkerClick}
                               icon={this.state.selectedPlace.id === myMarker.id ? this.state.icon : defaultIcon }
                              position={myMarker.location}
                               title={myMarker.title}
                              name={myMarker.name} 
                               animation={this.state.activeMarker ? (myMarker.id === this.state.selectedPlace.id ? '1' : '0') : '0'}
                              > 
                          </Marker>
                            
        
         )} 
      
      <InfoWindow 
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}         
          onClose={this.onInfoWindowClose}            
           >
               
            {this.state.venues.map(info =>            
            <div key={info.id}> <h1> 
            
             {this.state.selectedPlace.id === info.id ? info.name : ''} </h1>
            <p>{this.state.selectedPlace.id === info.id ?info.location.address : ''} </p>
            <p>{this.state.selectedPlace.id === info.id ?info.location.crossStreet : ''} </p>
         

             </div>  )}
          
     </InfoWindow>       

      </Map>
      document.getElementById('root')
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
