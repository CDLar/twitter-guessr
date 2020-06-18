import React, { useState, useEffect, useRef } from 'react';
import { Tweet } from 'react-twitter-widgets'
import { tweetData } from './data'
import styled from 'styled-components'
import { BsQuestionCircle } from "react-icons/bs";
import skeleText from './skeleton.png'
import ChoiceCard from './ChoiceCard'
import Home from './Home'
import { IoIosHome } from "react-icons/io";

function shuffle(array) { 
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//SC Styles
const StyledCover = styled.div`
position: absolute;
width: 400px;
height:4.5em;
z-index:100;
background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgIBwcHCAcHBwcHBwoHBwcHBw8ICQcKFREiFhURExMYHCggGCYlGxMTITEhMSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0NDy0ZFRk3NysrKysrKysrKysrKysrKysrKys3KysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIHA//EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARESAv/aAAwDAQACEQMRAD8A7eAAAAACAAAAAAIoCAAgqAAAgqAgoCCgIKACgIKAKAKCgAAAAAAAAgoCCgIKAgqAIqAIoCAAAAAAAoIKAgoCKACigAACAKAAAAAAAAAAAAigIACCgIKAgoCCgIKAAAAAigAoAIAAIDQoCCgIKAgoCCgIKAgoCCgIKAgoCCgIKAgAAAAICiAKgUAQAABsAAAAAAAAAAAAAAAAAAAAEAAAEAUQAAAAAABBQEFAaAAAAAAAAAAAAAAAABAVAABAVAEEAAAFEAURRQAAAAFBQAAAAAAAAAAAAAEAAEBUAQEAAAAQRQBQABUAUAUUAAAUAAAAAAAAAAACotQAABFQBAQBA1AQNFEDTFEDTFVlTRRA0URTVVWVBVRVAAAAAAAAAAAACotQAEQEVE0QETVE0TU0xdNZ01OjF01nTU6Ma1dY006XG9NZ01ejGtNZ1ToxpWVXTGosZWLKjSpFaiACgAAAAAAAAABUWoAi1mpVKhWaxaoJqWsauGpalrNrF9LjWprOprPS43prGmp2uN6axpp0Y3q689XV6Mb1dY1ZV6TG5VYlalalTG41GI1G5UrUaZjTrGaAKgAAAAAAAAABUAEqUGasZrNByrUZtZtBytbjNrNqjna1Izamg521rE00Gdq4auoLpi6ugsqYutSg3KjUqwHSM1qNxR18sVqNA7eWK//Z');
top:0.7em;
left:50%;
margin-left:-248.5px;
border-radius: 5px;
`

const Main = styled.div`
padding:1em;
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

const Game = () => {
    const savedBest = JSON.parse(localStorage.getItem('best'))
    const len = tweetData.length;
    const [streak, setStreak] = useState(0);
    const [best, setBest] = useState(savedBest || 0);
    const [active, setActive] = useState();
    const [activeChoices, setActiveChoices] = useState([])
    const [userChoice, setUserChoice] = useState(null)
    const [cover, setCover] = useState(true)
    const [refresh, setRefresh] = useState(true)
    const [answer, setAnswer] = useState(true)
    const choices = new Set();

    let questionsArray = useRef(Array.from(Array(len + 1).keys()))

    useEffect(() => {
        questionsArray.current.sort(() => Math.random() - 0.5)
        setActive(questionsArray.current.pop())
    }, [refresh]);

    useEffect(() => {
        streak >= best && setBest(streak)
        localStorage.setItem('best', best)
    }, [streak, best]);

    const newChoices = () => {
        setAnswer(tweetData[active][0])
        while (choices.size !== 3) {
            choices.add(Math.floor(Math.random() * Math.floor(len)));
        }
        setActiveChoices(shuffle([...choices, active]))
        setRefresh(!refresh)
    }

    const handleReveal = () => {
        setCover(false)
    }

    const handleCover = () => {
        setCover(true)
    }

    const handleClick = (ans) => {
        setUserChoice(ans)
        handleReveal()
        ans === answer ? setStreak((prevStreak) => prevStreak + 1) : setStreak(0)
        setTimeout(() => newQuestion(), 2000);
    }

    const newQuestion = () => {
        setActiveChoices([])
        setUserChoice(null)
        handleCover()
        newChoices()
    }
    const HomeIcon = styled(IoIosHome)`
    position:absolute;
    right:1%;
    cursor:pointer;
    `
    return (
        <Main>
            {activeChoices.length === 4 ?
                <>
                    <TweetOutter>
                        <HomeIcon size={50} color={'#00acee'} onClick={() => setActiveChoices([])} style={{ position: 'absolute', right: '1%', cursor: 'pointer' }} />
                        <TweetInner>
                            <Tweet tweetId={answer} options={{ width: '500', cards: "hidden" }} />
                            {cover &&
                                <StyledCover>
                                    <div style={{ paddingLeft: '18px', paddingTop: '15px' }}>
                                        {<BsQuestionCircle size={36} />}
                                        <img style={{ height: '36px', marginLeft: '10px' }} alt={'SkeleText'} src={skeleText} />
                                    </div>
                                </StyledCover>
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
                        <InfoText >{`Streak: ${streak}`}</InfoText>
                        <InfoText >{`Best: ${best}`}</InfoText>
                        <InfoText >{`Questions remaining: ${questionsArray.current.length}`}</InfoText>
                    </InfoContainer>
                </>
                :
                <Home newChoices={newChoices} />
            }
        </Main>
    );
};
export default Game;