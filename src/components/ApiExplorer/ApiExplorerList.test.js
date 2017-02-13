import React from 'react';
import ReactDOM from 'react-dom';
import ApiExplorerList from './ApiExplorerList';
import { mount } from 'enzyme';

const testData = {
	"count":87,
	"next":"http://swapi.co/api/people/?page=2",
	"previous":null,
	"results":[
		{
			"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY",
			"gender":"male","homeworld":"http://swapi.co/api/planets/1/",
			"films":["http://swapi.co/api/films/6/","http://swapi.co/api/films/3/","http://swapi.co/api/films/2/","http://swapi.co/api/films/1/","http://swapi.co/api/films/7/"],
			"species":[
				"http://swapi.co/api/species/1/"

			],
			"vehicles":["http://swapi.co/api/vehicles/14/","http://swapi.co/api/vehicles/30/"],
			"starships":["http://swapi.co/api/starships/12/","http://swapi.co/api/starships/22/"],
			"created":"2014-12-09T13:50:51.644000Z",
			"edited":"2014-12-20T21:17:56.891000Z",
			"url":"http://swapi.co/api/people/1/",
			"marcelo": [
				{
					"sub": "teste1",
    				"sub2": "teste2"
				},
				{
					"sub": "testeeee1",
    				"sub2": "testeeee2"
				},
				{
					"sub": "testeeee333",
    				"sub2": "testeeee333",
    				"sub3": [
    					{
    						"subSub": "testeeee1",
		    				"subSub2": "testeeee2",
		    				"subsub3": [
		    					'asdhaushd',
		    					'asiudhaiushdaisuhd',
		    					'ASIdhiusahduihaS iduhaUISdh'
		    				]
    					}
    				]
				}
			]
		},
		{
			"name":"C-3PO",
			"height":"167",
			"mass":"75",
			"hair_color":"n/a",
			"skin_color":"gold",
			"eye_color":"yellow",
			"birth_year":"112BBY",
			"gender":"n/a",
			"homeworld":"http://swapi.co/api/planets/1/",
			"films":["http://swapi.co/api/films/5/","http://swapi.co/api/films/4/","http://swapi.co/api/films/6/","http://swapi.co/api/films/3/","http://swapi.co/api/films/2/","http://swapi.co/api/films/1/"],
			"species":["http://swapi.co/api/species/2/"],
			"vehicles":[],
			"starships":[],
			"created":"2014-12-10T15:10:51.357000Z",
			"edited":"2014-12-20T21:17:50.309000Z",
			"url":"http://swapi.co/api/people/2/"
		}
	]
};

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<ApiExplorerList data={testData.results} />, div);
});

it('has the correct structure', () => {
	const el = mount(<ApiExplorerList data={testData.results} />);
	const name = el.find('div.ApiExplorerList ul.ApiExplorerList__list li.ApiExplorerList__header span.ApiExplorerList__header-text').first().text();
	const subLevelsLenght = el.find('div.ApiExplorerList ul.ApiExplorerList__list li.ApiExplorerList__header').length;

	const expectedName = 'Luke Skywalker';
	const expectedLength = 6; //number of sub lists representing this data
	
	expect(name).toBe(expectedName);
	expect(subLevelsLenght).toBe(expectedLength);
});

test('comparison - greatest value', () => {
	const el = mount(<ApiExplorerList data={testData.results} />);
	const expectedValue = '172';
	
	el.find('li.ApiExplorerList__header').first().simulate('click');
	el.find('li.ApiExplorerList__header').last().simulate('click');

	const actualValue = el.state('comparisonCache').height;
	expect(expectedValue).toBe(actualValue);
});