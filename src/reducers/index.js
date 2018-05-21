import { combineReducers } from 'redux'
// import { }

function selectedSubreddit(state='Reactjs',action){
  switch (action.type) {
    case 'SELECTED_SUBREDDIT':
      return action.subreddit
    default:
      return state
  }
}

export default selectedSubreddit