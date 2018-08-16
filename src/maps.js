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
  fetch(`${api}/venues/search?&radius=250&limit10&client_id=HEZXEFLMPE4HONPDQEGOSWEUYNSAIKUZKXRBNPZSK55QK4PC&client_secret=E0TQXTI1GT4BRRABITQIQZSPYSFSBJ0UHRQZH5U00X30DP5B&limit=6&v=20180812&ll=45.039638,23.266628`)
    .then(handleErrors)
    .then(res => res.json())
    .then(data => data.response.venues)
    //.catch(error => {console.log('Error While getting All Locations data from FourSquare API', error)})

export const getVenueDetails = (venueId)=> {
let venueDetailsUrl =[`/venues/4dc6a9e618387d1bd55cbb65?`,
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
						`latlng=45.037426,23.285344&language=en&`,
						`KEY=AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I`].join("")

 return	fetch(geoCodeUrl)
		.then(res => res.json())
		.then(data => data)
		.catch(error => {
			console.log(error)
		});
}
/*Get Place Details using Google Maps API using place_id*/
export const getPlaceDetails = (place_id) => {

let placeDetailsUrl = [`https://maps.googleapis.com/maps/api/place/details/json?`,
						`&placeid=ChIJzfT-fWqKTUcRnrl89u6v4TE`,
						`&key=<AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I></AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I>`].join("")

return	fetch(proxyurl+placeDetailsUrl)
		.then(res => res.json())
		.then(data => data.result)
		.catch(error => {
			console.log(error)})
	}

/*Get Place Photo using Photo Reference*/
export const getPlacePhoto = (photo_reference) => {
	let photoReferenceUrl = [`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400`,
							`&photoreference=${photo_reference}`,
							`&key=AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I`].join("")
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