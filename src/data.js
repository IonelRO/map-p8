const api= 'https://api.foursquare.com/v2'
const proxyurl = "https://sheltered-headland-14246.herokuapp.com/"
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
export const getLocationsAll = () =>
  fetch(`${api}/venues/search?ll=27.9158175,34.3299505&intent=browse&radius=10000&query=resorts&client_id=ETBUYYTEGDY4WCF1IZXYZJVILWVA5NTLHGQ0WHA13OL2QGA2&client_secret=MJRDFQ43T0FSXPBBFA535VVJVKLUFATMY5IHP2DOFTOKZSYP&v=20180708`)
    .then(handleErrors)
    .then(res => res.json())
    .then(data => data.response.venues)
    //.catch(error => {console.log('Error While getting All Locations data from FourSquare API', error)})

export const getVenueDetails = (venueId)=> {
let venueDetailsUrl =[`/venues/${venueId}?`,
					  `client_id=ETBUYYTEGDY4WCF1IZXYZJVILWVA5NTLHGQ0WHA13OL2QGA2`,
					  `&client_secret=MJRDFQ43T0FSXPBBFA535VVJVKLUFATMY5IHP2DOFTOKZSYP&v=20180708`].join("")

return	fetch(`${api}${venueDetailsUrl}`)
		.then(res => res.json())
		.then(data => data.response.venue)
		//.catch(error => {console.log(`Error while Getting Venue Details `, error)})
}

/***********************Google Maps API*****************************************************/

/* Get Place Name using Google Maps API using Location Lat Lng*/
export const getPlaceIdByGeocoding = (latlng) => {
let geoCodeUrl =[`https://maps.googleapis.com/maps/api/geocode/json?`,
						`latlng=${latlng.lat},${latlng.lng}&language=en&`,
						`KEY=AIzaSyB7Ma3Ggl2TFUdsMaW8E4_F62uR65DPHZQ`].join("")

 return	fetch(geoCodeUrl)
		.then(res => res.json())
		.then(data => data)
		.catch(error => {
			console.log(error)
		});
}

/*Get Place Details using Google Maps API using place_id*/
export const getPlaceDetails = (place_id) => {

let placeDetailsUrl = [`https://maps.googleapis.com/maps/api/place/details/json?language=en`,
						`&placeid=${place_id}`,
						`&key=AIzaSyB7Ma3Ggl2TFUdsMaW8E4_F62uR65DPHZQ`].join("")

return	fetch(proxyurl + placeDetailsUrl)
		.then(res => res.json())
		.then(data => data.result)
		.catch(error => {
			console.log(error)})
	}

/*Get Place Photo using Photo Reference*/
export const getPlacePhoto = (photo_reference) => {
	let photoReferenceUrl = [`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400`,
							`&photoreference=${photo_reference}`,
							`&key=AIzaSyB7Ma3Ggl2TFUdsMaW8E4_F62uR65DPHZQ`].join("")
	return fetch(proxyurl+photoReferenceUrl)
			.then(res => res.blob())
			// .then(blobResponse => {
			// 	 blobResponse
			//  	//console.log(data)
			//  })
			.catch(error => {
				console.log('Error while getting Place Photo', error)
			})
}
  const myMarkers =
   [
   {id:'ChIJzfT-fWqKTUcRnrl89myMarkersu6v4TE', title: 'Endless column', name:'Endless column', position:{lat: 45.037426, lng: 23.285344}},
   {id:'ChIJCUZ-MmeKTUcRVvFxlambvOUtitle', title: 'The gate of the kiss', name:'The gate of the kiss', position: {lat: 45.039405, lng: 23.268641,}},
   {id:'ChIJY3IW52CKTUcRqIdjh9CM0CI', title: 'The Table of Silence', name:'The Table of Silence', position: {lat: 45.039638, lng: 23.266628}},
   {id:'ChIJkWy20WCKTUcRTgbOJzqzDuk', title: 'Chairs Street', name:'Chairs Street', position: {lat: 45.039585, lng: 23.267191}},
   {id:'ChIJG2hvBmiKTUcR4Zwsh_8J_oA', title: 'Gorj County Museum', name:'Gorj County Museum', position: {lat: 45.0392, lng: 23.276107}},
   {id:'ChIJ_SXJzGmKTUcRpRJO0vXWc2k', title: 'Saints Peter and Paul Church', name:'Saints Peter and Paul Church', position: {lat: 45.038293, lng: 23.27872}}
  ]
  
