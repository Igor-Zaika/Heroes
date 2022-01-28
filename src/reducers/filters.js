const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_ACTIVE_FILTERED':
            return {
                ...state,
                activeFilter: action.payload
            }
        case 'HEROES_FILTER_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'HEROES_FILTER_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'

            }
        case 'HEROES_FILTER_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        default: return state
    }
}

export default filters;