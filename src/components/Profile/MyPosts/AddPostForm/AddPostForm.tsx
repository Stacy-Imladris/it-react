import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../../utils/validators/validators';
import React from 'react';
import {Textarea} from '../../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10)

export type AddPostFormDataType = {
    newPostBody: string
}

const addPostForm: React.FC<InjectedFormProps<AddPostFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Enter your post'} name={'newPostBody'}
                       component={Textarea} validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddPostFormRedux = reduxForm<AddPostFormDataType>({form: 'profileAddPostForm'})(addPostForm)