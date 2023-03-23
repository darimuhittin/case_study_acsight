import ReactDOM from 'react-dom/client'
import Routing from './routes/Routing'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './main.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// Queries fetched twice in StrictMode
// disabled to avoid potential misunderstandings
// root.render(<React.StrictMode>{routing}</React.StrictMode>)
root.render(<Routing />)
