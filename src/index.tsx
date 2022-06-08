import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import './index.css'
import App from "./App"
import {HashRouter} from 'react-router-dom'
import {store} from "./redux/redux-store"
import {Provider} from "react-redux"

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
    document.getElementById('root'))

reportWebVitals()

// const rootElement = document.getElementById('root');
// if (!rootElement) throw new Error('Failed to find the root element');
// const root = createRoot(rootElement);