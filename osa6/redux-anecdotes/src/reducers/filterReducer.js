const initialState = ''

const reducer = (state = initialState, action) => {
  console.log(action.filter)
  switch (action.type) {
    case 'FILTER':
      return (state = action.filter)
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
