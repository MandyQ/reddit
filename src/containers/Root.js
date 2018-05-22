import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'

//用于处理异步请求的中间件
import { createLogger } from 'redux-logger' 
import thunkMiddleware from 'redux-thunk'


import AsyncApp from './AsyncApp'  
import rootReducer from '../reducers' 


const loggerMiddleware = createLogger()

const configStore = (preloadedState) => {
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	)
}


const store = configStore() //调用上面的函数获取到数据

export default class Root extends Component{
	render() {
		return (
			<Provider store={store}>
				<AsyncApp />
			</Provider>
		)
	}	
}	

