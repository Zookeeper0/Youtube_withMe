import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";

const AuthForm = () => {
    const [email, setEamil] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onChange = (event) => {
        const {target: {name, value},
        } = event;
        if (name == "email") {
            setEamil(value);
        } else if ( name === "password" ) {
            setPassword(value); 
        }
    };

    const onSubmit = async(event) => {
        // submit 했을때 기본적으로 일어나는 페이지 새로고침 방지
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if(newAccount){
                //create account
                await createUserWithEmailAndPassword(
                    auth ,email, password
                    );
            } else {
                // log in
                await signInWithEmailAndPassword(
                    auth, email, password
                    );
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };
    return(
        <>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    required value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password" 
                    required 
                    value={password}
                    onChange={onChange}
                />
                <input 
                    type="submit" 
                    value={newAccount ? "Create Account" : "Sign In"}
                />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
        
    );
};

export default AuthForm;