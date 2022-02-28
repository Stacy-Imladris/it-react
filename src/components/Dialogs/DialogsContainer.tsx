import {actions, InitialStateType} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    dialogsPage: InitialStateType
    isAuth: boolean
}
type MapDispatchPropsType = {
    changeNewMessageText: (body: string) => void
    addMessage: (message: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

export const DialogsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    changeNewMessageText: actions.changeNewMessageText, addMessage: actions.addMessage})(Dialogs);