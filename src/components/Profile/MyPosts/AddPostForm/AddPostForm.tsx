import {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from 'utils/validators/validators';
import {Textarea} from 'components/common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10)

export type AddPostFormDataType = {
    newPostBody: string
}

const addPostForm: FC<InjectedFormProps<AddPostFormDataType>> = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <div>
            <Field placeholder={'Enter your post'} name={'newPostBody'}
                   component={Textarea} validate={[required, maxLength10]}/>
        </div>
        <div><button>Add post</button></div>
    </form>
)

export const AddPostFormRedux = reduxForm<AddPostFormDataType>({
    form: 'profileAddPostForm'
})(addPostForm)