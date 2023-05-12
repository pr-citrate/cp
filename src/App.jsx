import { Route, Routes } from 'react-router-dom';
import Test from './pages/Test';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/test' element={<Test />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
