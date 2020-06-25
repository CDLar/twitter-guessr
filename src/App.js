import React, { useState, useEffect } from 'react';
import Game from './components/Game'
import { ThemeProvider } from 'styled-components'
import { theme } from './themes/theme-context'

function App() {
  let savedTheme = localStorage.getItem('darkTheme');
  const [themePointer, setThemePointer] = useState(savedTheme||'light');

  const toggleTheme = () => {
    setThemePointer(themePointer => themePointer === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    localStorage.setItem('darkTheme', themePointer)
  },[themePointer])

  return (
    <div className="App">
    {console.log(savedTheme)}
      <ThemeProvider theme={theme[themePointer]}>
        <Game toggleTheme={toggleTheme} themePointer={themePointer} />
      </ThemeProvider>
    </div>
  );
}
export default App;

