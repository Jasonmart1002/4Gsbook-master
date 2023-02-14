import React from 'react';
import "./Media.scss";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';

function Media(props) {

    return (
        <div className="mediaContainer">
            <Link to={`/game_details/${props.game_name}/${props.game_id}/youtube`} className="youtubeIcon">
                <FontAwesomeIcon icon={faYoutube}/>
            </Link>
            <a
                className="facebookIcon"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/search/top/?q=${props.game_name} game`}>
                <FontAwesomeIcon icon={faFacebook}/>
            </a>
        </div>
    )
}

export default Media