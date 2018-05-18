import 'babel-polyfill' //解析新的API

import React from 'react'
import { render } from 'react-dom'
import Picker from './components/Picker'

render(
	<Picker />,
	document.getElementById('root')
)