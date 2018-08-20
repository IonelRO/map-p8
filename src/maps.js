const api= 'https://api.foursquare.com/v2'
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
  fetch(`${api}/venues/search?&radius=10000&limit10&client_id=HEZXEFLMPE4HONPDQEGOSWEUYNSAIKUZKXRBNPZSK55QK4PC&client_secret=E0TQXTI1GT4BRRABITQIQZSPYSFSBJ0UHRQZH5U00X30DP5B&limit=6&v=20180820&ll=45.0411633,23.2662036`)
    .then(handleErrors)
   .then(res => res.json())
    .then(data => data.response.venues)
   .catch(error => {console.log('Error While getting All Locations data from FourSquare API', error)})

export const getflickrImg = () =>
  fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=cc486d5a638ecbda69e566971f130c71&tags=&lat=45.0411633&lon=23.2662036&format=json&nojsoncallback=1&auth_token=72157698813831471-52ba3a104b4bb378&api_sig=99f32933549a1428785e990e613691be')
   .then(handleErrors)
   .then(res => res.json())
   .then(data => data.response.photo)
   .catch(error => {console.log('Error While getting All Locations data from flickr API', error)})

export const getVenueDetails = (venueId)=> {
let venueDetailsUrl =[`/venues/${venueId}?`,
					  `client_id=HEZXEFLMPE4HONPDQEGOSWEUYNSAIKUZKXRBNPZSK55QK4PC`,
					  `&client_secret=E0TQXTI1GT4BRRABITQIQZSPYSFSBJ0UHRQZH5U00X30DP5B&v=20180820`].join("")

return	fetch(`${api}${venueDetailsUrl}`)
		.then(res => res.json())
		.then(data => data.response.venue)
		.catch(error => {console.log(`Error while Getting Venue Details `, error)})
}



   

