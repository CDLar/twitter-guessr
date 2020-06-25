import React, { useState } from 'react';
import styled from 'styled-components'
import logo from '../TwitterGuessr.png'
import './Home.css'

//SC Styles
const Wrapper = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:1em;
`
const Logo = styled.img`
width:40em;
margin-top:3em;

@media (max-width: 700px) {
 width:30em;
 margin-top:1em;
  }

  @media (max-width: 500px) {
 width:22em;
 margin-top:1em;
  }
`

const ButtonBox = styled.div`
display:flex;
margin-top:3em;

@media (max-width: 700px) {
 flex-direction:column;
 margin-top:1em;
  }
`
const QuizButton = styled.button`
position:relative;
background-color:${props => props.theme.secondary};
color:${props => props.theme.color};
z-index:1;
display: inline-flex;
height: 7rem;
width: 22rem;
border: 2px solid #00acee;
margin: 20px 20px 20px 20px;
text-transform: uppercase;
text-decoration: none;
font-size: 1.5rem;
font-weight:600;
letter-spacing: 1.4px;
align-items: center;
justify-content: center;
overflow: hidden;
transition:0.5s;

@media (max-width: 700px) {
    font-size:1.3rem;
    height: 5rem;
    width:15rem;
}

@media (max-width: 500px) {
    font-size:1.1rem;
    height: 5rem;
    width:15rem;
}

transition: color 300ms ease-in-out;
&::before {
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color:#0af;
    border: solid 2px white;
    z-index:-1;

    transition:transform 300ms ease-in-out;
    transform: scaleX(0);
    transform-origin: left;
}

&:hover::before,
&:focus::before {
    transform: scaleX(1)
}

&:hover,
&:focus {
    cursor:pointer;
    color:white;
}
`

const Instructions = styled.div`
color:${props => props.theme.color};
font-size:1.5rem;
margin-top:2em;
text-align:center;
@media (max-width: 700px) {
font-size:1.3rem;
margin-top:1em;
}
@media (max-width: 500px) {
font-size:1.1rem;
margin-top:1em;
}
`

const DarkToggle = styled.label`
position:absolute;
right:0%;
top:0%;
margin:1em;
`

const Home = ({ newChoices, newChoicesDaily, setActiveQuiz, toggleTheme, themePointer }) => {
    const [message, setMessage] = useState('')

    return (
        <Wrapper>
            <DarkToggle>
                <input defaultChecked={themePointer === 'dark'} onClick={toggleTheme} type='checkbox'></input>
                <span className='check'></span>
            </DarkToggle>
            <Logo src={logo} alt='logo' />
            <ButtonBox>
                <QuizButton
                    onMouseOver={() => (setMessage('A quiz based on some of the most popular tweets in history, test your Twitter knowledge'))}
                    onMouseOut={() => (setMessage(''))}
                    onClick={() => {
                        newChoices();
                        setActiveQuiz('historic')
                    }}>
                    Popular</QuizButton>
                <QuizButton
                    onMouseOver={() => (setMessage('A quiz based on recent tweets updated daily, the ultimate random experience'))}
                    onMouseOut={() => (setMessage(''))}
                    onClick={() => {
                        setActiveQuiz('daily');
                        newChoicesDaily()
                    }}>
                    Daily</QuizButton>
            </ButtonBox>
            <Instructions>
                <p>Hover a button for more information</p>
            </Instructions>
            <Instructions>
                <p>{message}</p>
            </Instructions>
        </Wrapper >
    );
}
export default Home;