import React, {useState, useEffect} from "react";
import "./GameDetails.scss";
import Article from "../../Components/Disqus/Disqus";
import StarRatings from 'react-star-ratings';
import ReactPlayer from 'react-player';
import FollowButton from "../../Components/FollowButton/FollowButton";
import Media from "../../Components/Media/Media";

export function GameDetails(props) {

    // Get the game slug from the props and initialize the state

    const gameToSearch = props.match.params.slug;
    const [game,
        setGame] = useState([]);
    const [userView,
        setUserView] = useState({contentToDisplay: (
            <div className="spinnerContainer">
                <div className="loader_3"></div>
            </div>
        )})
    
    // A helper function to update the game and userView state

    const updateState = (data) => {
        setGame(data)

        // If there's no video clip for the game, display the background image instead

        if (!data.clip) {
            return setUserView({contentToDisplay: (<img
                src={data.background_image}
                className="card-img gameCardImg"
                alt={data.name}/>)})
        }

        // Display the video clip if available

        setUserView({contentToDisplay: (<ReactPlayer
            url={data.clip.clip}
            width='100%'
            height='100%'
            controls
            loop
            playing
            volume={0}/>)})
    }

    // Use the useEffect hook to fetch the game data from the API when the component is mounted

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${gameToSearch}`)
            .then(response => response.json())
            .then(data => updateState(data))
            .catch(error => alert("Something went wrong please try again later"))
    }, [gameToSearch]);

    // The component's UI

    return (
        <div className="gameDetailsComponent">
            <div className="gameDetailsMain">
            <div className="gameDetails_bg_image" style={{backgroundImage: `url(${game.background_image})`}}></div>
            <div className="gameDetails_bg"></div>
                <div className="detailsContainer">
                    <div className="leftContainer">
                        <div className="gameDetailsVideo">
                            {userView.contentToDisplay}
                        </div>
                        <div className="gameDetailsFollowButtonContainer">
                                <Media game_name={game.name} game_id={game.id}/>
                                <FollowButton game_id={game.id} game_name={game.name} />
                        </div>
                        <div className="disqusContainer">
                            <div className="disqus">
                                <Article articleId ={game.slug} articleTitle={game.name}/>
                            </div>
                        </div>
                    </div>
                    <div className="rightContainer">
                        <div className="description">
                            <div>
                                <h2 className="gameName">{game.name}</h2>
                            </div>
                            <div className="gameDetailsStarRating">
                                <StarRatings
                                    rating={game.rating}
                                    starDimension="17px"
                                    starSpacing="3px"
                                    starEmptyColor="rgba(153, 153, 153, 0.568)"
                                    starRatedColor="rgb(253, 204, 13)"/>
                            </div>
                            <div className="gameDescription">
                                <p
                                    dangerouslySetInnerHTML={{
                                    __html: game.description
                                }}></p>
                                <div className="descriptionDetails">
                                    <p className="detailTxt">Release Date: {game.released}</p>
                                    <a
                                        href={game.website}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="detailTxt">{game.website}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// The `useEffect` hook is used to fetch the game data from the API when the component is mounted. The `gameToSearch` variable is used as a dependency in the hook's array to re-fetch data whenever the slug changes.
// The `updateState` function is used to update the `game` and `userView` state based on the game data fetched from the API.
// The component renders the game's background image, video, follow button, star ratings, description, and Disqus comments. It also uses third-party libraries such as ReactPlayer and StarRatings.
