import React from "react"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Home from "./components/Home/Home";
import Person from "./components/Person/Person";
import Lister from "./components/Lister/Lister";
import Planet from "./components/Planet/Planet";
import Starship from "./components/Starship/Starship";
import Error_404 from "./components/Error 404/Error_404";
import {toggleAuth} from "./actions/authActions";

const App = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.isAuth).isAuth

  const jwt = localStorage.jwt
  if (jwt !== undefined && isAuth === false ) {
    dispatch(toggleAuth())
  }

  return <div className="App">
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/people' component={isAuth ? Lister : Home}/>
          <Route exact path='/planets' component={isAuth ? Lister : Home}/>
          <Route exact path='/starships' component={isAuth ? Lister : Home}/>
          <Route path='/people/:id' component={isAuth ? Person : Home}/>
          <Route path='/planets/:id' component={isAuth ? Planet : Home}/>
          <Route path='/starships/:id' component={isAuth ? Starship : Home}/>
          <Route path='/404' component={Error_404}/>
        </Switch>
      </div>
    </Router>
  </div>
}

export default App
