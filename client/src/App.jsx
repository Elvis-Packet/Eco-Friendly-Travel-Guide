import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
