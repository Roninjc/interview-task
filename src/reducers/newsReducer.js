import { types } from '../types/types';

const initialState = {
    news: []
}
export const newsReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.newsLoaded:
            return{
                ...state,
                news: [ ...action.payload ]
            }

        case types.newsDeleted:
            return {
                ...state,
                news: state.news.filter(
                    n => ( n.title !== action.payload )
                )
            }
    
        default:
            return state;
    }
}