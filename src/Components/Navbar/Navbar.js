import React, {useState, useContext} from "react";
import {NavLink, withRouter, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {faGamepad} from '@fortawesome/free-solid-svg-icons';
import {Context} from "../../Store/appContext";
import SearchRecom from "./SearchRecom/SearchRecom";
import "./Navbar.scss";
import axios from "axios";

function Navbar(props) {

    const {store, actions} = useContext(Context);
    const [loginInformation,
        setLoginInformation] = useState({username: "", password: ""});
    const [spinnerClass,
        setSpinnerClass] = useState('hidden');
    const [titlesRecommended,
        setTitleRecommended] = useState({recommendation: []})

    const loginUser = async() => {
        setSpinnerClass('visible')
        await actions.login(loginInformation)
        actions.loadFavoriteGameData()
        setSpinnerClass('hidden')
    }

    const logoutUser = () => actions.logout()

    const handleLogin = () => {
        for (let input in loginInformation) {
            if (loginInformation[input] === "") {
                return alert(`In order to log in please provide a valid ${input}`)
            }
        }
        loginUser()
    }

    const loadNewGame = (genre) => {
        const loadGenres = `genres=${genre}`
        actions.loadGameData(loadGenres)
    }

    const loginButtonHandler = () => {
        if (!store.userLogin) {
            return (
                <li className="nav-item">
                    <NavLink
                        className="nav-link ripple"
                        to="/"
                        data-toggle="modal"
                        data-target="#exampleModalCenter">
                        <FontAwesomeIcon
                            icon={faSignInAlt}
                            style={{
                            color: "white",
                            fontSize: "20px"
                        }}/>
                    </NavLink>
                </li>
            )
        } else {
            return (
                <li className="nav-item dropdown">
                    <Link
                        className="nav-link dropdown-toggle ripple userLogoutButton"
                        to="/"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            style={{
                            color: "rgb(255, 255, 255)"
                        }}/>
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link
                            className="dropdown-item"
                            to={`/profile/${loginInformation.username}`}
                            onClick={actions.updateUser}>
                            Profile
                        </Link>
                        <Link className="dropdown-item" to="/" onClick={logoutUser}>
                            Logout
                        </Link>
                    </div>
                </li>
            )
        }
    }

    const handleSearch = (event) => {
        const value = event.target.value;
        if (!value) {
            return null
        }
        let replaced = value
            .split(' ')
            .join('-')
            .toLowerCase();
        if (event.key === 'Enter') {
            props
                .history
                .push(`/game_details/${replaced}`)
        }
    }

    const handleChangeOnSearch = async(event) => {
        try {
            const inputCurrentValue = event.target.value;
            if (inputCurrentValue) {
                const requestData = await axios.get(`https://api.rawg.io/api/games?search=${inputCurrentValue}`)
                const arrayOfRequestDataOnlyFiveElements = requestData
                    .data
                    .results
                    .slice(0, 6)
                setTitleRecommended({
                    ...titlesRecommended,
                    recommendation: arrayOfRequestDataOnlyFiveElements
                })
            } else {
                setTitleRecommended({
                    ...titlesRecommended,
                    recommendation: []
                })
            }
        } catch (error) {
            alert("Something went wrong please try again later")
        }
    }

    const handleSearchBlur = () => {
        setTimeout(() => {
            setTitleRecommended({recommendation: []})
        }, 150)

    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars}/>
                </button>

                <div
                    className="collapse navbar-collapse navBarLinkContainer"
                    id="navbarSupportedContent">
                    <div>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink to="/" exact className="nav-link ripple">
                                    <FontAwesomeIcon
                                        icon={faHome}
                                        style={{
                                        color: "white",
                                        fontSize: "20px"
                                    }}/>
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle ripple"
                                    href="http:#.com"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <FontAwesomeIcon
                                        icon={faGamepad}
                                        style={{
                                        color: "white",
                                        fontSize: "20px"
                                    }}/>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/" onClick={() => loadNewGame('action')}>
                                        Action
                                    </Link>
                                    <Link className="dropdown-item" to="/" onClick={() => loadNewGame('puzzle')}>
                                        Puzzle
                                    </Link>
                                    <Link className="dropdown-item" to="/" onClick={() => loadNewGame('adventure')}>
                                        Adventure
                                    </Link>
                                    <Link className="dropdown-item" to="/" onClick={() => loadNewGame('sports')}>
                                        Sports
                                    </Link>
                                    <Link className="dropdown-item" to="/" onClick={() => loadNewGame('strategy')}>
                                        Strategy
                                    </Link>
                                </div>
                            </li>
                            {loginButtonHandler()}
                            <li className={`nav-item ${spinnerClass}`}>
                                <NavLink to="/" exact className="nav-link ripple">
                                    <div className="loader_2"></div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="searchContainer">
                        <form className="form-inline my-2 my-lg-0">
                            <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search"
                                id="search"
                                aria-label="Search"
                                autoComplete="off"
                                onBlur={handleSearchBlur}
                                onKeyDown={event => {
                                handleSearch(event)
                            }}
                                onChange={event => {
                                handleChangeOnSearch(event)
                            }}/>
                        </form>
                        <div className="searchResult">
                            <SearchRecom gamesRecommended={titlesRecommended.recommendation}/>
                        </div>
                    </div>

                </div>
            </nav>
            <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">
                                Login
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Username</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        onChange={event => setLoginInformation({
                                        ...loginInformation,
                                        username: event.target.value
                                    })}
                                        value={loginInformation.username}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={event => setLoginInformation({
                                        ...loginInformation,
                                        password: event.target.value
                                    })}
                                        value={loginInformation.password}/>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-dismiss="modal"
                                    onClick={handleLogin}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Navbar)