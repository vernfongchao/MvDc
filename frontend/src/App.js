import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom'
import Navigation from "./components/Navigation";
import { useDispatch } from 'react-redux'
import * as sessionActions from "./store/session";
import { useSelector } from 'react-redux'
import LandingPage from "./components/LandingPage";
import HomePage from "./components/Home";
import QuestionDetail from "./components/QuestionDetail";




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector(state => state.session.user);


  return isLoaded && (
    <>
      <Switch>
        <Route path exact={'/'}>
          {sessionUser ? [<Navigation isLoaded={isLoaded} />, <HomePage />] : <LandingPage />}
        </Route>
        <Route path={`/questions/:id`}>
          <Navigation isLoaded={isLoaded} />
          <QuestionDetail />
        </Route>
      </Switch>
    </>
  );
}

export default App;
