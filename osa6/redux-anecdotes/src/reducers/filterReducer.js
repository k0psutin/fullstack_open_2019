let initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.filter

    default:
      return state
  }
}

export const filterList = filter => {
  return {
    type: 'FILTER',
    filter
  }
}

export default reducer
