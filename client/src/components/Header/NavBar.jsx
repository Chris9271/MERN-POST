import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import './NavBar.css';

const NavBar = () => {
    const {isLogin, isLoginMode} = useSelector(state => state);
    console.log('Login:', isLogin)
    const dispatch = useDispatch();
    const handleLogOut = async() => {
        try{
            dispatch({type: "LOGOUT"})
            console.log('Login:', isLogin)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <nav className="navbar navbar-inverse">
            <div className="container">
                <div className="navbar-header">
                    {/* bootstrap 的 hamburger menu */}
                    <button 
                        type="button"
                        className="navbar-toggle"
                        data-toggle="collapse"
                        data-target="#nav-bar"
                        aria-expanded="false"
                        >
                        <span className="sr-only">Toggle Menu</span> {/* 無障礙網頁螢幕閱讀器用 */}
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <NavLink className="navbar-brand" to="/">Photo Sharing</NavLink>
                </div>
                <div className="collapse navbar-collapse" id="nav-bar">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            {isLogin ? 
                            <NavLink to="/add-post">Add Post</NavLink>
                            : null}
                        </li>
                        <li>
                            {!isLogin && !isLoginMode ? 
                            <NavLink to="/sign"><span className="glyphicon glyphicon-user"></span> SignUp</NavLink>
                            : 
                            !isLogin && isLoginMode ? 
                            <NavLink to="/login"><span className="glyphicon glyphicon-user"></span> SignUp</NavLink>
                            :
                            <button onClick={handleLogOut} className="nav-btn"><span className="glyphicon glyphicon-log-out"></span>&nbsp;SignOut</button>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
