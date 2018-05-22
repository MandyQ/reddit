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
		const { selectedSubreddit, lastUpdated, posts } = this.props

		return (
			<div>
				<Picker value={selectedSubreddit} 
								onChange={this.handleChange} 
								options={['Reactjs','Fronted']} />	
				<p>
					<span> Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>
					<a href="#" onClick={this.handleRefreshClick}>Refresh</a>
				</p>
				<div>
					<Posts posts={posts} /> 
					
				</div>				
			</div>			
		)
	}
}


// 给组件内的每一个变量进行类型检测
AsyncApp.propTypes ={
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



// bug：
// 首页进来时间日期格式不对，没有默认数据列表
//点击refresh以后正常
//应该跟钩子函数有关



