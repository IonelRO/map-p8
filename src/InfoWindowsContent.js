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

export const photocontent = ()=> {
let img = [`/venues/4e37c5286284fcf7399e92ce?`,
					  `client_id=ETBUYYTEGDY4WCF1IZXYZJVILWVA5NTLHGQ0WHA13OL2QGA2`,
					  `&client_secret=MJRDFQ43T0FSXPBBFA535VVJVKLUFATMY5IHP2DOFTOKZSYP&v=20180708`].join("")
return	fetch(`${img}`)
		.then(res => res.json())
		.then(data => data.response.img)
		.catch(error => {console.log(`Error while Getting Venue Details `, error)})
}