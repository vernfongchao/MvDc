import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom'
import Navigation from "./components/Navigation";
import { useDispatch } from 'react-redux'
import * as sessionActions from "./store/session";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";
import { useSelector } from 'react-redux'
import LandingPage from "./components/LandingPage";




function App() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Switch>
        <Route path exact={'/'}>
          {!sessionUser && <LandingPage />}
          {/* {!sessionUser && <LoginForm />}
          {!sessionUser && <SignupForm />} */}
          {/* {isLoaded ? <LandingPage /> : <HomePage />} */}

          {sessionUser && <Navigation isLoaded={isLoaded} />}
        </Route>
        <Route path={'/login'}>
          <Navigation isLoaded={isLoaded} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
