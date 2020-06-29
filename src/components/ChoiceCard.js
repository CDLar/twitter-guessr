import React from 'react';
import styled from 'styled-components'

const Card = styled.div`
flex:1;
background-color:${props => props.theme.secondary};
color:${props => props.theme.color};
display:flex;
cursor: pointer;
box-shadow: ${props => props.theme.boxShadow};
border-radius:4px;
min-width:18em;
height:80px;
padding:1em;
margin:1em;
max-width:22em;
@media (max-width: 700px) {
    margin:0.2em;
    min-width:31.25em;
  }
  @media (max-width: 550px) {
    margin:0.2;
    min-width:21em;
}
-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`

const HoverCard = styled(Card)`
&:hover {
    background-color: ${props => props.theme.wrong};

}
`

const ChoiceBody = styled.div`
margin-left:4.2em;
position:absolute;
`
const Name = styled.h3`
font-size:1.2rem;
`
const AvatarImg = styled.img`
border-radius:50%;
max-height:48px;
max-width:48px;
`

const Handle = styled.p`
color:${props => props.theme.subColor};
font-weight:400;
font-size:1rem;
`

const CorrectAnswer = styled(Card)`
background-color: #00acee;
`

const WrongAnswer = styled(Card)`
background-color: ${props => props.theme.wrong};
`

const ChoiceCard = ({ clicker, val, userChoice, ans }) => {
    return (
        <>
            {!userChoice
                ?
                (
                    <HoverCard onClick={clicker}>
                        < AvatarImg src={val[3]} alt={'avatar'} />
                        <ChoiceBody>
                            <Name>{val[2]}</Name>
                            <Handle>{`@${val[1]} `}</Handle>
                        </ChoiceBody>
                    </HoverCard >
                )
                :
                val[0] === ans
                    ?
                    (
                        <CorrectAnswer>
                            < AvatarImg src={val[3]} alt={'avatar'} />
                            <ChoiceBody>
                                <Name>{val[2]}</Name>
                                <Handle>{`@${val[1]} `}</Handle>
                            </ChoiceBody>
                        </CorrectAnswer >
                    )
                    :
                    (
                        <WrongAnswer>
                            < AvatarImg src={val[3]} alt={'avatar'} />
                            <ChoiceBody>
                                <Name>{val[2]}</Name>
                                <Handle>{`@${val[1]} `}</Handle>
                            </ChoiceBody>
                        </WrongAnswer >
                    )}
        </>
    )
}
export default ChoiceCard;