import React from 'react';
import { shallow } from 'enzyme';
import ApiExplorer from './ApiExplorer';

it('renders without crashing', () => {
	shallow(<ApiExplorer url="http://www.example.com"/>);
});
