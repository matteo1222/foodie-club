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
import JoinGroupScreen from './screens/JoinGroupScreen';
import StartGroupScreen from './screens/StartGroupScreen';
import MyGroupsScreen from './screens/MyGroupsScreen';
import ChatScreen from './screens/ChatScreen';
import RootScreen from './screens/RootScreen';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Outlet } from 'react-router';

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
        <Route path='app' element={<RootScreen/>}/>
        <Route element={<RootScreen><Outlet/></RootScreen>}>
          <Route path='/join-a-group' element={<JoinGroupScreen />} />
          <Route path='/start-a-group' element={<StartGroupScreen />} />
          <Route path='/my-groups' element={<MyGroupsScreen><Outlet/></MyGroupsScreen>}>
            <Route path=':groupId' element={<ChatScreen />} />
          </Route>
        </Route>
        <Route
          path='*'
          element={<Navigate to='/login' />}
        />
      </Routes>
    </div>
  );
}

export default App;
