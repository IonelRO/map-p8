import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as maps from './maps.js';

class InfoWindowContent extends Component {
	
	static propTypes = {
	}
	state={
  	venuesDetail: {},
  	Photos: []
	}

	getDetails() {
        maps.getVenueDetails('4e37bf9e18a8470916cd9103')
        .then((venuesDetail) => {
        this.setState({ venuesDetail: venuesDetail });
       	this.setState({ Photos: venuesDetail.bestPhoto });

        })
    }
	componentDidMount () {
    this.getDetails();
    
    }  

     render() {
    

     return (
      <div>
      <img id="img" tabIndex = {0} alt={this.state.venuesDetail.id} className="site-image" src={this.state.Photos.prefix+this.state.Photos.width+'x'+this.state.Photos.height+this.state.Photos.suffix} />
      <div tabIndex = {0}> {this.state.Photos.suffix}</div>
      </div>
   )}
}
export default InfoWindowContent