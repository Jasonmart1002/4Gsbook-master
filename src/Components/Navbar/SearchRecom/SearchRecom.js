import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSadTear} from '@fortawesome/free-solid-svg-icons';
import './SearchRecom.scss';

function SearchRecom(props) {

    const [listOfGames,
        setListOfGames] = useState([])

    const {gamesRecommended} = props;

    const updateList = (gameRecommendedArr) => {
        if (!gameRecommendedArr) {
            return setListOfGames([])
        }
        const listItems = gameRecommendedArr.map((game, index) => {

            let imageToDisplay = <FontAwesomeIcon icon={faSadTear} className="sadIcon"/>
            if (game.background_image) {
                imageToDisplay = <img
                    src={game.background_image}
                    className="imageToDisplayOnSearch"
                    width="50px"
                    height="40px"
                    alt={`search result game name ${game.name}`}/>
            }

            return <Link to={`/game_details/${game.slug}`} key={index} className='gameRecommended'>
                <div className="searchBarOption">
                    <div>
                        {imageToDisplay}
                    </div>
                    <div className="textToDisplayOnSearch">
                        <div>{game.name}</div>
                    </div>
                </div>
            </Link>
        })
        setListOfGames(listItems)
    }

    useEffect(() => {
        updateList(gamesRecommended)
    }, [gamesRecommended])

    return (
        <div className="listContainerOfItemsSearched">
            {listOfGames}
        </div>
    )
}

export default SearchRecom
