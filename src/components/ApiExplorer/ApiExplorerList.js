import React, { Component } from 'react';
import ApiExplorerItem from './ApiExplorerItem';
import _ from 'lodash';
import { VelocityComponent } from 'velocity-react';
import './ApiExplorerList.css';

class ApiExplorerList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			itemsToCompare: new Map(),
			comparisonCache: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(nextProps.data, this.props.data)) {
			// comparison is only permitted on the same list
			this.setState({
				itemsToCompare: new Map(),
				comparisonCache: {}
			});
		}
	}

	createList(data, iteratee) {
		let items = [];

		_.forEach(data, (value, key) => {
			items.push(iteratee(value, key));
	    });

	    return items;
	}

	topLevelList(data, enclosingTag = false) {
		return this.createList(data, (value, key) => {
			if (enclosingTag) {
				return (
					<ul key={key} className="ApiExplorerList__list">
						{this.subList(value[_.keys(value)[0]], value, key)}
					</ul>
				)
			}

			return this.subList(value[_.keys(value)[0]], value, key);
		});
	}

	subList(header, value, key) {
		const contentAnimation = 'transition.flipX' + (this.props.loading ? "Out" : "In");
		const isComparing = this.state.itemsToCompare.has(key);
		const isActive = isComparing ? 'ApiExplorerList__header--active' : '';
		const classNames = `ApiExplorerList__header ${isActive}`;
		
		return (
			<VelocityComponent animation={contentAnimation} duration={500} runOnMount={true}>
				<li key={key} className={classNames} onClick={this.toggleSelection(key)}>
					<span className="ApiExplorerList__header-text">{header}</span>
					<ApiExplorerList data={value} headerKey={key} action={this.props.action} firstLevel={false} 
						compareData={isComparing ? this.state.comparisonCache : {}} />
				</li>
			</VelocityComponent>
		)
	}

	listType(data) {
		if (_.isArray(data) && _.isObject(data[0])) {
			return "TOP_LEVEL";
		}

		return "VALUE";
	}

	toggleSelection = (key) => (e) => {
		let itemsToCompare = this.state.itemsToCompare;

		if (this.state.itemsToCompare.has(key)) {
			itemsToCompare.delete(key);
		} else {
			itemsToCompare.set(key, this.props.data[key]);
		}

		this.comparisonCache(itemsToCompare);
	}

	comparisonCache(itemsToCompare) {
		let cache = _.assign({}, itemsToCompare.values().next().value);

		itemsToCompare.forEach((compareItem) => {
			_.forEach(compareItem, (value, key) => {
				if (this.compare(value, cache[key]) > 0) {
					cache[key] = _.toNumber(value);
				}
			});
		});

		this.setState({
			comparisonCache: cache,
			itemsToCompare: itemsToCompare
		});
	}

	isComparable(value) {
		return !isNaN(value) && !_.isEmpty(value);
	}

	compare(vl1, vl2) {
		if (!this.isComparable(vl1)) {
			return false;
		}

		vl1 = _.toNumber(vl1);
		vl2 = _.toNumber(vl2);

		if (vl1 > vl2) {
			return 1;
		} else if (vl1 === vl2) {
			return 0;
		}
		
		return -1;
	}

	render() {
		let items = [];

		switch (this.listType(this.props.data)) {
			case "TOP_LEVEL":
				const hasEnclosingTag = false;
				items.push(this.topLevelList(this.props.data, hasEnclosingTag));
			    break;
			default:
				_.forEach(this.props.data, (value, key) => {
					switch (this.listType(value)) {
						case "TOP_LEVEL":
							const hasEnclosingTag = true;
							items.push(this.topLevelList(value, hasEnclosingTag));
						    break;
						default:
							let isTopValue = false;
							let isComparing = false;

							if (!_.isEmpty(this.props.compareData) > 0 && this.isComparable(value)) {
								isComparing = true;
								isTopValue = this.compare(value, this.props.compareData[key]) >= 0;
							}

							items.push(
								<ApiExplorerItem key={'' + key + this.props.headerKey} id={key} value={value}
									navigate={this.props.action} isTopValue={isTopValue} isComparing={isComparing}/>
							);
							break;
					}
				});
		}

		if (this.props.firstLevel === true) {
			return (
				<div className="ApiExplorerList">
					{items.length === 0 ? (
						<div className="ApiExplorerList__empty">No records found</div>
					) : (
						<ul className="ApiExplorerList__list">
							{items}
						</ul>
					)}
				</div>
			);
		}
		
		return (
			<ul className="ApiExplorerList__list">
				{items}
			</ul>
		);
	}
}

ApiExplorerList.defaultProps = {
	firstLevel: true
};

export default ApiExplorerList;