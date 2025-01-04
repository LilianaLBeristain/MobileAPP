import React from 'react';
import renderer from 'react-test-renderer';
import { AuthContext } from '../../components/contexts/AuthContext';
import SignInScreen from '../SignInScreen';

it('renders correctly', () => {
  const mockAuthContext = jest.fn();
  const tree = renderer.create(
    <AuthContext.Provider value={mockAuthContext}>
      <SignInScreen />
    </AuthContext.Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
