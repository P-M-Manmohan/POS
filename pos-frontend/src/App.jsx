import {Routes, Route, BrowserRouter} from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const App = () => {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
