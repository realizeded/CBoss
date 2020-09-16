import React from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import {BrowserRouter,Route} from 'react-router-dom';
import Auth from './pages/Auth';
import Login from './pages/Login/index';
import Register from './pages/Registers/index';
function App(props) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={Auth}/>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/Register" exact component={Register}></Route>
            </BrowserRouter>
        </Provider>
    )
};
export default App;