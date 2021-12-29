import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {addMessage, addPost, changeNewMessageText, changeNewText, RootStateType} from "./redux/state";
import {BrowserRouter} from "react-router-dom";

export const renderTree = (state: RootStateType) => {
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