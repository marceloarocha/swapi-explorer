import React, { Component } from 'react';
import ApiExplorerList from './ApiExplorerList';
import ApiExplorerPagination from './ApiExplorerPagination';
import ApiExplorerNavigator from './ApiExplorerNavigator';
import ApiExplorerSearch from './ApiExplorerSearch';
import _ from 'lodash';
import UrlHelper from './helpers/UrlHelper';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import Velocity from 'velocity-animate';
import { VelocityComponent } from 'velocity-react';
import './ApiExplorer.css';

class ApiExplorer extends Component {

	constructor(props) {
		super(props);
		this.baseAPI = props.url;
		this.state = {
			navigatorData: [],
			contentData: [],
			initContent: false,
			error: null,
			url: this.apiUrl()
		};
	}

	componentDidMount() {
		this.requestNavigatorData();

		if (this.state.url !== this.baseAPI) {
			this.requestData();
		}

		window.onpopstate = (event) => {
            this.goBack();
        };
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.url !== prevState.url) {
			this.requestData();
		}
	}

	requestNavigatorData() {
		fetch(this.baseAPI)
			.then(this.handleRequestError)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					navigatorData: data
				})
			})
			.catch((error) => {
				console.log('ApiExplorer: Invalid Url ' + this.props.url);
				console.log(error);
			});
	}

	addError(status) {
		let msg;

		switch (status) {
			case 404:
				msg = 'Content not found';
				break;
			case 500:
				msg = 'API error';
				break;
			default:
				msg = 'Unidentified error';
		}

		this.setState({
			error: msg,
			loading: false
		});
	}

	handleRequestError(response) {
		if (!response.ok) {
			return Promise.reject(response);
		}

		return response;
	}

	requestData() {
		this.setState({
			loading: true,
			initContent: true
		});

		fetch(this.state.url)
			.then(this.handleRequestError)
			.then((response) => {
				return response.json();
		  	})
		  	.then((obj) => {
		  		if (_.has(obj, 'results')) {
		  			this.setState({
		  				error: null,
		  				loading: false,
		  				contentData: obj.results,
		  				pagination: true,
		  				count: obj.count,
		  				next: obj.next,
		  				previous: obj.previous
		  			});
		  		} else {
			  		this.setState({
			  			error: null,
			  			loading: false,
			  			contentData: [obj],
			  			pagination: false
			  		});
		  		}
		  	})
		  	.catch((error) => {
		  		this.addError(error.status);
		  	})
		  	
	}

	navigate(url) {
		window.history.pushState(null, null, url.replace(this.props.proxy, ''));
		const internalUrl = '/api' + url.replace(this.props.proxy, '');

		this.setState({
			url: internalUrl
		});
		
		Velocity(this.refs.rootElm, 'scroll', {
            duration: 500,
            offset: -60,
            easing: 'ease-in-out'
        });
	}

	goBack() {
		this.setState({
			url: this.apiUrl(),
			search: UrlHelper.getURLParameter('search') || ''
		});
	}

	apiUrl(search = null) {
		const url = this.props.proxy.replace(/\/$/, '') + window.location.pathname;

		if (search) {
			console.log(url);
			return url + '?search=' + search;
		}

		return url + window.location.search;
	}

	// events area
	// with arrow functions there's no need to bind this function with the current object
	// useful for callbacks
	handleSearch = (search) => {
		this.navigate(this.apiUrl(search));
	}

	handleNavigateClick = (e) => {
		this.navigate(e.target.href);
		
		e.preventDefault();
		e.stopPropagation();
	}

	render() {
		const contentAnimation = 'transition.slideDownBig' + (this.state.loading ? "Out" : "In");
		
	    return (
	    	<div className="ApiExplorer">
	    		<ApiExplorerNavigator data={this.state.navigatorData} action={this.handleNavigateClick} activeUrl={this.state.url} loader={this.props.menuLoader} />
	    		{this.state.loading &&
      				<div className="ApiExplorer__loader">{this.props.loader}</div>
      			}
	    		{this.state.initContent ? (
	    			<div className="ApiExplorer__content" ref="rootElm">
	    				{this.state.error != null ? (
	    					<div className="ApiExplorer__error">An error has occurred<br/><small>{this.state.error}</small></div>
	    				) : (
	    					<div>
					    		<div className="ApiExplorer__actions-wrapper">
					    			{this.state.pagination &&
						      			<div className="ApiExplorer__list-control">
						      				<ApiExplorerPagination total={this.state.count} next={this.state.next} previous={this.state.previous}
						      					action={this.handleNavigateClick} page={UrlHelper.getURLParameter('page') || 1} />
						      				<ApiExplorerSearch search={UrlHelper.getURLParameter('search') || ''} submit={this.handleSearch} />
							      		</div>
						      		}
					      		</div>

				      			<VelocityComponent animation={contentAnimation} duration={500} >
					          		<ApiExplorerList data={this.state.contentData} action={this.handleNavigateClick} loading={this.state.loading} />	
					          	</VelocityComponent>

				      			{this.state.pagination && this.state.count > 1 && !this.state.loading &&
				      				<VelocityComponent animation={contentAnimation} duration={500} runOnMount={true}>
						      			<div className="ApiExplorer__list-control">
						      				<ApiExplorerPagination total={this.state.count} next={this.state.next} previous={this.state.previous}
						      					action={this.handleNavigateClick} page={UrlHelper.getURLParameter('page') || 1} />
							      		</div>
							      	</VelocityComponent>
					      		}
					      	</div>
			      		)}
		      		</div>
	      		) : (
	      			<div className="ApiExplorer__welcome">
	      				{this.props.welcomeMsg}
	      			</div>
	      		)}
	      	</div>
	    );
	}
}

ApiExplorer.defaultProps = {
	loader: 'Loading...',
	menuLoader: 'Loading menu...',
	'welcomeMsg': 'Welcome to API Explorer'
};

export default ApiExplorer;