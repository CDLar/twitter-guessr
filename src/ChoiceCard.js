import React from 'react';
import styled from 'styled-components'

const Card = styled.div`
flex:1;
display:flex;
box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
border-radius:4px;
min-width:250px;
padding:1em;
margin:1em;
max-width:475px;
`
const ChoiceBody = styled.div`
margin-left:1em;
`
const Name = styled.h3`
font-size:1.2rem;
`

const Handle = styled.p`
color:rgba(0, 0, 0, 0.54);
font-weight:400;
font-size:1rem;
`

const CorrectAnswer = styled(Card)`
background-color: green;
`

const WrongAnswer = styled(Card)`
background-color: red;
`

const ChoiceCard = ({ clicker, val, userChoice, ans }) => {
    return (
        <>
            {!userChoice
                ?
                (
                    <Card onClick={clicker}>
                        < img src={val[3]} alt={'avatar'}/>
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
                            < img src={val[3]} alt={'avatar'}/>
                            <ChoiceBody>
                                <Name>{val[2]}</Name>
                                <Handle>{`@${val[1]} `}</Handle>
                            </ChoiceBody>
                        </CorrectAnswer >
                    )
                    :
                    (
                        <WrongAnswer>
                            < img src={val[3]} alt={'avatar'}/>
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