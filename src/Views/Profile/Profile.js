import React, {useContext, useState, useEffect} from "react";
import "./Profile.scss";
import {Context} from "../../Store/appContext";
import axios from 'axios';
import GameInstance from "./GameInstance/GameInstance";
import StoreOptions from "./StoreOptions/StoreOptions";
import UserInformation from "./UserInformation/UserInformation";

export function Profile(props) {

    const {store} = useContext(Context);
    const {favoriteGameInfo, userLogin} = store;
    const {history} = props

    // Use the useEffect hook to redirect to the homepage if the user is not logged in
    useEffect(() => {
        if (!userLogin) {
            history.push('/')
        }
    }, [userLogin, history])

    // Initialize the state for the favorite games and store deals
    const [favoriteGamesToDisplay,
        setFavoriteGameToDisplay] = useState(
        <div>Select a game to follow store updates</div>
    )
    const [storeDeals,
        setStoreDeals] = useState({
        messageToDisplay: <div>Please select a game to search for deals</div>
    })

    // Fetch store data using the ITAD API
    const fetchStoreData = async(game) => {
        try {

            // Display a loading spinner while fetching the data
            setStoreDeals({spinner: (
                    <div className="loaderStoreContainer">
                        <div className="loaderStore"></div>
                    </div>
                )})
            const key = process.env.REACT_APP_IS_THERE_ANY_DEAL;
            const request = await axios.get(`https://api.isthereanydeal.com/v01/search/search/?key=${key}&q=${game.slug}&limit=20&region=us&country=US&shops=steam,amazonus`)
            setStoreDeals({gameTitle: game.name, gameBackGround: game.background_image, gameStoreData: request.data.data.list, gameSlug: game.slug});
        } catch (error) {
            alert("Something went wrong please try agin later")
        }
    }

    // Use the useEffect hook to update the favorite games to display based on the state
    useEffect(() => {
        if (favoriteGameInfo.length) {
            const gameToDisplay = favoriteGameInfo.map(game => {
                return (
                    <div key={game.id} onClick={() => fetchStoreData(game)}>
                        <GameInstance id={game.id} background_img={game.background_image}/>
                    </div>
                )
            })
            setFavoriteGameToDisplay(gameToDisplay)
        } else if (userLogin) {
            if (userLogin.data.favorite_games.length) {
                setFavoriteGameToDisplay(
                    <div className="loaderStore"></div>
                )
            }
        }
    }, [favoriteGameInfo, userLogin])

    // Determine which store details to display based on the state
    let storeDetailsToDisplay = ''
    if (storeDeals.messageToDisplay) {
        storeDetailsToDisplay = storeDeals.messageToDisplay
    } else if (storeDeals.spinner) {
        storeDetailsToDisplay = storeDeals.spinner
    } else {
        storeDetailsToDisplay = <StoreOptions storeDeals={storeDeals}/>
    }

    // Render the component's UI
    return (
        <div className="userProfileMain">
            <div className="profileContainer">
                <div className="leftContainer">
                    {favoriteGamesToDisplay}
                </div>
                <div className="rightContainer">
                    <div className="userInfo">
                        <UserInformation user={userLogin}/>
                    </div>
                    <div className="storeDeals">
                        {storeDetailsToDisplay}
                    </div>
                </div>
            </div>
        </div>
    )
}

// The useContext hook is used to access the state from the app context.
// The useEffect hook is used to redirect to the homepage if the user is not logged in. The userLogin and history variables are added as dependencies in the hook's array to re-run the effect when these variables change.
// The component initializes state for the favorite games and store deals using the useState hook.
// The fetchStoreData function is used to fetch store data using the ITAD API. It displays a loading spinner while fetching the data and updates the storeDeals state when the data is fetched.
// The useEffect hook is used to update the favoriteGamesToDisplay state based on the state of the favoriteGameInfo and userLogin variables.
// The component renders the user's favorite games, user information, and store details based on the state.