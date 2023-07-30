import { Route, Routes } from 'react-router-dom';
import Loading from './pages/Loading';
import { Suspense } from 'react';
import React from 'react';
import { useEffect } from 'react';

const Landing = React.lazy(() => import('./pages/Landing'));
const Test = React.lazy(() => import('./pages/Test'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/test' element={<Test />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
