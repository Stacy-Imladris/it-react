import {
    follow,
    unfollow,
    usersActions,
    UsersInitialStateType,
    usersReducer
} from './users-reducer';
import {ResponseType} from '../api/api';
import {ResultCodes} from '../enums/resultCodes';
import {followAPI} from '../api/follow-api';

jest.mock('../api/follow-api', () => {
    return {
        followAPI: jest.fn(),
    }
})
// const followAPIMock = followAPI as jest.Mocked<typeof followAPI>

const result: ResponseType = {
    data: {},
    fieldsErrors: [],
    messages: [],
    resultCode: ResultCodes.Success,
}


followAPI.followUser = jest.fn().mockResolvedValueOnce(result)
followAPI.unfollowUser = jest.fn().mockResolvedValueOnce(result)


//followAPIMock.unfollowUser.mockResolvedValueOnce(result)

let state: UsersInitialStateType
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

describe('user reducer tests', () => {
    beforeEach(() => {
        state = {
            users: [
                {
                    id: 0, name: 'Stacy', uniqueUrlName: 'url0', followed: false,
                    photos: {small: null, large: null}, status: 'status 0',
                },
                {
                    id: 1, name: 'Alex', uniqueUrlName: 'url1', followed: false,
                    photos: {small: null, large: null}, status: 'status 1',
                },
                {
                    id: 2, name: 'Alice', uniqueUrlName: 'url1', followed: true,
                    photos: {small: null, large: null}, status: 'status 3',
                },
                {
                    id: 3, name: 'Tanya', uniqueUrlName: 'url1', followed: true,
                    photos: {small: null, large: null}, status: 'status 4',
                },
            ],
            pageSize: 5,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: [],
        }
        // dispatchMock.mockClear()
        // getStateMock.mockClear()
        // followAPIMock.followUser.mockClear()
        // followAPIMock.unfollowUser.mockClear()
    })

    test('follow success', () => {
        const newState = usersReducer(state, usersActions.followSuccess(1))

        expect(newState.users[0].followed).toBeFalsy()
        expect(newState.users[1].followed).toBeTruthy()
    })

    test('unfollow success', () => {
        const newState = usersReducer(state, usersActions.unfollowSuccess(3))

        expect(newState.users[2].followed).toBeTruthy()
        expect(newState.users[3].followed).toBeFalsy()
    })

    test('success follow thunk', async () => {
        followAPI.followUser = jest.fn().mockResolvedValueOnce(result)

        const thunk = follow(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenCalledWith(usersActions.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenCalledWith(usersActions.followSuccess(1))
        expect(dispatchMock).toHaveBeenCalledWith(usersActions.toggleFollowingProgress(false, 1))
    })

    test('success unfollow thunk', async () => {
        followAPI.unfollowUser = jest.fn().mockResolvedValueOnce(result)

        const thunk = unfollow(3)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenCalledWith( usersActions.toggleFollowingProgress(true, 3))
        expect(dispatchMock).toHaveBeenCalledWith( usersActions.unfollowSuccess(3))
        expect(dispatchMock).toHaveBeenCalledWith( usersActions.toggleFollowingProgress(false, 3))
    })
})