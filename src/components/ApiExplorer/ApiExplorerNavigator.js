import React, { Component } from 'react';
import _ from 'lodash';
import { VelocityTransitionGroup } from 'velocity-react';
import './ApiExplorerNavigator.css'

class ApiExplorerNavigator extends Component {

	navList() {
		let items = [];

		_.forEach(this.props.data, (value, key) => {
			let isActive = this.isActive(value) ? 'ApiExplorerNavigator__link--active' : '';
			let classNames = `ApiExplorerNavigator__link ${isActive}`;

			items.push(
				<li key={'nav' + key} className="ApiExplorerNavigator__item">
					<a href={value} onClick={this.props.action} className={classNames}>
						{_.capitalize(key)}
					</a>
				</li>
			);
		});

		return items;
	}

	isActive(url) {
		if (this.props.activeUrl.indexOf(url) !== -1) {
			return true;
		}
	}

	render() {
		const duration = 300;
		const enterAnimation = {
			animation: 'transition.expandIn',
			stagger: duration,
			duration: duration,
			display: 'inline-block',
			style: {
				display: 'none'
			}
		};
		const leaveAnimation = {
			animation: 'transition.expandOut',
			stagger: duration,
			duration: duration
		};

		return (
			<nav className="ApiExplorerNavigator">
				{this.props.data.length === 0 ? (
					<div className="ApiExplorerNavigator__loader">{this.props.loader}</div>
				) : (
				
					<ul className="ApiExplorerNavigator__list">
						<VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} runOnMount={true} >
							{this.navList()}
						</VelocityTransitionGroup>
					</ul>
					
				)}
			</nav>
		)
	}
}

export default ApiExplorerNavigator;