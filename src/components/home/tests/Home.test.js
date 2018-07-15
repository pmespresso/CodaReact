import React from 'react';
import Home from '../Home';
console.log(Home);
import { shallow, render, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import sinon from 'sinon';

describe('<Home />', () => {
  it('should load without crashing', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper).toBeDefined();
  });

  it('component did mount', () => {
    sinon.spy(Home.prototype, 'componentDidMount');
    Home.prototype.componentDidMount = jest.fn();
    const wrapper = mount(<Home />);
    expect(Home.prototype.componentDidMount).toHaveBeenCalled();
  });

  it ('should load the carousel with images', () => {
    const wrapper = shallow(<Home />);
    const carousel = wrapper.find('.carousel');

    expect(carousel).toBeDefined();

    expect(carousel.find('.carousel-img')).toBeDefined();
  });

  it ('should load featured artist crowdsales list', () => {
    const wrapper = shallow(<Home />);
    const section = wrapper.find('#discover-artists');
    const crowdsales = section.find('.cards-list');

    expect(section).toBeDefined();
    expect(crowdsales).toBeDefined();
  });

  it ('should load production helpers list', () => {
    const wrapper = shallow(<Home />);
    const section = wrapper.find('#production-help');
    const production_helpers = section.find('.cards-list');

    expect(section).toBeDefined();
    expect(production_helpers).toBeDefined();
  });

  it('should receive featured artist offerings as props', () => {
    const wrapper = mount(<Home />);
    expect(wrapper.props().artistsWithOfferings).toBeDefined();
    expect(wrapper.props().artistsWithOfferings).toBeGreaterThan(5);
  });
});
