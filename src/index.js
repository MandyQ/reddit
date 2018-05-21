import 'babel-polyfill' //解析新的API

import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

render(
	<Root />,
	document.getElementById('root')
)