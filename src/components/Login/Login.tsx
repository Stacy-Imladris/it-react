import {ChangeEvent, FC, useState} from 'react';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';
import {LoginFormDataType, LoginReduxForm} from './LoginForm';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../enums/paths';
import {LoginPayloadType} from '../../api/auth-api';

const Login: FC<LoginPropsType> = ({login, isAuth, captchaUrl}) => {
    const [captcha, setCaptcha] = useState<string>('')

    const onSubmit = (formData: LoginFormDataType) => login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        captcha
    })

    const onChangeSetCaptcha = (e: ChangeEvent<HTMLInputElement>) => {
        setCaptcha(e.currentTarget.value)
    }

    if (isAuth) return <Redirect to={PATH.PROFILE}/>

    return (
        <div>
            <h1>Login</h1>
            {captchaUrl && <><img src={captchaUrl}/>
                  <div><input value={captcha} onChange={onChangeSetCaptcha}/></div></>}
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: null | string
}
type MapDispatchPropsType = {
    login: (loginPayload: LoginPayloadType) => void
}
type LoginPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps, {login})(Login)