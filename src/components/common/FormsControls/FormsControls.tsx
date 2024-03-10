import s from './FormsControls.module.scss'
import {WrappedFieldProps} from 'redux-form';
import {FC} from 'react';

const FormControl: FC<WrappedFieldProps & { placeholder?: string }> = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error

    return (
        <div className={hasError ? s.error : ''}>
            <div>{children}</div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: FC<WrappedFieldProps & { placeholder?: string }> = (props) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: FC<WrappedFieldProps & { placeholder?: string }> = (props) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}
