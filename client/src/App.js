import React from 'react';
import NavBar from './components/Header/NavBar';
import Posts from './components/AllPost/Posts';
import NewPost from './components/AllPost/NewPost';
import SignUp from './components/SignUp/SignUp';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import './App.css';

const App = () => {
  const {isLoginMode, isLogin} = useSelector(state => state)
  console.log(isLoginMode)
  return (
      <BrowserRouter>
        <NavBar/>
          <Switch>
            <Route exact path="/" component={Posts}/>
            {!isLoginMode ?
              <Route path="/sign" component={SignUp}/>
            :
              <Route path="/login" component={SignUp}/>
            }
            {isLogin ?
            <Route path="/add-post" component={NewPost}/>
            :
            <Redirect to="/"/>
            }
            <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
