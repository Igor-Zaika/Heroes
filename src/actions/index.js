export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDeleted = (id) => {
    return {
        type: 'HEROES_DELETED',
        payload: id
    }
}

export const heroesCreated = (hero) => {
    return {
        type: 'HEROES_CREATED',
        payload: hero
    }
}

export const heroesActiveFiltered = (filter) => {
    return {
        type: 'HEROES_ACTIVE_FILTERED',
        payload: filter
    }
}

export const filtersFetching = () => {
    return {
        type: 'HEROES_FILTER_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'HEROES_FILTER_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'HEROES_FILTER_FETCHING_ERROR'
    }
}