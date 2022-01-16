import {RootStateType} from "../../redux/store";
import {connect} from "react-redux";
import {Sidebar} from "./Sidebar";
import {InitialStateType} from "../../redux/sidebar-reducer";
import {Dispatch} from "redux";

type MapStatePropsType = {
    sidebar: InitialStateType
}
type MapDispatchPropsType = {}

export type SidebarPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: RootStateType) => {
    return {
        sidebar: state.sidebar
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {}
}

export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);