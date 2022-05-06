import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom'
import Navigation from "./components/Navigation";
import { useDispatch } from 'react-redux'
import * as sessionActions from "./store/session";
import { useSelector } from 'react-redux'
import LandingPage from "./components/LandingPage";
import HomePage from "./components/Home";
import QuestionDetail from "./components/Questions/QuestionDetail";
import Activity from "./components/Activity";
import ErrorPage from "./components/404";
import SearchPage from "./components/SearchBar/SearchPage";
import Footer from "./components/Footer";

import { getQuestions } from "./store/question";
import { getAnswers } from "./store/answer";
import { getComments } from "./store/comment";




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { (async() => {
    await dispatch(getQuestions())
    await dispatch(getAnswers())
    await dispatch(getComments())
    await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  })()
  }, [dispatch]);
  const sessionUser = useSelector(state => state.session.user);


  return isLoaded && (
    <>
      <Footer />
      <Switch>
        <Route exact path={'/'}>
          {sessionUser ? [<Navigation isLoaded={isLoaded} key={0} />, <HomePage key={1}/>] : <LandingPage />}
        </Route>
        <Route path='/activity'>
          <Navigation isLoaded={isLoaded} />
          <Activity />
        </Route>
        <Route path='/questions/:id'>
          <Navigation isLoaded={isLoaded} />
          <QuestionDetail />
        </Route>
        <Route path='/search' >
          <Navigation isLoaded={isLoaded} />
          <SearchPage />
        </Route>
        <Route>
          <Navigation isLoaded={isLoaded} />
          <ErrorPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
