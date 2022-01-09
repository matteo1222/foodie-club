import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import MatchTimeScreen from './screens/MatchTimeScreen';
import MatchGroupNumScreen from './screens/MatchGroupNumScreen';
import MatchFoodScreen from './screens/MatchFoodScreen';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Navigate to='/login'/>}/>
        <Route path='login' element={<LogInScreen/>}/>
        <Route path='signup' element={<SignUpScreen/>}/>
        <Route path='set-up-match-info-time' element={<MatchTimeScreen/>}/>
        <Route path='set-up-match-info-group-num' element={<MatchGroupNumScreen/>}/>
        <Route path='set-up-match-info-food' element={<MatchFoodScreen/>}/>
        <Route
          path='*'
          element={<Navigate to='/login' />}
        />
      </Routes>
    </div>
  );
}

export default App;
