// Initial State
const initialState = {
    loading: true,
    locations: {}
};

// Types
export const GET_HOME_WEATHERS = 'GET_HOME_WEATHERS';
export const LOADING_WEATHER = 'LOADING_WEATHER';
export const CLEAR_LOCATIONS = 'CLEAR_LOCATIONS';

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_WEATHER:
            return {
                ...state,
                loading: typeof(action.payload.loading) !== 'undefined' ? action.payload.loading : true
            };
        case CLEAR_LOCATIONS:
            return {
                ...state,
                locations: {}
            };
        case GET_HOME_WEATHERS:
            let locations = {};

            for (let woeid in state.locations) {
                if (state.locations.hasOwnProperty(woeid)) {
                    locations[woeid] = state.locations[woeid]
                }
            }

            if (typeof(action.payload['woeid']) !== 'undefined') {
                locations[action.payload['woeid']] = action.payload['location'];
            }

            return {
                ...state,
                locations: locations
            };
        default:
            return {
                ...state
            }
    }
};