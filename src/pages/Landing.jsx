import React, { useState } from 'react';
import uuid from 'react-uuid';
import { useLocation } from 'react-router-dom';
import QueryString from 'qs';

import setPosition from '../utils/setPosition';
import DesignWrapper from '../utils/DesignWrapper';

import './../styles/Landing.css';

import Main from '../components/main';
import AddForm from '../components/AddForm';
import CaptureButton from '../components/CaptureButton';
import DesignForm from '../components/DesignForm';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function Landing() {
  const location = useLocation();
  const queryString = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [characters, setCharacters] = useState(
    setPosition([
      { id: uuid(), name: 'c1' },
      { id: uuid(), name: 'c2' },
      { id: uuid(), name: 'c3' },
      { id: uuid(), name: 'c4' },
      { id: uuid(), name: 'c5' },
      { id: uuid(), name: 'c6' },
      { id: uuid(), name: 'c7' },
      { id: uuid(), name: 'c8' },
      { id: uuid(), name: 'c9' },
    ])
  );

  console.log(QueryString.stringify({ design: { name: { color: 'red' } } }));
  console.log('qs', queryString.design);
  // /?design%5Bname%5D%5Bcolor%5D=red
  return (
    <QueryClientProvider client={queryClient}>
      <DesignWrapper design={queryString.design}>
        <DesignForm />
        <Main characters={characters} setCharacters={setCharacters} />
      </DesignWrapper>
      <AddForm characters={characters} setCharacters={setCharacters} />
      <CaptureButton />
    </QueryClientProvider>
  );
}
export default Landing;
