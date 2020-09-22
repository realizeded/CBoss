import React from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Register from './pages/Registers';
import BossInfo from './pages/BossInfo';
import GeniusInfo from './pages/GeniusInfo';
import HashBoard from './pages/HashBoard';
import Chat from './pages/Chat';
function App(props) {
    return (
        <Provider store={store}>

            <BrowserRouter>
           
                <Auth/>
                <Switch>
                    <Route path="/geniusInfo" component={GeniusInfo}/>
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/register" exact component={Register}></Route>
                    <Route path="/chat" exact component={Chat}></Route>
                    <Route component={HashBoard}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
};
export default App;