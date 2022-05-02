/*import {NavigateFunction, Params, useLocation, useNavigate, useParams} from 'react-router-dom';

// export function ProfileWithParam() {
//     const match: Params<string> = useParams<string>();
//
//     return <ProfileContainer match={match}/>
// }
export type RouterType = {
    router: {
        location: Location
        navigation:  NavigateFunction
        params:  Readonly<Params<string>>
    }
}
export function withRouter<T>(Component:any)  {
    function ComponentWithRouterProps (props: any): JSX.Element {
        let location = useLocation();
        let navigation = useNavigate();
        let params = useParams()
        return <Component {...props} router={{location, navigation, params}}/>
    }
    return <ComponentWithRouterProps />
}*/
export {}