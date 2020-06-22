import React, { useState } from 'react';
import styled from 'styled-components'
import logo from './TwitterGuessr.png'
// import Footer from './Footer'

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
background-color:white;
z-index:1;
display: inline-flex;
height: 7rem;
width: 22rem;
border: 2px solid #00acee;
margin: 20px 20px 20px 20px;
color: black;
text-transform: uppercase;
text-decoration: none;
font-size: 1.5rem;
font-weight:600;
letter-spacing: 1.4px;
align-items: center;
justify-content: center;
overflow: hidden;

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

const StreamButton = styled(QuizButton)`
`

const Instructions = styled.div`
font-size:1.5rem;
margin-top:2em;
`
const Home = ({ newChoices, newChoicesDaily, setActiveQuiz }) => {
    const [message, setMessage] = useState('')

    return (
        <Wrapper>
            <Logo src={logo} alt='logo' />
            <ButtonBox>
                <QuizButton
                    onMouseOver={() => (setMessage('A quiz based on some of the most popular tweets in history, test your Twitter knowledge'))}
                    onMouseOut={() => (setMessage(''))}
                    onClick={() => {
                        newChoices();
                        setActiveQuiz('historic')
                    }}>
                    Quiz</QuizButton>
                <StreamButton
                    onMouseOver={() => (setMessage('A quiz based on recent tweets updated daily, the ultimate random experience'))}
                    onMouseOut={() => (setMessage(''))}
                    onClick={() => {
                        setActiveQuiz('daily');
                        newChoicesDaily()
                    }}>
                    Stream</StreamButton>
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