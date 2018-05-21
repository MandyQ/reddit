import React, { Component } from 'react'
import Picker from '../components/Picker' 
import { selectSubreddit } from '../actions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


class AsyncApp extends Component {
	// 子组件向父组件通信
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)	
	}

	handleChange(nextSubreddit) {
		this.props.dispatch(selectSubreddit(nextSubreddit))
	}

	render() {
		const { selectedSubreddit, lastUpdated } = this.props

		return (
			<div>
				<Picker value={selectedSubreddit} 
								onChange={this.handleChange} 
								options={['Reactjs','Fronted']} />	
				<p>
					<span> Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>
					<a href="#">Refresh</a>
				</p>				
			</div>			
		)
	}
}
AsyncApp.propTypes ={
	selectedSubreddit:PropTypes.string.isRequired
}

export default connect()(AsyncApp)

