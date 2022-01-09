import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';

function App() {
  return (
    <div className="App">
      <LogInScreen/>
    </div>
  );
}

export default App;
