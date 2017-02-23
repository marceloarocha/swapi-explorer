import React from 'react';
import { shallow } from 'enzyme';
import ApiExplorer from './ApiExplorer';

it('renders without crashing', () => {
	shallow(<ApiExplorer url="/api/" proxy="http://example.com"/>);
});
