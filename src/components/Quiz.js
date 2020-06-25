import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { IoIosHome } from "react-icons/io";
import { Tweet } from 'react-twitter-widgets'
import skeleText from '../skeleton.png'
import skeleDark from '../skeledark.png'
import ChoiceCard from './ChoiceCard'
import { BsQuestionCircle } from "react-icons/bs";


//SC Styles
const Main = styled.div`
display:flex;
flex-direction:column;
height:100%;
min-height:100vh;
background-color:${props => props.theme.primary};
`

const StyledCover = styled.div`
position: absolute;
background-color:${props => props.theme.cover};
border-radius: 15px;
left:50%;
z-index:100;

width: 440px;
height:4.15em;
top:0.7em;
margin-left:-235px;
`

const StyledCoverMobile = styled(StyledCover)`
width: 250px;
height:4em;
top:0.7em;
margin-left:-158.5px;
`

const TweetOutter = styled.div`
display:flex;
flex:4;
justify-content:center;
align-items:center;
`

const TweetInner = styled.div`
margin-top:-10px;
width:500px;
height:18.75em;
overflow:auto;
margin: 1px;
position:relative;
& > * {
    pointer-events:none;
}
@media (max-width: 700px) {
 height: 15em;
  }
  @media (max-width: 550px) {
 height: 14em;
  }
  &::-webkit-scrollbar-track
{
    width: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.scrollTrack};
}
&::-webkit-scrollbar
{
    width: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.scrollTrack};
}

&::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    background-color: ${props => props.theme.scrollThumb};
}
`

const ChoiceContainer = styled.div`
flex:4;
justify-content:center;
align-items:center;
`

const ChoiceRow = styled.div`
display:flex;
justify-Content:center;
@media (max-width: 700px) {
    flex-direction: column;
    justify-content:center;
    align-items:center; 
  }
  @media (max-width: 550px) {
  }
`
const InfoContainer = styled.div`
flex:2;
display:flex;
overflow-x:hidden;
flex-flow:row nowrap;
justify-content:center;
margin-bottom:2em;
@media (max-width: 700px) {
    justify-content:space-between;
    padding:1em;
}
`

const InfoText = styled.div`
display:flex;
color:${props => props.theme.color};
padding:0 7em;
@media (max-width: 700px) {
padding:0em;
}
`

const HomeIcon = styled(IoIosHome)`
position:absolute;
right:0%;
top:0%;
margin:1em;
cursor:pointer;
@media (max-width: 700px) {
display:none;
}
`

const QuestionIcon = styled(BsQuestionCircle)`
color:${props => props.theme.color};
`

const FooterHome = styled.div`
display:none;
position:fixed;
bottom:0;
@media (max-width: 700px) {
display:inline-flex;
background-color:#00acee;
color:white;
width:100%;
justify-content:center;
cursor:pointer;
height:5vh;
}
`
const StyledTweet = styled(Tweet)`
display:flex;
justify-content:flex-start;
`
function useWindowSize() {
    const [isMobile, setIsMobile] = useState(window.innerWidth > 550 ? false : true);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 550) {
                setIsMobile(false)
            } else if (window.innerWidth < 550) {
                setIsMobile(true)
            }
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return isMobile;
}

const Quiz = ({ tweetData, cover, answer, handleClick, activeChoices, setActiveChoices, userChoice, streak, best, questionsArray, resetActive, activeQuiz, remaining, themePointer }) => {

    const isMobile = useWindowSize()

    return (
        <Main>
            {console.log(isMobile)}
            <TweetOutter>
                {cover ?
                    <HomeIcon size={50} color={'#00acee'} onClick={() => { setActiveChoices([]); resetActive() }} />
                    :
                    <HomeIcon size={50} style={{ cursor: 'not-allowed' }} color={'#00acee'} />
                }
                <TweetInner>
                    <>
                        {!isMobile ? (
                            <>
                                <StyledTweet tweetId={answer} options={{ width: 500, align: 'center', cards: "hidden", theme: themePointer }} />
                                {cover &&
                                    <StyledCover>
                                        <div style={{ paddingLeft: '5px', paddingTop: '15px' }}>
                                            {<QuestionIcon size={36} />}
                                            <img style={{ height: '36px', marginLeft: '10px' }} alt={'SkeleText'} src={themePointer === 'light' ? skeleText : skeleDark} />
                                        </div>
                                    </StyledCover>}
                            </>)
                            :
                            (<>
                                <Tweet tweetId={answer} options={{ width: 320, align: 'center', cards: "hidden", theme: themePointer }} />
                                {cover &&
                                    <StyledCoverMobile>
                                        <div style={{ paddingLeft: '17px', paddingTop: '17px' }}>
                                            {<QuestionIcon size={36} />}
                                            <img style={{ height: '36px', width: '150px', marginLeft: '10px' }} alt={'SkeleText'} src={themePointer === 'light' ? skeleText : skeleDark} />
                                        </div>
                                    </StyledCoverMobile>}
                            </>)
                        }
                    </>
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
                <InfoText >{`Remaining: ${remaining}`}</InfoText>
            </InfoContainer>
            {cover ?
                <FooterHome onClick={() => { setActiveChoices([]); resetActive() }}>Back to Home</FooterHome>
                :
                <FooterHome style={{ cursor: 'not-allowed' }}>Back to Home</FooterHome>
            }
        </Main>
    );
}

export default Quiz;