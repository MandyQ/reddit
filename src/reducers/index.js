import { combineReducers } from 'redux'
import { selectSubreddit, invalidSubreddit, requestPosts, receivePosts } from '../actions'

function selectedSubreddit(state='Reactjs',action){
  switch (action.type) {
    case 'SELECTED_SUBREDDIT':
      return action.subreddit
    default:
      return state
  }
}


// isFetching:显示进度条
// invalid:标记数据是否过期
// lastUpdated:存放数据最后的更新时间
// items 存放列表信息
// （数据多的情况下还需 fetchPageCount, nextPageUrl）

function posts( state={isFetching:false, invalid:false, items:[]}, action ) { //给state设置默认值
  console.log(state)
  switch ( action.type ) {
    case 'INVALID_SUBREDDIT':
      return Object.assign( {}, state, {invalid:true} )
    case 'REQUEST_POSTS':
      return Object.assign( {}, state, {isFetching:true} )
    case 'RECEIVE_POSTS':
      return Object.assign( {}, state, {items:action.posts, lastUpdated:action.receivedAt} )
    default:
      return state
  }
}

function postsBySubreddit(state={}, action) {
  switch ( action.type ) {
    case 'INVALID_SUBREDDIT':
    case 'REQUEST_POSTS':
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {[action.subreddit] : posts(state[action.subreddit], action)} )  
      //postsBySubreddit是基于selectedSubreddit返回的数据，所以应该return 对应的posts数据
    default:
      return state
  }
}


const rootReducer = combineReducers({
  selectedSubreddit,
  postsBySubreddit
})

export default rootReducer