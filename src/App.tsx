import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route, Routes} from "react-router-dom";
import {RootStateType} from "./redux/state";

type AppPropsType = {
    state: RootStateType
    addPost: (postText: string) => void
    changeNewText: (newText: string) => void
    addMessage: (messageForNewMessage: string) => void
    changeNewMessageText: (newTextMessage: string) => void
}

const App = (props: AppPropsType) => {

    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar state={props.state.sidebar}/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/dialogs' element={<Dialogs dialogsPage={props.state.dialogsPage}
                                                                 addMessageCallback={props.addMessage}
                                                                 changeNewMessageText={props.changeNewMessageText}
                        />}/>
                        <Route path='/profile' element={<Profile profilePage={props.state.profilePage}
                                                                 addPost={props.addPost}
                                                                 changeNewText={props.changeNewText}
                        />}/>
                    </Routes>
                </div>
            </div>
    );
}


export default App;
