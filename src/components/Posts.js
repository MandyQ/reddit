import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Posts extends Component {
	render() {
		return(
			<ul>
				{this.props.posts.map((post,i) => 
					<li>{post.title}</li>
				)}				
			</ul>
		)
	}
}