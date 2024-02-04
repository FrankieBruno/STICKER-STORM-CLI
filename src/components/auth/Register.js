import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import "./Auth.css";

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "password": password.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("st_token", res.token)
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return <main style={{ textAlign: "center" }}>
        <dialog className="dialog dialog--password" ref={passwordDialog}>
            <div>Passwords do not match</div>
            <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
        </dialog>

        <form className="text-white form--login" onSubmit={handleRegister}>
            <h1 className="mb-3 text-center h3 font-weight-normal">Register an account</h1>
                <label htmlFor="firstName"> First Name </label>
            <div className="form-control">
                <input ref={firstName} type="text" name="firstName" className="form-input" placeholder="First name" required autoFocus />
            </div>
                <label htmlFor="lastName"> Last Name </label>
            <div className="form-control">
                <input ref={lastName} type="text" name="lastName" className="form-input" placeholder="Last name" required />
            </div>
                <label htmlFor="inputUsername">Username</label>
            <div className="form-control">
                <input ref={username} type="text" name="username" className="form-input" placeholder="Username" required />
            </div>
                <label htmlFor="inputPassword"> Password </label>
            <div className="form-control">
                <input ref={password} type="password" name="password" className="form-input" placeholder="Password" required />
            </div>
                <label htmlFor="verifyPassword"> Verify Password </label>
            <div className="form-control">
                <input ref={verifyPassword} type="password" name="verifyPassword" className="form-input" placeholder="Verify password" required />
            </div>
            <div style={{
                textAlign: "center"
            }}>
                <div className="py-5 m-8 mx-40 text-center ring">
                <button className="submitbutton" type="submit">Register</button>
                </div>
            </div>
        </form>
        <section className="m-4 text-white link--register">
            Already registered? <Link to="/login">Login</Link>
        </section>
    </main>;
}
