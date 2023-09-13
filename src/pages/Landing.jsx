import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { useLocation } from 'react-router-dom';
import QueryString from 'qs';

import setPosition from '../utils/SetPosition.jsx';

import './../styles/Landing.css';

import DesignForm from '../components/DesignForm.jsx';

function Landing() {
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

  const location = useLocation();
  const queryString = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  // console.log(
  //   [...(queryString?.characters || [])].map((name) => {
  //     return { name: name, id: uuid() };
  //   })
  // );

  const [characters, setCharacters] = useState(
    setPosition(
      [...(queryString?.characters || [])].map((name) => {
        return { name: name, id: uuid() };
      })
    )
  );

  // console.log(
  //   QueryString.parse(
  //     'characters%5B0%5D=c1&characters%5B1%5D=c2&characters%5B2%5D=c3&characters%5B3%5D=c4&characters%5B4%5D=c5&characters%5B5%5D=c6&characters%5B6%5D=c7&characters%5B7%5D=c8&characters%5B8%5D=c9'
  //   )
  // );
  // console.log('qs', { ...queryString?.design }, [
  //   ...(queryString?.characters || []),
  // ]);
  // /?design%5Bname%5D%5Bcolor%5D=red
  return (
    <div className='troot'>
      <h1>이름뭐로하지</h1>
      <DesignForm
        userDesign={{ ...queryString.design }}
        characters={characters}
        setCharacters={setCharacters}
      />
    </div>
  );
}
export default Landing;
