import { Navigation } from './Navigation';

import './App.css';
import './styles/custom.scss';
import { AuthProvider } from './Context';


function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </div>
  );
}

export default App;
