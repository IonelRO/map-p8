import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const Filter = ({ states, filterPlaces, onMarkerClick }) => {
  const { places,selectedPlace } = states;

  return (
    <aside className="filter">
      <h2 className="filter-title" tabIndex="0">
        Filter Results
      </h2>

      <div className="input-wrapper">
          <input
            type="text"
            placeholder="Find places on map"
            aria-label="Find places on map"
            onChange={e => filterPlaces(e.target.value)}
          />
      </div>
      <div className="filtered-places">
        <ul className="filtered-list" tabIndex="0">
          {
            selectedPlace.map(place =>
              <li
                key={place.id}
                className="result-item"
                tabIndex="0"
                onClick={() => onMarkerClick(place.id, 'view')}
              >
                {place.name}
              </li>
            )
          }
        </ul>
      </div>
    </aside>
  )
};

export default Filter;