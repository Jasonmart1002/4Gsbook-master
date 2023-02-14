import React, {useState, useEffect} from 'react';
import './StoreOptions.scss';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {faAmazon} from '@fortawesome/free-brands-svg-icons';
import {faSteam} from '@fortawesome/free-brands-svg-icons';

function StoreOption(props) {

    // Get the store deals data from the props.
    const {storeDeals} = props;

    // Initialize state to display store deals or a message if there are no deals available.
    const [storeDealsToOffer,
        setStoreDealsToOffer] = useState((
        <div style={{
            textAlign: "center"
        }}>
            <p>Sorry no deals on this game</p>
        </div>
    ));

    // Render the store deals data.
    const renderStoreData = (storeDeals) => {
        if (storeDeals.gameStoreData.length) {
            const storeDealsToDisplay = storeDeals
                .gameStoreData
                .map((offer, index) => {

                    // Set the logo based on the shop name.
                    const logo = offer.shop.name === 'Amazon'
                        ? <FontAwesomeIcon icon={faAmazon}/>
                        : <FontAwesomeIcon icon={faSteam}/>

                    // Determine whether to show the discounted price or the regular price.
                    let priceToShow = 0;
                    if (offer.price_new < offer.price_old) {
                        priceToShow = (
                            <div className="style-1">
                                <del>
                                    <span className="amount">$ {offer
                                            .price_old
                                            .toFixed(2)}</span>
                                </del>
                                <ins>
                                    <span className="amount">$ {offer
                                            .price_new
                                            .toFixed(2)}</span>
                                </ins>
                            </div>
                        )
                    } else {
                        priceToShow = `$ ${offer.price_new}`
                    }

                    // Render each offer.
                    return (
                        <a href={offer.urls.buy} key={index} target="_blank" rel="noopener noreferrer">
                            <div className="storeOptionOffer">
                                <div className="storeOptionLogo">{logo}</div>
                                <div className="storeOptionTitle">
                                    <div>{offer.title}</div>
                                </div>
                                <div className="storeOptionPrice">
                                    <div>{priceToShow}</div>
                                </div>
                            </div>
                        </a>
                    )
                })

            // Update the state with the store deals data.
            setStoreDealsToOffer(storeDealsToDisplay)
        }
    }

    // Use the useEffect hook to render the store deals data whenever the storeDeals prop changes.
    useEffect(() => {
        renderStoreData(storeDeals)
    }, [storeDeals])

    // Render the component's UI.
    return (
        <div className="storeOptions">
            <div className="StoreOptionsHeader">
                <div className="storeOptionTitle">
                    <p>{props.storeDeals.gameTitle}</p>
                </div>
                <div className="storeOptionIcon">
                    {props.storeDeals.gameTitle
                        ? (
                            <Link to={`/game_details/${props.storeDeals.gameSlug}`}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                            </Link>
                        )
                        : ''}
                </div>
            </div>
            <div className="StoreOptionsBody">
                {storeDealsToOffer}
            </div>
        </div>
    )
}

export default StoreOption;

// The useState hook is used to initialize state for the store deals data.
// renderStoreData is a function that maps through the store deals data and creates a JSX element for each deal.
// The useEffect hook is used to run the renderStoreData function whenever the storeDeals prop changes.
// The component's UI is returned using JSX. The UI consists of a title and icon for the game, as well as the store deals data or a message indicating that there are no deals available.