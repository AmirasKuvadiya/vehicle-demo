import { HashRouter } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import Routes from "./app/router/Routes";
import './App.css';

function App() {
  return (
    <HashRouter>
      <LastLocationProvider>
        <Routes />
      </LastLocationProvider>
    </HashRouter>
  );
}


export default App;
