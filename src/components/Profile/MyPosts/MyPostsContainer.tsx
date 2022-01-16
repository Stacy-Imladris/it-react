import MyPosts from "./MyPosts";
import {addPostAC, ChangeNewTextAC, PostType} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = {
    posts: Array<PostType>,
    messageForNewPost: string
}
type MapDispatchPropsType = {
    updateNewPostText: (text: string) => void
    addPost: (messageForNewPost: string) => void
}

export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        messageForNewPost: state.profilePage.messageForNewPost
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewPostText: (text: string) => {dispatch(ChangeNewTextAC(text))},
        addPost: (messageForNewPost: string) => {dispatch(addPostAC(messageForNewPost))}
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);