import {dialogsActions, DialogsInitialStateType} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {ComponentType} from 'react';

type MapStatePropsType = {
    dialogsPage: DialogsInitialStateType
}
type MapDispatchPropsType = {
    addMessage: (message: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    dialogsPage: state.dialogsPage,
})

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
        mapStateToProps, {addMessage: dialogsActions.addMessage}),
    withAuthRedirect
)(Dialogs)