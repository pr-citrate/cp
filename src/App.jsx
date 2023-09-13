import { Route, Routes } from 'react-router-dom';
import Loading from './pages/Loading.jsx';
import { Suspense } from 'react';
import React from 'react';
import { useEffect } from 'react';

const Landing = React.lazy(() => import('./pages/Landing.jsx'));
const NotFound = React.lazy(() => import('./pages/NotFound.jsx'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Landing />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
