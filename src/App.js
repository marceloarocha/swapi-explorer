import React, { Component } from 'react';
import ApiExplorer from './components/ApiExplorer/ApiExplorer'
import './App.css';

class App extends Component {

	render() {
		const loader = <span>
			Loading SWAPI from a galaxy far, far away
			<span className="loader__dot">.</span>
			<span className="loader__dot">.</span>
			<span className="loader__dot">.</span>
		</span>;

		return (
        	<div className="App">
	          	<div className="App__list">
	            	<ApiExplorer url="/api/" proxy="http://swapi.co/api" loader={loader} />
	          	</div>
        	</div>
    	);
  	}
}

export default App;
