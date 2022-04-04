import React from 'react';
import s from './FormsControls.module.css'
import {WrappedFieldProps} from 'redux-form';

const FormControl: React.FC<WrappedFieldProps & { placeholder?: string }> = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error

    return (
        <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps & { placeholder?: string }> = (props) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}
export const Input: React.FC<WrappedFieldProps & { placeholder?: string }> = (props) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}