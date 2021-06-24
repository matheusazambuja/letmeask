import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';
import { Toaster } from 'react-hot-toast';
import { ThemeContextProvider } from './contexts/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          {/* Criar componente pra ele e usar o tema */}
          <Toaster
            position="top-right"
            reverseOrder={true}
            toastOptions={{
              // Define default options
              style: {
                border: '1px solid #835afd',
                boxShadow: 'rgba(0, 0, 0, 0.2)',
                color: '#29292e',
                fontSize: '1.1rem',
                padding: '1rem 3rem',
              },
            }}
          />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/rooms/new' exact component={NewRoom} />
            <Route path='/rooms/:id' component={Room} />
          </Switch>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
