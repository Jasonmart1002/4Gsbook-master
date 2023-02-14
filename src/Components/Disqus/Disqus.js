import React from "react";
import {withRouter} from 'react-router-dom'
import Disqus from "disqus-react";
import "./Disqus.scss";

function Article(props) {
    const disqusShortName = "game-forum"; 
    const disqusConfig = {
        url: `http://localhost:3000${props.location.pathname}`, 
        identifier: props.articleId,
        title: props.articleTitle
	};
    return (
        <div>
            <Disqus.DiscussionEmbed shortname={disqusShortName} config={disqusConfig}/>
        </div>
    );
}
export default withRouter(Article) 