import React, { Component } from 'react'
import Picker from '../components/Picker'


class AsyncApp extends Component {
	// 父子组件之间传值
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)	
	}

	handleChange(nextSubreddit) {
		this.props.dispatch(selectedSubreddit(nextSubreddit))
	}

	render() {
		const { selectedSubreddit } = this.props

		return (
			<div>
				<Picker value={selectedSubreddit} 
								onChange={this.handleChange} 
								options={['Reactjs','Fronted']} />
			</div>

			<p>
				<span>
					Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
				</span>
			</p>
			
		)
	}
}
