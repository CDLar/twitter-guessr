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
`

const ChoiceBody = styled.div`
margin-left:1em;
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
background-color: #A9A9A9;
`

const ChoiceCard = ({ clicker, val, userChoice, ans }) => {
    return (
        <>
            {!userChoice
                ?
                (
                    <Card onClick={clicker}>
                        < AvatarImg src={val[3]} alt={'avatar'}/>
                        <ChoiceBody>
                            <Name>{val[2]}</Name>
                            <Handle>{`@${val[1]} `}</Handle>
                        </ChoiceBody>
                    </Card >
                )
                :
                val[0] === ans
                    ?
                    (
                        <CorrectAnswer>
                            < AvatarImg src={val[3]} alt={'avatar'}/>
                            <ChoiceBody>
                                <Name>{val[2]}</Name>
                                <Handle>{`@${val[1]} `}</Handle>
                            </ChoiceBody>
                        </CorrectAnswer >
                    )
                    :
                    (
                        <WrongAnswer>
                            < AvatarImg src={val[3]} alt={'avatar'}/>
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