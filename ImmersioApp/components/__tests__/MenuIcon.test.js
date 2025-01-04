import React from 'react';
import renderer from 'react-test-renderer';
import MenuIcon from '../MenuIcon';

jest.mock('@react-navigation/native', () => {
  const actualnav = jest.requireActual('@react-navigation/native');
  return {
    ...actualnav,
    useNavigation: () => {
      navigation: () => jest.fn()
    },
  }
});

// Mocks vector-icon Feather to prevent warnings
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Feather: View
  };
});

it('renders correctly', () => {
  const tree = renderer.create(<MenuIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});
