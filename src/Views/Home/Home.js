import React, {useContext, useEffect} from "react";
import "./Home.scss";
import { WelcomeJumbo } from "../../Components/WelcomeJumbo/WelcomeJumbo";
import { TopicTable } from "../../Components/TopicTable/TopicTable";
import {Context} from "../../Store/appContext";

export const Home = () => {

    // Get the state and actions from the app context using the useContext hook
    const {actions, store} = useContext(Context);
    const {loadGameData} = actions;

    // Use the useEffect hook to call the loadGameData action when the component is mounted
    useEffect(() => {
        loadGameData()
    },[loadGameData])

    // Render the component's UI
    return (
        <div>
            <WelcomeJumbo user={store.userLogin}/>
            <TopicTable />
        </div>
    );
};

// The useContext hook is used to access the state and actions from the app context.
// The useEffect hook is used to call the loadGameData action when the component is mounted. The loadGameData function is added as a dependency in the hook's array to prevent unnecessary re-renders.
// The component renders the WelcomeJumbo and TopicTable components.