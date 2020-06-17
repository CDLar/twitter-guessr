import {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`

html{
    height: 100%;
    font-family: 'Open Sans', sans-serif;
}

* {
    padding: 0 ;
    margin: 0;
    box-sizing: border-box;
}

a {
    text-decoration: none;
   }
`

export default GlobalStyles