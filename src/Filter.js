import React, { Component } from 'react'
import * as maps from './maps';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class FindPage extends Component {

 state = {
    query: "",
    findPlaces: []
  }
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

render (){
this.state.findPlaces.map((findPlaces) => {
            findPlaces.name = "none"
            this.state.findPlaces.map((venue) => {
                findPlaces.name === venue.name ? findPlaces.id=venue.id : ""}
            )})

  
  return(
    <div className="search-books">
      <div className="search-books-bar">
       
        
        <div className="search-books-input-wrapper">
          <input type="text" 
          placeholder="Search by title or author"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
          />

        </div>
      </div>
      <div className="search-books-results">
          <ol className="books-grid">
              {this.state.findPlaces.map((findPlaces) =>
                  <li key={findPlaces.id}>
                      <Marker key={findPlaces.id}
                              
                               id={findPlaces.id}
                               onClick={this.onMarkerClick}
                             //  icon={this.state.selectedPlace.id === findPlaces.id ? this.state.icon : defaultIcon }
                               position={findPlaces.location}
                               title={findPlaces.title}
                               name={findPlaces.name} 
                               animation={this.state.activeMarker ? (findPlaces.id === this.state.selectedPlace.id ? '1' : '0') : '0'}
                               > 
                            </Marker>
                  </li>
              )}
          </ol>
        </div>
    </div>
  );}}

export default FindPage;