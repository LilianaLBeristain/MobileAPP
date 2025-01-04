import React from 'react';
import Navigation from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { defaultTheme } from './styles/theme.style';

function App() {
  return (
    <SafeAreaProvider>
      <Navigation theme={defaultTheme}/>
    </SafeAreaProvider>
  );
}

export default App;
