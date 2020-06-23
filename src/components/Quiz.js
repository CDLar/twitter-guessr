import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { IoIosHome } from "react-icons/io";
import { Tweet } from 'react-twitter-widgets'
import skeleText from '../skeleton.png'
import ChoiceCard from './ChoiceCard'
import { BsQuestionCircle } from "react-icons/bs";

//SC Styles
const Main = styled.div`
padding:1em;
`

const StyledCover = styled.div`
position: absolute;
background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgIBwcHCAcHBwcHBwoHBwcHBw8ICQcKFREiFhURExMYHCggGCYlGxMTITEhMSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0NDy0ZFRk3NysrKysrKysrKysrKysrKysrKys3KysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIHA//EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARESAv/aAAwDAQACEQMRAD8A7eAAAAACAAAAAAIoCAAgqAAAgqAgoCCgIKACgIKAKAKCgAAAAAAAAgoCCgIKAgqAIqAIoCAAAAAAAoIKAgoCKACigAACAKAAAAAAAAAAAAigIACCgIKAgoCCgIKAAAAAigAoAIAAIDQoCCgIKAgoCCgIKAgoCCgIKAgoCCgIKAgAAAAICiAKgUAQAABsAAAAAAAAAAAAAAAAAAAAEAAAEAUQAAAAAABBQEFAaAAAAAAAAAAAAAAAABAVAABAVAEEAAAFEAURRQAAAAFBQAAAAAAAAAAAAAEAAEBUAQEAAAAQRQBQABUAUAUUAAAUAAAAAAAAAAACotQAABFQBAQBA1AQNFEDTFEDTFVlTRRA0URTVVWVBVRVAAAAAAAAAAAACotQAEQEVE0QETVE0TU0xdNZ01OjF01nTU6Ma1dY006XG9NZ01ejGtNZ1ToxpWVXTGosZWLKjSpFaiACgAAAAAAAAABUWoAi1mpVKhWaxaoJqWsauGpalrNrF9LjWprOprPS43prGmp2uN6axpp0Y3q689XV6Mb1dY1ZV6TG5VYlalalTG41GI1G5UrUaZjTrGaAKgAAAAAAAAABUAEqUGasZrNByrUZtZtBytbjNrNqjna1Izamg521rE00Gdq4auoLpi6ugsqYutSg3KjUqwHSM1qNxR18sVqNA7eWK//Z');
border-radius: 5px;
left:50%;
z-index:100;

width: 400px;
height:4.5em;
top:0.7em;
margin-left:-248.5px;
`

const StyledCoverMobile = styled(StyledCover)`
width: 250px;
height:4em;
top:0.7em;
margin-left:-158.5px;
`

const TweetOutter = styled.div`
display:flex;
justify-content:center;
`

const TweetInner = styled.div`
width:500px;
position:relative;
&::before {
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color:rgba(0,0,0,0);
    z-index:1;
}
`

const ChoiceContainer = styled.div`
margin-top:3em;
@media (max-width: 700px) {
 margin-top:1em;
  }
`

const ChoiceRow = styled.div`
display:flex;
margin:0 5em;
justify-Content:center;
@media (max-width: 700px) {
    flex-direction: column;
    justify-content:center;
    align-items:center; 
    margin: 0 3em
  }
  @media (max-width: 550px) {
    margin: 0 1em
  }
`
const InfoContainer = styled.div`
display:flex;
flex-flow:row nowrap;
margin-top:1em;
justify-content:center;
@media (max-width: 700px) {
    justify-content:space-between;
}
`

const InfoText = styled.div`
display:flex;
margin: 0 6.8em;
@media (max-width: 700px) {
    margin:0 4em;
}
@media (max-width: 550px) {
    margin:0;
}
`

const HomeIcon = styled(IoIosHome)`
position:absolute;
right:1%;
cursor:pointer;

@media (max-width: 605px) {
bottom:0%;
}
`

function useWindowSize() {
    const [mobile, setMobile] = useState(window.innerWidth > 550 ? false : true);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 550) {
                setMobile(false)
            } else if (window.innerWidth < 550) {
                setMobile(true)
            }
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return mobile;
}

const Quiz = ({ tweetData, cover, answer, handleClick, activeChoices, setActiveChoices, userChoice, streak, best, questionsArray, resetActive, activeQuiz }) => {

    const mobile = useWindowSize()

    return (
        <Main>
            {console.log(mobile)}
            <TweetOutter>
                <HomeIcon size={50} color={'#00acee'} onClick={() => { setActiveChoices([]); resetActive() }} style={{ position: 'absolute', right: '1%', cursor: 'pointer' }} />
                <TweetInner>
                    {!mobile ? (
                        <>
                            <Tweet tweetId={answer} options={{ width: 500, align: 'center', cards: "hidden" }} />
                            {cover &&
                                <StyledCover>
                                    <div style={{ paddingLeft: '18px', paddingTop: '15px' }}>
                                        {<BsQuestionCircle size={36} />}
                                        <img style={{ height: '36px', marginLeft: '10px' }} alt={'SkeleText'} src={skeleText} />
                                    </div>
                                </StyledCover>}
                        </>)
                        :
                        (<>
                            <Tweet tweetId={answer} options={{ width: 320, align: 'center', cards: "hidden" }} />
                            {cover &&
                                <StyledCoverMobile>
                                    <div style={{ paddingLeft: '17px', paddingTop: '17px' }}>
                                        {<BsQuestionCircle size={36} />}
                                        <img style={{ height: '36px', width: '150px', marginLeft: '10px' }} alt={'SkeleText'} src={skeleText} />
                                    </div>
                                </StyledCoverMobile>}
                        </>)
                    }
                </TweetInner>
            </TweetOutter>
            <ChoiceContainer>
                <ChoiceRow>
                    <ChoiceCard clicker={() => handleClick(tweetData[activeChoices[0]][0])} val={[...tweetData[activeChoices[0]]]} ans={answer} userChoice={userChoice} />
                    <ChoiceCard clicker={() => handleClick(tweetData[activeChoices[1]][0])} val={[...tweetData[activeChoices[1]]]} ans={answer} userChoice={userChoice} />
                </ChoiceRow>
                <ChoiceRow>
                    <ChoiceCard clicker={() => handleClick(tweetData[activeChoices[2]][0])} val={tweetData[activeChoices[2]]} ans={answer} userChoice={userChoice} />
                    <ChoiceCard clicker={() => handleClick(tweetData[activeChoices[3]][0])} val={[...tweetData[activeChoices[3]]]} ans={answer} userChoice={userChoice} />
                </ChoiceRow>
            </ChoiceContainer>
            <InfoContainer>
                {activeQuiz === 'historic'
                    ? (<>
                        <InfoText >{`Streak: ${streak}`}</InfoText>
                        <InfoText >{`Best: ${best}`}</InfoText>
                    </>)
                    : (<>
                        <InfoText >{`Score: ${streak}`}</InfoText>
                    </>)
                }

                <InfoText >{`Questions remaining: ${questionsArray.length + 1}`}</InfoText>
            </InfoContainer>
        </Main>
    );
}

export default Quiz;