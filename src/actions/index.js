import fetch from 'cross-fetch' //用于发送ajax请求

//用户控制的action:
// 1. 选择标题
export const selectSubreddit = subreddit => {
  return {
    type:'SELECT_SUBREDDIT',
    subreddit
  }
}

//2.  点击刷新按钮更新列表
export const invalidSubreddit = subreddit => {
  return {
    type:'INVALID_SUBREDDIT',
    subreddit
  }
}

//网络请求控制的action
// 1.请求posts
export const requestPosts = subreddit => {
  return {
    type:'REQUEST_POSTS',
    subreddit
  }
}

// 2.获取到posts
export const receivePosts = (subreddit, json) => {
  return {
    type:'RECEIVE_POSTS',
    subreddit,
    posts:json.data.children.map(child => child.data),
    receivedAt:Date.now()
  }
}


//工具函数：
// 发送ajax请求
function fetchPosts (subreddit){
  // 传入dispatch 以便使用dispatch方法分发函数
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then( res => res.json()) //fetch里response自带的方法，把返回的res转换为json对象
    .then( json => dispatch(receivePosts(subreddit, json)) ) //把请求回的数据传递给receivePosts函数，并分发该函数
  }
}


//工具函数：
function shouldFetchPosts(state,subreddit) {
  const posts = state.postsBySubreddit[subreddit]  //
  if(!posts) {
    return true; //数据还未请求到，ifFetching 为true
  }else if(posts.isFetching) {
    return false; //数据已经请求成功
  }else {
    return posts.invalid //数据是否过期
  }
}


// 是否应该发送ajax请求获取数据
export const fetchPostsIfNeeded = subreddit => {
  return (dispatch, getState) => {  //传入dispatch getState 方法
    if(shouldFetchPosts(getState(),subreddit)) {
      return dispatch(fetchPosts(subreddit))  
    }
  }
}