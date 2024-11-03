// src/App.js
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AuthProvider from './context/AuthProvider';
import { UserProvider } from './context/UserContext'; // Importa el contexto de usuario
import { PostsProvider } from './context/PostContext';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <PostsProvider> {/* Envuelve aquí con PostsProvider */}
          <Router>
            <AppRoutes />
          </Router>
        </PostsProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;