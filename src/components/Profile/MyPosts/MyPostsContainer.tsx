import MyPosts from "./MyPosts";
import {actions, PostType} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

type MapStatePropsType = {
    posts: Array<PostType>,
    messageForNewPost: string
}
type MapDispatchPropsType = {
    changeNewText: (text: string) => void
    addPost: (messageForNewPost: string) => void
}

export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        messageForNewPost: state.profilePage.messageForNewPost
    }
}

export const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    changeNewText: actions.changeNewText, addPost: actions.addPost})(MyPosts);