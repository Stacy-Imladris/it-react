import {connect} from "react-redux";
import {Sidebar} from "./Sidebar";
import {SidebarInitialStateType} from "../../redux/sidebar-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    sidebar: SidebarInitialStateType
}
type MapDispatchPropsType = {}

export type SidebarPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        sidebar: state.sidebar
    }
}

export const SidebarContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {})(Sidebar);