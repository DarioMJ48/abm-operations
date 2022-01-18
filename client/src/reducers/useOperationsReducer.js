export const ACTIONS = {
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_ERROR: 'DELETE_ERROR'
}

const useOperationsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.DELETE_SUCCESS:
      return {
        loading: false,
        error: ''
      }
      break;
    case ACTIONS.DELETE_ERROR:
      return {
        loading: false,
        error: 'ERROR!'
      }
      break;
    default:
        throw new Error()
    }
}

export default useOperationsReducer
