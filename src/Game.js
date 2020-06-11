import React, { useState } from 'react';
import { Tweet } from 'react-twitter-widgets'
import { tweetData } from './data'

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const Game = () => {
    const len = tweetData.length;
    const [streak, setStreak] = useState(0);
    const [correct, setCorrect] = useState();
    const [active, setActive] = useState(Math.floor(Math.random() * Math.floor(len + 1)));
    const [activeChoices, setActiveChoices] = useState([])
    const Choices = new Set();
    const [cover, setCover] = useState(true)

    const newChoices = () => {
        while (Choices.size !== 3) {
            Choices.add(Math.floor(Math.random() * Math.floor(100 + 1)));
        }
        setActiveChoices(shuffle([...Choices, active]))
    };

    return (
        <div>
            <button onClick={newChoices}>INIT</button>
            {activeChoices.length === 4 &&
                <>
                    <Tweet tweetId={tweetData[active][0]} options={{ cards: "hidden" }} />
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div>
                            <h2>{tweetData[activeChoices[0]][1]}</h2>
                            <h3>{tweetData[activeChoices[0]][2]}</h3>
                            <img src={tweetData[activeChoices[0]][3]} />
                        </div>
                        <div>
                            <h2>{tweetData[activeChoices[1]][1]}</h2>
                            <h3>{tweetData[activeChoices[1]][2]}</h3>
                            <img src={tweetData[activeChoices[1]][3]} />
                        </div>
                        <div>
                            <h2>{tweetData[activeChoices[2]][1]}</h2>
                            <h3>{tweetData[activeChoices[2]][2]}</h3>
                            <img src={tweetData[activeChoices[2]][3]} />
                        </div>
                        <div>
                            <h2>{tweetData[activeChoices[3]][1]}</h2>
                            <h3>{tweetData[activeChoices[3]][2]}</h3>
                            <img src={tweetData[activeChoices[3]][3]} />
                        </div>
                    </div>
                    <button onClick={() => setCover(false)}>REVEAL</button>
                    {cover &&
                        <div style={{ position: 'absolute', left: '0', top: '0', width: '600px', height: '95px', backgroundColor: 'white', zIndex: 10 }}></div>
                    }
                </>
            }
        </div>
    );
};
export default Game;