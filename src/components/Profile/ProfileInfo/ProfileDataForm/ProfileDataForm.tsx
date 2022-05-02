import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input, Textarea} from '../../../common/FormsControls/FormsControls';
import s from '../../../common/FormsControls/FormsControls.module.scss';
import {FC} from 'react';
import {ContactType} from '../../../../api/profile-api';

export type ProfileDataFormPropsType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ContactType
}

const ProfileDataForm: FC<InjectedFormProps<ProfileDataFormPropsType>> = ({
                                                                              handleSubmit,
                                                                              error,
                                                                              initialValues
                                                                          }) => {
    const contactsEntries = Object.entries(initialValues.contacts || {})

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save changes</button>
            </div>
            {error && <div className={s.formSummaryError}>{error}</div>}
            <div>
                <b>Full name</b>:
                <div>
                    <Field placeholder={'Full name'} name={'fullName'}
                           component={Input} validate={[]}/>
                </div>
                <b>About me</b>:
                <div>
                    <Field placeholder={'About me'} name={'aboutMe'}
                           component={Textarea} validate={[]}/>
                </div>
                <b>Looking for a job</b>:
                <div>
                    <Field name={'lookingForAJob'} component={Input}
                           validate={[]} type={'checkbox'}/>
                </div>
                <b>My professional skills</b>:
                <div>
                    <Field placeholder={'My professional skills'}
                           name={'lookingForAJobDescription'}
                           component={Textarea} validate={[]}/>
                </div>
                <b>Where you can find me</b>:
                {
                    contactsEntries.map(m => (
                        <div key={m[0] + m[1]}>
                            <div>{m[0]}:</div>
                            <div>
                                <Field name={`contacts.${m[0]}}`} component={Input}
                                       validate={[]}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </form>
    )
}

export const ProfileDataReduxForm = reduxForm<ProfileDataFormPropsType>({
    form: 'edit-profile'
})(ProfileDataForm)