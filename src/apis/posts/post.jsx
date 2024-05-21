import apiCall from '../../apis';
import {API_METHOD} from '../../constants/application.constant';

export const PostApi = {
    getWithPagination: async (queryString)  => {
        const endpoint = `/posts/?${queryString}`;
        return await apiCall(API_METHOD.GET, endpoint);
    },
    createComment: (postId, payload) => {
        const endpoint = `/posts/${postId}`;
        return apiCall(API_METHOD.PATCH, endpoint, payload);
    }
}