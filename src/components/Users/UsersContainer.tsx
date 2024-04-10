import {useAppSelector} from 'redux/redux-store';
import {getIsFetching} from 'redux/users-selectors';
import {Preloader} from 'components/common/Preloader/Preloader';
import {Users} from './Users';

export const UsersPage = () => {
  const isFetching = useAppSelector(getIsFetching)

  return (
      <>
        {isFetching && <Preloader/>}
        <Users/>
      </>
  )
}
