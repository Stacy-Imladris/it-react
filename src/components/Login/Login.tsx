import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';

export const Login = () => {

    let navigate = useNavigate()
    let isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    if(isAuth){
        navigate('/profile')
    }

    return <h1>LOGIN</h1>
}