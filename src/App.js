import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
      <a href='/'>Home</a>
      <a href='/user'>User Details </a>
      </header>
      <AppRouter/>
    </div>
  );
}

export default App;
