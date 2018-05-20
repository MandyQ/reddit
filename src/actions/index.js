import fetch from 'cross-fetch' //用于发送ajax请求

export function selectSubreddit(subreddit) {
  return {
    type:'SELECT_SUBREDDIT',
    subreddit
  }
}