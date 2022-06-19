import {useAppSelector} from '../../redux/redux-store';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {getIsFetching} from '../../redux/users-selectors';

export const UsersPage = () => {
    const isFetching = useAppSelector(getIsFetching)

    return <>
        {isFetching && <Preloader/>}
        <Users/>
    </>
}