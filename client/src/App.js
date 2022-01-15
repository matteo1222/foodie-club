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
import ProfileScreen from './screens/ProfileScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import RootScreen from './screens/RootScreen';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import { AuthProvider, RequireAuth } from './components/auth';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<Navigate to='/login'/>}/>
          <Route path='login' element={<LogInScreen/>}/>
          <Route path='signup' element={<SignUpScreen/>}/>
          <Route
            path='set-up-match-info-time'
            element={
              <RequireAuth>
                <MatchTimeScreen/>
              </RequireAuth>
            }
          />
          <Route
            path='set-up-match-info-group-num'
            element={
              <RequireAuth>
                <MatchGroupNumScreen/>
              </RequireAuth>
            }
          />
          <Route
            path='set-up-match-info-food'
            element={
              <RequireAuth>
                <MatchFoodScreen/>
              </RequireAuth>
            }
          />
          <Route
            element={
              <RequireAuth>
                <RootScreen>
                  <Outlet/>
                </RootScreen>
              </RequireAuth>
            }>
            <Route path='/join-a-group' element={<JoinGroupScreen />} />
            <Route path='/start-a-group' element={<StartGroupScreen />} />
            <Route path='/my-groups' element={<MyGroupsScreen><Outlet/></MyGroupsScreen>}>
              <Route path=':groupId' element={<ChatScreen />} />
            </Route>
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/preferences' element={<PreferencesScreen />} />
          </Route>
          <Route
            path='*'
            element={<Navigate to='/login' />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
