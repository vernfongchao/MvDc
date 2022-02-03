import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom'
import SignupForm from './components/SignupForm'
import Navigation from "./components/Navigation";
import { useDispatch } from 'react-redux'
import * as sessionActions from "./store/session";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route path='/signup'>
          <SignupForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
