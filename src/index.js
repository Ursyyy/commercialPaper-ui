import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';

import { BrowserRouter as Router} from "react-router-dom";
import Store from './components/storage/Context'
ReactDOM.render(
	// <React.StrictMode>
		<Store>
			<Router>
				<App />
			</Router>
		</Store>,
	// </React.StrictMode>,
	document.getElementById('root')
);
