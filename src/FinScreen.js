import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Confetti from 'react-dom-confetti';

//SC Styles
const Fin = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height: 100%;
min-height:100vh;
overflow:hidden;
& > * {
    margin:1em;
}
`

const StyledButton = styled.button`
  border-radius: 4px;
  background-color:#00acee;
  border: none;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;

& span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color:white;
  font-size:1rem;
}

& span:after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

&:hover span {
  padding-right: 25px;
}

&:hover span:after {
  opacity: 1;
  right: 0;
}
`


const FinScreen = ({ resetActive, showFin }) => {
    const [active, setActive] = useState(false)
    const config = {
        angle: "90",
        spread: "100",
        startVelocity: "60",
        elementCount: "72",
        dragFriction: 0.1,
        duration: "5000",
        stagger: "0",
        width: "11px",
        height: "11px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };

    useEffect(() => {
        setActive(true)
    }, [])

    return (
        <Fin>
            <h1>Finished!</h1>
            <h2>Your score: 12/15</h2>
            <StyledButton onClick={() => window.location.reload(false)} ><span>Back to home</span></StyledButton>
            <Confetti active={active} config={config} />
        </Fin>
    );
}

export default FinScreen;


