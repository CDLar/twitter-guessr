import React, { useState, useEffect, useRef } from 'react';
import { Tweet } from 'react-twitter-widgets'
import { tweetData } from './data'
import styled from 'styled-components'
import { BsQuestionCircle } from "react-icons/bs";
import skeleText from './skeleton.png'
import ChoiceCard from './ChoiceCard'

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
top:1.7em;
left:50%;
margin-left:-248.5px;
border-radius: 5px;
`

const Main = styled.div`
padding:1em;
`
const ChoiceContainer = styled.div`
display:flex;
justify-content:center;
`
const TweetContainer = styled.div`
width:500px;
`
const ChoiceRow = styled.div`
display:flex;
justify-Content:space-around;
`

const StartButton = styled.button`
position:absolute;
top:50%;
left:50%;
`

const Game = () => {
    const len = tweetData.length;
    const [streak, setStreak] = useState(0);
    const [best, setBest] = useState(0);
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
        console.log(questionsArray.current.length)
    }, [refresh]);

    useEffect(() => {
        streak >= best && setBest(streak)
    }, [streak, best]);

    const newChoices = () => {
        setAnswer(tweetData[active][0])
        while (choices.size !== 3) {
            choices.add(Math.floor(Math.random() * Math.floor(len)));
        }
        setActiveChoices(shuffle([...choices, active]))
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
    }

    const newQuestion = () => {
        setRefresh(!refresh)
        setActiveChoices([])
        setUserChoice(null)
        handleCover()
        newChoices()
    }

    return (
        <Main>
            {activeChoices.length === 4 ?
                <>
                    <ChoiceContainer>
                        <TweetContainer>
                            <Tweet tweetId={answer} options={{ width: '500', cards: "hidden" }} />
                            {cover &&
                                <StyledCover>
                                    <div style={{ paddingLeft: '18px', paddingTop: '15px' }}>
                                        {<BsQuestionCircle size={36} />}
                                        <img style={{ height: '36px', marginLeft: '10px' }} alt={'SkeleText'}src={skeleText} />
                                    </div>
                                </StyledCover>
                            }
                        </TweetContainer>
                    </ChoiceContainer>
                    <ChoiceRow>
                        <ChoiceCard clicker={() => handleClick(tweetData[activeChoices[0]][0])} val={[...tweetData[activeChoices[0]]]} ans={answer} userChoice={userChoice} />
                        <ChoiceCard clicker={() => handleClick(tweetData[activeChoices[1]][0])} val={[...tweetData[activeChoices[1]]]} ans={answer} userChoice={userChoice} />
                    </ChoiceRow>
                    <ChoiceRow>
                        <ChoiceCard clicker={() => handleClick(tweetData[activeChoices[2]][0])} val={tweetData[activeChoices[2]]} ans={answer} userChoice={userChoice} />
                        <ChoiceCard clicker={() => handleClick(tweetData[activeChoices[3]][0])} val={[...tweetData[activeChoices[3]]]} ans={answer} userChoice={userChoice} />
                    </ChoiceRow>
                    <button disabled={cover} onClick={newQuestion}>New Question</button>
                    <h3>{`Streak: ${streak}`}</h3>
                    <h3>{`Best: ${best}`}</h3>
                    <h3>{`Questions remaining: ${questionsArray.current.length}`}</h3>
                </>
                :
                <StartButton onClick={newChoices}>START</StartButton>
            }
        </Main>
    );
};
export default Game;