import React, {useState} from "react";
import "./WelcomeJumbo.scss";
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import keyImage from "../../images/keys.png"

export function WelcomeJumbo(props) {

    const [signUpValues,
        setSignUpValues] = useState({username: "", password: "", confirmPassword: ""})

    const sigUpUser = async() => {
        const signUpData = {
            username: signUpValues.username,
            password: signUpValues.password
        }
        try {
            console.log(signUpData)
            const request = await axios.post('https://games-api-4geeks.herokuapp.com/sign_up', signUpData)
            console.log(request)
            alert(request.data.message)
        } catch (error) {
            alert('Sorry something went wrong try again later')
        }
    }

    // Form Validation needs improvement
    const handleSubmit = () => {
        for (let input in signUpValues) {
            if (signUpValues[input] === "") {
                return alert(`In order to sign up please provide a valid ${input}`)
            }
        }
        if (signUpValues.password !== signUpValues.confirmPassword) {
            return alert("Password confirmation fail check spelling")
        }
        sigUpUser()
    }

    const buttonClassAssignment = !props.user
        ? "btn btn-success btn-lg buttonShadow ripple"
        : "hidden"

    return (
        <div>
            <div className="jumbotron text-center">
                <div className="signUpButton">
                    <button
                        className={buttonClassAssignment}
                        href="/"
                        data-toggle="modal"
                        data-target="#signUpModal">
                        Sign up
                    </button>
                </div>
                <div>
                    <img src={keyImage} className="keyImage" alt="Disney key"/>
                </div>
            </div>
            <div
                className="modal fade"
                id="signUpModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="signUpModalTitle"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signUpModalTitle">
                                Sign up
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputUsername">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputUsername"
                                        aria-describedby="emailHelp"
                                        onChange={event => setSignUpValues({
                                        ...signUpValues,
                                        username: event.target.value
                                    })}
                                        value={signUpValues.username}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword2">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword2"
                                        onChange={event => setSignUpValues({
                                        ...signUpValues,
                                        password: event.target.value
                                    })}
                                        value={signUpValues.password}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail2">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputEmail2"
                                        aria-describedby="emailHelp"
                                        onChange={event => setSignUpValues({
                                        ...signUpValues,
                                        confirmPassword: event.target.value
                                    })}
                                        value={signUpValues.confirmPassword}/>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-dismiss="modal"
                                    onClick={handleSubmit}>
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
