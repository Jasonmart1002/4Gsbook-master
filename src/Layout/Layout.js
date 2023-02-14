import React from "react";
import './Layout.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "../Views/Home/Home";
import {Profile} from "../Views/Profile/Profile";
import {GameDetails} from "../Views/GameDetails/GameDetails";
import {Footer} from "../Components/Footer/Footer";
import {Error404} from "../Components/404/404";
import YoutubePlayer from "../Components/YoutubePlayer/YoutubePlayer"
import Navbar from "../Components/Navbar/Navbar";
import ScrollTop from "../Components/ScrollTop/ScrollTop";
import injectContext from "../Store/appContext";

export const Layout = () => {

    return (
        <div className="Layout">
            <div id="bg"></div>
            <BrowserRouter>
                <ScrollTop>
                <Navbar/>
                    <Switch>
                        <Route path="/profile/:username" component={Profile}/>
                        <Route path="/game_details/:slug/:id/youtube" component={YoutubePlayer}/>
                        <Route path="/game_details/:slug" component={GameDetails}/>
                        <Route exact path="/" component={Home}/>
                        <Route component={Error404}/>
                    </Switch>
                <Footer/>
                </ScrollTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
