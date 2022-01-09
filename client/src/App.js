import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Navigate to='/login'/>}/>
        <Route path='login' element={<LogInScreen/>}/>
        <Route path='signup' element={<SignUpScreen/>}/>
        <Route
          path='*'
          element={<Navigate to='/login' />}
        />
      </Routes>
    </div>
  );
}

export default App;
