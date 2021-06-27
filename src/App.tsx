import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { AdminRoom } from './pages/admin';
import { ToastCustom } from './components/ToastCustom';

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <ToastCustom />
        <AuthContextProvider>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/rooms/new' exact component={NewRoom} />
            <Route path='/rooms/:id' component={Room} />

            <Route path='/admin/rooms/:id' component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
