import React, { useState } from 'react';
import Game from './components/Game'
import { ThemeProvider } from 'styled-components'
import { theme } from './themes/theme-context'
function App() {
  const [themePointer, setThemePointer] = useState('light');
  const toggleTheme = () => {
    setThemePointer(themePointer => themePointer === 'dark' ? 'light' : 'dark')
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme[themePointer]}>
        <Game toggleTheme={toggleTheme} themePointer={themePointer} />
      </ThemeProvider>
    </div>
  );
}
export default App;
