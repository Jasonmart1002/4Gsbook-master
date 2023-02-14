import React from 'react';
import './UserInformation.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSadCry} from '@fortawesome/free-solid-svg-icons';


function UserInformation(props) {

    console.log(props.user)

    return (
        <div>
            <div className="profileUserInfoContainer">
                <div className="avatar">
                    <div>
                        {props.user ? props.user.data.username : null}
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon icon={faSadCry} style={{fontSize: "35px"}}/>
                    <p>Work in progress ....</p>
                </div>
            </div>
        </div>
    )
}

export default UserInformation

// The UserInformation component takes a user prop.
// The console.log statement is used to log the user prop.
// The component's UI is returned using JSX. The UI consists of the user's avatar and name, as well as a message indicating that the user information is a work in progress.