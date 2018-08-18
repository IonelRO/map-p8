import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as maps from './maps.js';

class InfoWindowContent extends Component {
	
	state={
  	venuesDetail: {},
  	Photos: {}
	}

	getDetails() {
        maps.getVenueDetails("4e37c5286284fcf7399e92ce")
        .then((venuesDetail) => {
        this.setState({ venuesDetail: venuesDetail });
       	this.setState({ Photos: venuesDetail.bestPhoto });

        })
    }
	componentDidMount () {
    this.getDetails();
    
    }  

  //  getcontent = (venuesDetail) => {
  //  maps.update(venuesDetail).then(() => {
 //           this.getDetails()
 //     })
//  }
     render() {
    	const {venueId} = this.props

     return (
      <div>
      <img id="img" tabIndex = {0} alt={this.state.venuesDetail.id} className="site-image" src={this.state.Photos.prefix+'230x230'+this.state.Photos.suffix} />
      <div tabIndex = {0}> {this.state.Photos.suffix}</div>
      </div>
   )}
}
export default InfoWindowContent