import React, {Component} from 'react';
import './ApiExplorerSearch.css';

class ApiExplorerSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			search: this.props.search
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.search !== prevProps.search) {
			this.setState({
				search: this.props.search
			});
		}
	}

	handleChange = (e) => {
		this.setState({
			search: e.target.value
		});
	}

	handleSubmit = (e) => {
		this.props.submit(this.state.search);

		e.preventDefault();
	}

	render() {
		return (
			<div className="ApiExplorerSearch">
  				<form onSubmit={this.handleSubmit}>
      				<input type="text" value={this.state.search} onChange={this.handleChange} className="ApiExplorerSearch__input"/>
      				<button type="submit" className="ApiExplorer__button ApiExplorer__button--default">Search</button>
      			</form>
  			</div>
		);
	}
}

export default ApiExplorerSearch;