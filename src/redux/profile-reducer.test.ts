import {profileActions, ProfileInitialStateType, profileReducer} from './profile-reducer';

let profileStartState: ProfileInitialStateType

beforeEach(() => {
    profileStartState = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 3},
            {id: 2, message: 'It\'s my first post', likesCount: 23},
            {id: 3, message: 'Blabla', likesCount: 17},
            {id: 4, message: 'Dadada', likesCount: 99},
        ],
        profile: null,
        status: '',
        isEditMode: false,
    }
})

test('new post should be added', () => {
    const endState = profileReducer(profileStartState, profileActions.addPost('Imladris'))

    expect(endState.posts.length).toBe(5)
    expect(endState.posts[4].id).toBeDefined()
    expect(endState.posts[4].message).toBe('Imladris')
    expect(endState.posts[4].likesCount).toBe(0)
})

test('post with correct id should be deleted and posts\' length shouldn\'t be changed when id is incorrect', () => {
    const endState = profileReducer(profileStartState, profileActions.deletePost(1))

    expect(endState.posts.length).toBe(3)
    expect(endState.posts[0].id).toBe(2)

    const endState2 = profileReducer(profileStartState, profileActions.deletePost(100))

    expect(endState2.posts.length).toBe(4)
})