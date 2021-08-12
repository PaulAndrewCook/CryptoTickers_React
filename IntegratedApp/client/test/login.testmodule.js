import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';

import { shallow } from 'enzyme';
import Login from '../src/components/Login';

Enzyme.configure({ adapter: new Adapter() });

function testLogin() {
	describe('Test Login component', () => {
		it('simulates click events', () => {
			const handleClickOpen = sinon.spy();
			const wrapper = shallow(<Login onClick={handleClickOpen} />);
			wrapper.find('link').simulate('click');
			expect(handleClickOpen).to.have.property('callCount', 1);
		});
	});
}

export { testLogin };

// describe('Click tests', () => {
// 	it('testing login click', () => {
// 		const clickMock = jest.fn();
// 		const wrapper = mount(<SuperTest onClick={clickMock} />);
// 		const btn = wrapper.find('#loginBtn');
// 		if (btn) btn.simulate('click');
// 		expect(clickMock.mock.calls.length).toBe(1);
// 	});
// });
