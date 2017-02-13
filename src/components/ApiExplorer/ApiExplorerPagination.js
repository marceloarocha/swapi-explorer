import React, {Component} from 'react';
import './ApiExplorerPagination.css';

class ApiExplorerPagination extends Component {

	disabledLink = (e) => {
		e.preventDefault();
	}

	button(text, link) {
		if (link == null) {
			return (
				<a href="#" onClick={this.disabledLink} className="ApiExplorer__button ApiExplorer__button--default ApiExplorer__button--pagination ApiExplorer__button--disabled">
					{text}
				</a>
			);
		}

		return (
			<a href={link} onClick={this.props.action} className="ApiExplorer__button ApiExplorer__button--default ApiExplorer__button--pagination">{text}</a>
		);
	}

	render() {
		return (
			<div className="ApiExplorerPagination">
				<span className="ApiExplorerPagination__info">Total records: {this.props.total} <br/> Page: {this.props.page}</span>
				{this.button('Previous', this.props.previous)}
				{this.button('Next', this.props.next)}
				
			</div>
		);
	}
}

export default ApiExplorerPagination;