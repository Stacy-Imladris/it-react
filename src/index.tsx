import {render} from 'react-dom'
import reportWebVitals from './reportWebVitals'
import './index.css'
import App from './App'
import {HashRouter} from 'react-router-dom'
import {store} from 'redux/redux-store'
import {Provider} from 'react-redux'

render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>,
    document.getElementById('root'))

reportWebVitals()
