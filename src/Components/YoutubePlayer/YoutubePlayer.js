import React, {useEffect, useState} from 'react';
import "./YoutubePlayer.scss";
import YouTube from 'react-youtube';
import axios from 'axios';

function YoutubePlayer(props) {

    let game_id = props.match.params.id
    // need to find a better way to search youtube with more restrictions these is a
    // temporary solution to a search
    if (game_id === '13536') {
        game_id = '4200'
    }

    const [youtubeVideoId,
        setYoutubeVideoId] = useState({id: ""})

    useEffect(() => {
        try {
            const fetchData = async() => {
                const request = await axios.get(`https://api.rawg.io/api/games/${game_id}/youtube`);
                if (request.data.results[1]) {
                    setYoutubeVideoId({id: request.data.results[0].external_id})
                } else {
                    setYoutubeVideoId({errorMessage: "Sorry no video to display"})
                }
            }
            fetchData()
        } catch (error) {
            alert("Something went wrong please try again")
        }
    }, [game_id])

    const handleBackGroundClick = () => {
        props
            .history
            .goBack()
    }

    const opts = {
        height: '390',
        width: '100%'
    };

    let contentToDisplay = <div className="loader_4"></div>
    if (youtubeVideoId.id) {
        contentToDisplay = (
            <div className="youtubePlayer">
                <YouTube videoId={youtubeVideoId.id} opts={opts}/>
            </div>
        )
    } else {
        if (youtubeVideoId.errorMessage) {
            contentToDisplay = <p className="noVideo">{youtubeVideoId.errorMessage}</p>
        }
    }

    return (
        <div className="youtubeContainer" onClick={handleBackGroundClick}>
            <div className="YoutubeBg"></div >
            {contentToDisplay}
        </div>
    )
}

export default YoutubePlayer