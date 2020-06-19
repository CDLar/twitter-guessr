import React, { useState, useEffect, useRef } from 'react';
import { historicData } from './data'
import { dailyData } from './Test'
import styled from 'styled-components'
import Quiz from './Quiz'
import Home from './Home'

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
const Main = styled.div`
padding:1em;
`

const Game = () => {
    const savedBest = JSON.parse(localStorage.getItem('best'))
    const [activeQuiz, setActiveQuiz] = useState('historic')
    const len = historicData.length;
    const [streak, setStreak] = useState(0);
    const [best, setBest] = useState(savedBest || 0);
    const [active, setActive] = useState();
    const [activeChoices, setActiveChoices] = useState([])
    const [userChoice, setUserChoice] = useState(null)
    const [cover, setCover] = useState(true)
    const [refresh, setRefresh] = useState(true)
    const [answer, setAnswer] = useState(true)
    const choices = new Set();

    const lenDaily = dailyData.length
    const [activeDaily, setActiveDaily] = useState()
    const [activeChoicesDaily, setActiveChoicesDaily] = useState()
    const [userChoiceDaily, setUserChoiceDaily] = useState(null)
    const [refreshDaily, setRefreshDaily] = useState(true)
    const [answerDaily, setAnswerDaily] = useState(true)
    const choicesDaily = new Set()


    let questionsArray = useRef(Array.from(Array(len + 1).keys()))
    let questionsArrayDaily = useRef(Array.from(Array(lenDaily + 1).keys()))

    useEffect(() => {
        questionsArray.current.sort(() => Math.random() - 0.5)
        setActive(questionsArray.current.pop())
    }, [refresh]);

    useEffect(() => {
        questionsArrayDaily.current.sort(() => Math.random() - 0.5)
        setActiveDaily(questionsArrayDaily.current.pop())
    }, [refreshDaily]);

    useEffect(() => {
        streak >= best && setBest(streak)
        localStorage.setItem('best', best)
    }, [streak, best]);

    const newChoices = () => {
        setAnswer(historicData[active][0])
        while (choices.size !== 3) {
            choices.add(Math.floor(Math.random() * Math.floor(len)));
        }
        setActiveChoices(shuffle([...choices, active]))
        setRefresh(!refresh)
    }

    const newChoicesDaily = () => {
        setAnswer(dailyData[activeDaily][0])
        while (choicesDaily.size !== 3) {
            choicesDaily.add(Math.floor(Math.random() * Math.floor(lenDaily)));
        }
        setActiveChoicesDaily(shuffle([...choicesDaily, activeDaily]))
        setRefreshDaily(!refreshDaily)
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

    const handleClickDaily = (ans) => {
        setUserChoiceDaily(ans)
        handleReveal()
        ans === answerDaily ? setStreak((prevStreak) => prevStreak + 1) : setStreak(0)
        setTimeout(() => newQuestionDaily(), 2000);
    }

    const newQuestion = () => {
        setActiveChoices([])
        setUserChoice(null)
        handleCover()
        newChoices()
    }

    const newQuestionDaily = () => {
        setActiveChoicesDaily([])
        setUserChoiceDaily(null)
        handleCover()
        newChoicesDaily()
    }

    return (
        <Main>
            {activeChoices.length === 4 ?
                activeQuiz === 'historic' ?
                    <Quiz tweetData={historicData} cover={cover} answer={answer} handleClick={handleClick} activeChoices={activeChoices} setActiveChoices={setActiveChoices} userChoice={userChoice} streak={streak} best={best} questionsArray={questionsArray} />
                    :
                    <Quiz tweetData={dailyData} cover={cover} answer={answerDaily} handleClick={handleClickDaily} activeChoices={activeChoicesDaily} setActiveChoices={setActiveChoicesDaily} userChoice={userChoiceDaily} streak={streak} best={best} questionsArray={questionsArrayDaily} />
                :
                <Home newChoices={newChoices} setActiveQuiz={setActiveQuiz} />
            }
        </Main>
    );
};
export default Game;