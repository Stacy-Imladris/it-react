import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {FC} from 'react';

const maxLength50 = maxLengthCreator(50)

export type AddMessageFormDataType = {
    newMessageBody: string
}

const AddMessageForm: FC<InjectedFormProps<AddMessageFormDataType>> = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <div>
            <Field placeholder={'Enter your message'} name={'newMessageBody'}
                   component={Textarea} validate={[required, maxLength50]}/>
        </div>
        <div><button>Send message</button></div>
    </form>
)

export const AddMessageFormRedux = reduxForm<AddMessageFormDataType>({
    form: 'dialogAddMessageForm'
})(AddMessageForm)