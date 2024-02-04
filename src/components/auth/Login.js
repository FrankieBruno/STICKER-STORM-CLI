import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";
import "./Auth.css";


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (ev) => {
        ev.preventDefault()
        try {
            const user = {
                username: username.current.value,
                password: password.current.value
            }
            loginUser(user)
                .then(res => {
                    if ("valid" in res && res.valid && "token" in res) {
                        localStorage.setItem("st_token", res.token)
                        navigate("/")
                    }

                })
                .catch(err => {
                    console.error(err)
                    invalidDialog.current.showModal()
                })
        }
        catch (er) {
            console.log("formsubmission error")
        }
    }

    return <main>
        <dialog className="dialog dialog--auth" ref={invalidDialog}>
            <div>Username or password was not valid.</div>
            <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
        </dialog>
        <div className="login">
            <div className="leftView">
                <img src='/stickerstormlogo.png' alt='sticker storm logo' />
            </div>

            <div className="rightView">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="text-center">Make a new sticker</h1>
                    <div className="form-control">
                        <input ref={username} type="username" className="form-input" id="username" placeholder="Username" required autoFocus />
                    </div>
                    <div className="form-control">
                        <input ref={password} type="password" className="form-input" id="password" placeholder="Password" required />
                    </div>
                    <div className="form-actions">
                        <Link className="register-link" to="/register" >Create an account</Link>
                        <button className="submitbutton" type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
        <div className='previousprints'>
            <div className='previousprintstext'>
                <span className="previousprintstitle">PREVIOUS PRINTS</span>
                <span className="previousprintsitem selected">
                    <span className="previousprintslabel">1. </span>
                    Alien prints
                </span>
                <span className="previousprintsitem">
                    <span className="previousprintslabel">2. </span>
                    Animal prints
                </span>
                <span className="previousprintsitem">
                    <span className="previousprintslabel">3. </span>
                    National park prints
                </span>
            </div>
            <img src='/previousprints.png' alt='example of stickers' />
        </div>
    </main>;
};
