import jsonPaceholder from '../api/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));
};

export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPaceholder.get('/posts');
        
        dispatch({ type: 'FETCH_POSTS', payload: response.data})
    }
};

export const fetchUser = id => async dispatch => {
    const response = await jsonPaceholder.get('/users/' + id);
        
     dispatch({ type: 'FETCH_USER', payload: response.data})
}

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPaceholder.get('/users/' + id);
        
//     dispatch({ type: 'FETCH_USER', payload: response.data})
// });

// export const fetchUser = (id) => {
//     return (dispatch) => {
//         _fetchUser(id, dispatch);
//     }
// };



