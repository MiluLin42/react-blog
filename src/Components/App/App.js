import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext, LoadingContext } from "../../contexts";
import { getAuthToken } from "../../utils";
import { getMe } from "../../WebAPI";
import LoadingPage from "../../pages/LoadingPage";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/Homepage";
import Header from "../Header";
import PostPage from "../../pages/PostPage";
import ListPage from "../../pages/ListPage";
import NewPostPage from "../../pages/NewPostPage";
import AboutPage from "../../pages/AboutPage";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!getAuthToken()) return;
    getMe().then((response) => {
      if (response.ok) {
        setUser(response.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <Root>
          <Router>
            <Header />
            {isLoading && <LoadingPage />}
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/posts/:id">
                <PostPage />
              </Route>
              <Route path="/list">
                <ListPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/new-post">
                <NewPostPage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
            </Switch>
          </Router>
        </Root>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
