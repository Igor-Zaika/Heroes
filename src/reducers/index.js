const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ? 
                                action.payload :
                                action.payload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETED':
            const newHeroes = state.heroes.filter(item => item.id !== action.payload)
            return {
                ...state,
                heroes: newHeroes,
                filteredHeroes: state.activeFilter === 'all' ?
                                newHeroes :
                                newHeroes.filter(item => item.element === state.activeFilter)

            }
        case 'HEROES_CREATED':
            const createdHeroes = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: createdHeroes,
                filteredHeroes: state.activeFilter === 'all' ?
                                createdHeroes : 
                                createdHeroes.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_ACTIVE_FILTERED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                                state.heroes :
                                state.heroes.filter(item => item.element === action.payload)
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

export default reducer;