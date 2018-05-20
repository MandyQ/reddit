import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Picker extends Component {
	render() {
		const { value, onChange, options} = this.props

		return (
			<div>
				<h1>{value}</h1>
				<select onChange ={e => onChange(e.target.value)} value={value}>
				{options.map(option => 
					<option value={option} key={option}>{option}</option>
				)}		
				</select>
			</div>
		)
	}
}
export default Picker

Picker.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.string.isRequired
	).isRequired,
	value:PropTypes.string.isRequired,
	onChange:PropTypes.func.isRequired
}

// 状态提升：把数据提升到select 而不是 存在option里
//option 就是select里存的value