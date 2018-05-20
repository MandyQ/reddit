import { combineReducers } from 'redux'
// import { }

let selectedSubreddit = (state='Reactjs',action) =>{
  switch (action.type) {
    case 'SELECTED_SUBREDDIT':
      return action.selectedSubreddit
    default:
      return state
  }
}