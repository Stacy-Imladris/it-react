import {Field, Form, Formik} from 'formik';
import {FilterType} from '../../redux/users-reducer';
import {memo} from 'react';
import {useAppSelector} from '../../redux/redux-store';
import {getUsersFilter} from '../../redux/users-selectors';

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = 'null' | 'true' | 'false';
type FormType = {
    term: string
    friend: FriendFormType
}

export const UsersSearchForm = memo(({onFilterChanged}: UsersSearchFormPropsType) => {
    const filter = useAppSelector(getUsersFilter)

    const usersSearchFormValidate = (values: FormType) => {
        const errors: FilterType = {} as FilterType;
        return errors;
    }

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>Find</button>
                </Form>
            )}
        </Formik>
    </div>
})