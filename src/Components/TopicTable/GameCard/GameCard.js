import React, {useState} from 'react';
import './GameCard.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faSadTear} from '@fortawesome/free-solid-svg-icons';
import StarRatings from 'react-star-ratings';
import ReactPlayer from 'react-player';

function GameCard(props) {

    const [userView,
        setUserView] = useState({contentToDisplay: <img src={props.imageToDisplay} className="gameCardImg" alt={props.gameName}/>})
    const [gameRatingToDisplay,
        setGameRatingToDisplay] = useState({gameRating: null})

    const handleMouseEvent = (mouseAction) => {
        if (mouseAction) {
            if(!props.clip) {
                setUserView({...userView,
                    contentToDisplay:(
                        <div className="videoUnavailable">
                            <FontAwesomeIcon icon={faSadTear} className="sadIconGameCard"/>
                        </div>
                    )})
            } else {
                setUserView({
                    ...userView,
                    contentToDisplay: (<ReactPlayer
                        url={props.clip.clip}
                        className="gameCardClip"
                        width='100%'
                        height='100%'
                        playing
                        loop
                        volume={0}
                        muted/>)
                })
            }
            setGameRatingToDisplay({
                ...gameRatingToDisplay,
                gameRating: (<StarRatings
                    rating={props.rating}
                    starDimension="14px"
                    starSpacing="3px"
                    starEmptyColor="rgba(153, 153, 153, 0.568)"
                    starRatedColor="rgb(255, 255, 255)"/>)
            })
            
        } else {
            setUserView({
                ...userView,
                contentToDisplay: (<img src={props.imageToDisplay} className="gameCardImg" alt={props.gameName}/>)
            })
            setGameRatingToDisplay({
                ...gameRatingToDisplay,
                gameRating: null

            })
        }
    }

    return (
        <div
            className="cardContainer"
            onMouseEnter={() => handleMouseEvent(true)}
            onMouseLeave={() => handleMouseEvent(false)}>
            <div className="gameCardInformationContainer">
                <div className="gameCardInnerInformation">
                    <FontAwesomeIcon icon={faInfo} className="infoIcon"/>
                    <div>
                        <h5>{props.gameName}</h5>
                        <p>Released Day: {props.releasedDay}</p>
                        <p>Ratings: {props.ratingCount}</p>
                        <p>{props.suggestionsCount} <FontAwesomeIcon icon={faThumbsUp}/></p>
                    </div>
                </div>
            </div>
            <div>
                <div className="card gameCard">
                    <div className="nameAndRatingDetailBar">
                        {gameRatingToDisplay.gameRating}
                    </div>
                    {userView.contentToDisplay}
                </div>
            </div>
        </div>
    )
}

export default GameCard
