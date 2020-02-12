import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Flat from './components/flat.js';
import Marker from './components/marker.js';
import GoogleMapReact from 'google-map-react';

// Best YouTube tutorial I have seen on React:
// https://www.youtube.com/watch?v=_ZTT9kw3PIE

class App extends React.Component {
	constructor(props){
		super();
		this.state = {
			flats: [],
			allFlats: [],
			selectedFlat: null,
			search: ""
		};
	}

	// Performing an API call to set the state of a component from the JSON response!
	componentDidMount(){
		const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
		fetch(url) // Ajax
			.then(response => response.json())
			.then((data) => {
				this.setState({
					flats: data,
					allFlats: data
				})
			})
	}

	selectFlat = (flat) => {
		console.log(flat);
		this.setState({
			selectedFlat: flat
		})
	}

	handleSearch = (event) => {
		// Code breakpoint at this line of code
		// debugger
		this.setState({
			search: event.target.value,
			flats: this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
		});
	}

	render(){	
		const zoom = 11;	
		let center = {
			lat: 48.8566,
			lng: 2.3522
		};

		if (this.state.selectedFlat) {
			center = {
				lat: this.state.selectedFlat.lat,
				lng: this.state.selectedFlat.lng
			}
		}
		
		return(
			<div className="app">
				<div className="main">
					<div className="search">
						<input 
							type="text" 
							placeholder="Search..." 
							value={this.state.search} 
							onChange={this.handleSearch} />
					</div>
					<div className="flats">
						{this.state.flats.map((flat) => {
							return <Flat 
								key={flat.name} 
								flat={flat} 
								selectFlat={this.selectFlat} />
						})}
					</div>
				</div>
				<div className="map">
				<GoogleMapReact
					bootstrapURLKeys={{ key: `${process.env.REACT_APP_API_KEY}`}}
					center={center}
					defaultZoom={zoom}
					// yesIWantToUseGoogleMapApiInternals
					// onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
				>
					{this.state.flats.map((flat) => {
						return <Marker 
							key={flat.name} 
							lat={flat.lat} 
							lng={flat.lng} 
							text={flat.price} 
							selected={flat === this.state.selectedFlat} />
					}
					
					)}
				</GoogleMapReact>
				</div>
			</div>
		);
	}
}
export default App;