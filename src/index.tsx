import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import state, {subscribe} from "./redux/state";
import './index.css';
import App from "./App";
import {addMessage, addPost, changeNewMessageText, changeNewText} from "./redux/state";
import {BrowserRouter} from "react-router-dom";

const renderTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state}
                 addPost={addPost}
                 changeNewText={changeNewText}
                 addMessage={addMessage}
                 changeNewMessageText={changeNewMessageText}
            />
        </BrowserRouter>,
        document.getElementById('root'));
}

renderTree()

subscribe(renderTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
