import React, {useState, useContext, useEffect} from 'react'
import './FollowButton.scss'
import {Context} from "../../Store/appContext"
import axios from "axios"

function FollowButton(props) {

    const {store, actions} = useContext(Context)
    const [follow,
        setFollow] = useState({isFollow: false, textToDisplay: "+ Follow", classToApply: "followButton"})
    const user = store.userLogin.data

    const {updateUser} = actions
    const {userLogin} = store
    const {game_id} = props

    useEffect(() => {
        if (userLogin) {
            const userFavoriteGameArr = userLogin.data.favorite_games;
            for (let game of userFavoriteGameArr) {
                if (game.game_url_id === game_id) {
                    setFollow({isFollow: true, textToDisplay: "Followed", classToApply: "followedButton"})
                }
            }
        }
    }, [userLogin, game_id, updateUser])

    const updateFavorites = async(action) => {
        const gameToSave = {
            game_url_id: props.game_id,
            game_name: props.game_name
        }
        if (action) {
            try {
                await axios.post(`https://games-api-4geeks.herokuapp.com/favorite/${user.id}`, gameToSave);
            } catch (error) {
                alert('Something went wrong please try again later')
            }
        } else {
            try {
                await axios.delete(`https://games-api-4geeks.herokuapp.com/favorite/${user.id}?game_url_id=${props.game_id}`)
            } catch (error) {
                alert('Something went wrong please try again later')
            }
        }
    }

    const handleClick = () => {
        if (!follow.isFollow) {
            setFollow({
                ...follow,
                isFollow: true,
                textToDisplay: "Followed",
                classToApply: "followedButton"
            })
            updateFavorites(true)
        } else {
            setFollow({
                ...follow,
                isFollow: false,
                textToDisplay: "+ Follow",
                classToApply: "followButton"
            })
            updateFavorites(false)
        }
    }

    const buttonToDisplay = store.userLogin
        ? <button className={follow.classToApply} onClick={handleClick}>{follow.textToDisplay}</button>
        : null

    return (
        <div className="FollowButtonContainer">
            {buttonToDisplay}
        </div>
    )
}

export default FollowButton
