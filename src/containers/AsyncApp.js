import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Picker from '../components/Picker' 
import Posts from '../components/Posts'

import { selectSubreddit, invalidSubreddit, fetchPostsIfNeeded } from '../actions'


class AsyncApp extends Component {
	// 子组件向父组件通信
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)	
		this.handleRefreshClick = this.handleRefreshClick.bind(this)
	}
	componentDidMount(){  // 在第一次渲染后调用(真实的DOM被渲染出来后调用)
		//首页加载时发送请求获取数据

		const { dispatch, selectedSubreddit } = this.props

		 dispatch(invalidSubreddit(selectedSubreddit)) //点击刷新列表
		dispatch(fetchPostsIfNeeded(selectedSubreddit)) //是否发送请求获取数据
	}

	componentWillReceiveProps(nextProps){ // 在组件接收到一个新的 prop (更新后)时被调用 
		//select框更换标题		
		if(nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
			const {dispatch, selectedSubreddit} = nextProps
			dispatch(fetchPostsIfNeeded(selectedSubreddit)) //是否发送请求获取数据
		}
	}

	handleChange(nextSubreddit) {
		this.props.dispatch(selectSubreddit(nextSubreddit))
	}

	handleRefreshClick(e) {
		e.preventDefault()

		const { dispatch, selectedSubreddit } = this.props

		dispatch(invalidSubreddit(selectedSubreddit)) //点击刷新列表
		dispatch(fetchPostsIfNeeded(selectedSubreddit)) //是否发送请求获取数据
	}

	render() {
		const { selectedSubreddit, lastUpdated, posts, isFetching} = this.props

		return (
			<div>
				<Picker value={selectedSubreddit} 
								onChange={this.handleChange} 
								options={['Reactjs','Frontend']} />	
				<p>
					{lastUpdated &&
						<span> Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span> 					
					}
					  {/* 请求未完成之前 Refresh按钮 隐藏 */}
					{!isFetching && 
						<a href="javacript:;" onClick={this.handleRefreshClick}>Refresh</a>
					}				
				</p>
				{isFetching && posts.length === 0 &&
					<h2>Loading...</h2>
				}
				{!isFetching && posts.length === 0 &&
					<h2>Ooops~  empty</h2>
				}
				{posts.length > 0  &&
					<div style={{ opacity: isFetching ? 0.5 :1 }}>
						<Posts posts={posts} /> 					
					</div>	
				}						
			</div>			
		)
	}
}


// 给组件内的每一个变量进行类型检测
AsyncApp.propTypes = {
	selectedSubreddit:PropTypes.string.isRequired,
	lastUpdated:PropTypes.number,
	isFetching:PropTypes.bool.isRequired,
	posts:PropTypes.array.isRequired,
	dispatch:PropTypes.func.isRequired
}


//把数据映射到显示组件的props中 
function mapStateToProps(state) {
	const { selectedSubreddit, postsBySubreddit } = state //这两个函数主要用于获取数据（标题和列表）
	const { isFetching, lastUpdated, items:posts } = postsBySubreddit[selectedSubreddit] || {isFetching:true, items:[]}

	return { selectedSubreddit, lastUpdated, isFetching, posts }

}


export default connect(mapStateToProps)(AsyncApp)







