import React, { useState, useEffect } from 'react';
import { historicData } from '../historicData'
import { dailyData } from '../dailyData'
import styled from 'styled-components'
import Quiz from './Quiz'
import Home from './Home'
import FinScreen from './FinScreen'

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
min-height:100vh;
`

const Game = ({toggleTheme, themePointer}) => {
    const savedBest = JSON.parse(localStorage.getItem('best'))
    const [showFin, setShowFin] = useState(false)
    const [activeQuiz, setActiveQuiz] = useState('historic')

    //Historic State
    const len = historicData.length;
    const [streak, setStreak] = useState(0);
    const [best, setBest] = useState(savedBest || 0);
    const [active, setActive] = useState();
    const [activeChoices, setActiveChoices] = useState([])
    const [userChoice, setUserChoice] = useState(null)
    const [cover, setCover] = useState(true)
    const [refresh, setRefresh] = useState(true)
    const [answer, setAnswer] = useState()
    const [questionsArray, setQuestionsArray] = useState(Array.from(Array(len).keys()))
    const [historicFinish, setHistoricFinish] = useState(false)
    const [historicRemaining, setHistoricRemaining] = useState(historicData.length)
    const choices = new Set();

    //Daily State
    const lenDaily = dailyData.length
    const [dailyScore, setDailyScore] = useState(0)
    const [activeDaily, setActiveDaily] = useState()
    const [activeChoicesDaily, setActiveChoicesDaily] = useState([])
    const [userChoiceDaily, setUserChoiceDaily] = useState(null)
    const [refreshDaily, setRefreshDaily] = useState()
    const [answerDaily, setAnswerDaily] = useState()
    const [questionsArrayDaily, setQuestionsArrayDaily] = useState(Array.from(Array(lenDaily).keys()))
    const [dailyFinish, setDailyFinish] = useState(false)
    const [dailyRemaining, setDailyRemaining] = useState(dailyData.length)
    const choicesDaily = new Set();

    useEffect(() => {
        questionsArray.sort(() => Math.random() - 0.5)
        setActive(questionsArray[0])
        setQuestionsArray(questionsArray.slice(1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    useEffect(() => {
        questionsArrayDaily.sort(() => Math.random() - 0.5)
        setActiveDaily(questionsArrayDaily[0])
        setQuestionsArrayDaily(questionsArrayDaily.slice(1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshDaily]);

    useEffect(() => {
        streak >= best && setBest(streak)
        localStorage.setItem('best', best)
    }, [streak, best]);

    useEffect(() => {

    }, [activeChoicesDaily])

    const newChoices = () => {
        let names = []
        setAnswer(historicData[active][0])
        choices.add(active)
        names.push(historicData[active][1])
        while (choices.size !== 4) {
            let temp = Math.floor(Math.random() * Math.floor(len))
            if (choices.has(temp) === false && names.includes(historicData[temp][1]) === false) {
                names.push(historicData[temp][1])
                choices.add(temp);
            }
            setActiveChoices(shuffle([...choices]))
            setRefresh(!refresh)
        }
    }
    const newChoicesDaily = () => {
        let dailyNames = []
        setAnswerDaily(dailyData[activeDaily][0])
        choicesDaily.add(activeDaily)
        dailyNames.push(dailyData[activeDaily][1])
        while (choicesDaily.size !== 4) {
            let temp = Math.floor(Math.random() * Math.floor(lenDaily))
            if (choicesDaily.has(temp) === false && dailyNames.includes(dailyData[temp][1]) === false) {
                dailyNames.push(dailyData[temp][1])
                choicesDaily.add(temp);
            }
        }
        setActiveChoicesDaily(shuffle([...choicesDaily]))
        setRefreshDaily(!refreshDaily)
    }

    const handleReveal = () => {
        setCover(false)
    }

    const handleCover = () => {
        setCover(true)
    }

    const resetActive = () => {
        setQuestionsArray(Array.from(Array(len).keys()))
        setQuestionsArrayDaily(Array.from(Array(lenDaily).keys()))
        setRefresh(!refresh)
        setRefreshDaily(!refreshDaily)
        setDailyFinish(false)
        setHistoricFinish(false)
        setHistoricRemaining(len)
        setDailyRemaining(lenDaily)
        setShowFin(false)
    }

    const handleClick = (ans) => {
        setUserChoice(ans)
        setHistoricRemaining(prev => prev - 1)
        handleReveal()
        ans === answer ? setStreak((prevStreak) => prevStreak + 1) : setStreak(0)
        if (!historicFinish) {
            setTimeout(() => newQuestion(), 2000);
            if (questionsArray.length === 0) {
                setHistoricFinish(true)
            }
        } else {
            setShowFin(true)
        }
    }

    const handleClickDaily = (ans) => {
        setUserChoiceDaily(ans)
        setDailyRemaining(prev => prev - 1)
        handleReveal()
        ans === answerDaily && setDailyScore((prevScore) => prevScore + 1)
        if (!dailyFinish) {
            setTimeout(() => newQuestionDaily(), 2000);
            if (questionsArrayDaily.length === 0) {
                setDailyFinish(true)
            }
        } else {
            setTimeout(() => setShowFin(true), 2000)
        }
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
            {activeChoices.length === 4 || activeChoicesDaily.length === 4 ?
                activeQuiz === 'historic' ?
                    //Historic Quiz
                    <Quiz
                        tweetData={historicData}
                        cover={cover}
                        answer={answer}
                        handleClick={handleClick}
                        activeChoices={activeChoices}
                        setActiveChoices={setActiveChoices}
                        userChoice={userChoice} streak={streak}
                        best={best} questionsArray={questionsArray}
                        resetActive={resetActive}
                        activeQuiz={activeQuiz}
                        remaining={historicRemaining}
                        themePointer={themePointer} />
                    :
                    !showFin
                        //Daily Quiz
                        ? <Quiz
                            tweetData={dailyData}
                            cover={cover}
                            answer={answerDaily}
                            handleClick={handleClickDaily}
                            activeChoices={activeChoicesDaily}
                            setActiveChoices={setActiveChoicesDaily}
                            userChoice={userChoiceDaily}
                            streak={dailyScore} best={best}
                            questionsArray={questionsArrayDaily}
                            resetActive={resetActive}
                            activeQuiz={activeQuiz}
                            remaining={dailyRemaining}
                            themePointer={themePointer} />
                        : <FinScreen resetActive={resetActive} showFin={showFin} streak={streak} dailyScore={dailyScore} />
                :
                <Home newChoices={newChoices} newChoicesDaily={newChoicesDaily} setActiveQuiz={setActiveQuiz} toggleTheme={toggleTheme} themePointer={themePointer}/>
            }
        </Main>
    );
};
export default Game;
