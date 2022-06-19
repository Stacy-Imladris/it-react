import {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {useAppSelector} from '../../redux/redux-store';
import {LoginFormDataType, LoginReduxForm} from './LoginForm';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../enums/paths';

export const LoginPage = () => {
    const [captcha, setCaptcha] = useState<string>('')

    const captchaUrl = useAppSelector(state => state.auth.captchaUrl)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormDataType) => {
        dispatch(login({
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe,
            captcha
        }))
    }

    const onChangeSetCaptcha = (e: ChangeEvent<HTMLInputElement>) => {
        setCaptcha(e.currentTarget.value)
    }

    if (isAuth) return <Redirect to={PATH.PROFILE}/>

    return (
        <div>
            <h1>Login</h1>
            {captchaUrl && <><img src={captchaUrl} alt={'captcha'}/>
                  <div><input value={captcha} onChange={onChangeSetCaptcha}/></div></>}
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}