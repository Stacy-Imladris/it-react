import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import React from 'react';
import {Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import s from './../common/FormsControls/FormsControls.module.css'

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = ({error, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'}
                       component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'}
                       component={Input} validate={[required]}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me
            </div>
            {error && <div className={s.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
export const LoginReduxForm = reduxForm<LoginFormDataType>({form: 'login'})(LoginForm)