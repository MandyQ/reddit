import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AsyncApp from './AsyncApp'
import selectedSubreddit from '../reducers'

// const store = configureStore()

const store = createStore(selectedSubreddit)

export default class Root extends Component{
	render() {
		return (
			<Provider store={store}>
				<AsyncApp />
			</Provider>
		)
	}	
}	

