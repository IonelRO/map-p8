const api= 'https://api.foursquare.com/v2'
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)


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

export const getSelectedAll = (query) =>
  fetch(`${api}/venues/search?&radius=10000&query=${query}&limit10&client_id=HEZXEFLMPE4HONPDQEGOSWEUYNSAIKUZKXRBNPZSK55QK4PC&client_secret=E0TQXTI1GT4BRRABITQIQZSPYSFSBJ0UHRQZH5U00X30DP5B&limit=6&v=20180820&ll=45.0411633,23.2662036`)
    .then(handleErrors)
   .then(res => res.json())
    .then(data => data.response.venues)
   .catch(error => {console.log('Error While getting All Locations data from FourSquare API', error)})






   

