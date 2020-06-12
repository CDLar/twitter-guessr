import React, { useState } from 'react';
import { Tweet } from 'react-twitter-widgets'
import { tweetData } from './data'
import styled from 'styled-components'
import { BsQuestionCircle } from "react-icons/bs";
import {skeleText} from './skeleton.png'

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
width: 497px;
height:4.5em;
z-index:100;
background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgIBwcHCAcHBwcHBwoHBwcHBw8ICQcKFREiFhURExMYHCggGCYlGxMTITEhMSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0NDy0ZFRk3NysrKysrKysrKysrKysrKysrKys3KysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIHA//EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARESAv/aAAwDAQACEQMRAD8A7eAAAAACAAAAAAIoCAAgqAAAgqAgoCCgIKACgIKAKAKCgAAAAAAAAgoCCgIKAgqAIqAIoCAAAAAAAoIKAgoCKACigAACAKAAAAAAAAAAAAigIACCgIKAgoCCgIKAAAAAigAoAIAAIDQoCCgIKAgoCCgIKAgoCCgIKAgoCCgIKAgAAAAICiAKgUAQAABsAAAAAAAAAAAAAAAAAAAAEAAAEAUQAAAAAABBQEFAaAAAAAAAAAAAAAAAABAVAABAVAEEAAAFEAURRQAAAAFBQAAAAAAAAAAAAAEAAEBUAQEAAAAQRQBQABUAUAUUAAAUAAAAAAAAAAACotQAABFQBAQBA1AQNFEDTFEDTFVlTRRA0URTVVWVBVRVAAAAAAAAAAAACotQAEQEVE0QETVE0TU0xdNZ01OjF01nTU6Ma1dY006XG9NZ01ejGtNZ1ToxpWVXTGosZWLKjSpFaiACgAAAAAAAAABUWoAi1mpVKhWaxaoJqWsauGpalrNrF9LjWprOprPS43prGmp2uN6axpp0Y3q689XV6Mb1dY1ZV6TG5VYlalalTG41GI1G5UrUaZjTrGaAKgAAAAAAAAABUAEqUGasZrNByrUZtZtBytbjNrNqjna1Izamg521rE00Gdq4auoLpi6ugsqYutSg3KjUqwHSM1qNxR18sVqNA7eWK//Z');
top:4.95em;
left:50%;
margin-left:-248.5px;
border-radius: 5px;
`

const Main = styled.div`
padding:3em;
`

const Game = () => {
    const len = tweetData.length;
    const [streak, setStreak] = useState(0);
    const [correct, setCorrect] = useState();
    const [active, setActive] = useState(Math.floor(Math.random() * Math.floor(len)));
    const [activeChoices, setActiveChoices] = useState([])
    const Choices = new Set();
    const [cover, setCover] = useState(true)

    const newChoices = () => {
        while (Choices.size !== 3) {
            Choices.add(Math.floor(Math.random() * Math.floor(len)));
        }
        setActiveChoices(shuffle([...Choices, active]))
    };

    return (
        <Main>
            <button onClick={newChoices}>INIT</button>
            {activeChoices.length === 4 &&
                <>
                    {console.log(activeChoices)}

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '500px' }}>
                            <Tweet tweetId={tweetData[active][0]} options={{ width: '500', cards: "hidden" }} />
                            {cover &&
                                <StyledCover>
                                    <div style={{ paddingLeft: '18px', paddingTop: '15px' }}>
                                        {<BsQuestionCircle size={36} />}
                                        <img src={skeleText}/>
                                    </div>
                                </StyledCover>
                            }
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ border: '1px solid black', padding: '25px' }}>
                            <h2>{tweetData[activeChoices[0]][1]}</h2>
                            <h3>{tweetData[activeChoices[0]][2]}</h3>
                            <img src={tweetData[activeChoices[0]][3]} />
                        </div>
                        <div style={{ border: '1px solid black', padding: '25px' }}>
                            <h2>{tweetData[activeChoices[1]][1]}</h2>
                            <h3>{tweetData[activeChoices[1]][2]}</h3>
                            <img src={tweetData[activeChoices[1]][3]} />
                        </div>
                        <div style={{ border: '1px solid black', padding: '25px' }}>
                            <h2>{tweetData[activeChoices[2]][1]}</h2>
                            <h3>{tweetData[activeChoices[2]][2]}</h3>
                            <img src={tweetData[activeChoices[2]][3]} />
                        </div>
                        <div style={{ border: '1px solid black', padding: '25px' }}>
                            <h2>{tweetData[activeChoices[3]][1]}</h2>
                            <h3>{tweetData[activeChoices[3]][2]}</h3>
                            <img src={tweetData[activeChoices[3]][3]} />
                        </div>
                    </div>
                    <button onClick={() => setCover(false)}>REVEAL</button>
                </>
            }
        </Main>
    );
};
export default Game;