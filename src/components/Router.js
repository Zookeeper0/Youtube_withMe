import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "../routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Notice from "routes/Notice";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <div
                        style={{
                            display: "flex", justifyContent: "center"
                        }}
                    >
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser} />
                        </Route>
                        <Route exact path="/notice">
                            <Notice userObj={userObj} refreshUser={refreshUser} />
                        </Route>
                    </div>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );

};

export default AppRouter;