import React, { VFC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './Home';

export const Routes: VFC = () => {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};
