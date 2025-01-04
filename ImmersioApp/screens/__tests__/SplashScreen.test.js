import React from 'react';
import renderer from 'react-test-renderer';
import SplashScreen from '../SplashScreen';

it('renders correctly', () => {
  const tree = renderer.create(<SplashScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
