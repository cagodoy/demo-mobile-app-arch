import {Map} from 'immutable'

export const RESET_STATE = 'SessionState/RESET'
export const INITIALIZE_STATE = 'SessionState/INITIALIZE'
// --end-actions-types--

export const resetSessionStateFromSnapshot = (state) => ({
  type: RESET_STATE,
  payload: state,
})
export const initializeSessionState = () => ({
  type: INITIALIZE_STATE,
  payload: {},
})
// --end-actions-creators--

const INITIAL_STATE = Map({
  isReady: false,
  // --end-initial-state--
})


export default function SessionStateReducer (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case INITIALIZE_STATE:
    case RESET_STATE: {
      return state.set('isReady', true)
    }
    // --end-reducers--

    default:
      return state
  }
}
