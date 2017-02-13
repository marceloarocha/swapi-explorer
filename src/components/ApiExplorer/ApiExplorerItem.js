import React, { Component } from 'react';
import _ from 'lodash';
import UrlHelper from './helpers/UrlHelper'
import './ApiExplorerItem.css'

class ApiExplorerItem extends Component {

	internalList(data, key) {
		let items = [];

		_.forEach(data, (value, key) => {
			items.push(
				<ApiExplorerItem key={value} id={key} value={value} navigate={this.props.navigate} hasLabel={false}/>
			)
		});

		return (
			<li key={key} className="ApiExplorerItem">
				<strong>{key}: </strong>
				{items.length > 0 ? (
					<ul className="ApiExplorerList__list">{items}</ul>
				) : (
					<span>Empty</span>
				)}
			</li>
		);
	}

	render() {
		let isTopValue = '';
		if (this.props.isComparing) {
			isTopValue = this.props.isTopValue ? 'ApiExplorerItem--top-value' : 'ApiExplorerItem--not-top-value';
		}
		let classNames = `ApiExplorerItem ${isTopValue}`;

		if (_.isArray(this.props.value)) {
			return this.internalList(this.props.value, this.props.id)
		}

		return (
			<li className={classNames}>
				{this.props.hasLabel &&
					<strong>{this.props.id}: </strong> 
				}
				{UrlHelper.isUrl(this.props.value) ? (
					<a href={this.props.value} onClick={this.props.navigate}>{this.props.value}</a>
				) : (
					<span>{this.props.value}</span>
				)}
			</li>
		);
	}
}

ApiExplorerItem.defaultProps = {
	hasLabel: true,
	isTopValue: false,
	isComparing: false
};

export default ApiExplorerItem;