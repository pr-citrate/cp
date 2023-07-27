import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Await } from 'react-router-dom';
import uuid from 'react-uuid';

function FontSelector({ register }) {
  const GOOGLE_FONT_API = import.meta.env.VITE_APP_GOOGLE_FONT_API_KEY;
  const [selectedFont, setSelectedFont] = useState('Arial');
  // const fetchGoogleFont = async () => {
  //   const response = await fetch(
  //     `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONT_API}&subset=korean`
  //   );
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch Google Fonts');
  //   }
  //   return response.json();
  // };

  // const { status, data, error } = useQuery('fonts', fetchGoogleFont, {
  //   refetchOnWindowFocus: false,
  //   retry: 0,
  //   onSuccess: (data) => {
  //     console.log('fetched data', data);
  //     data.items.forEach((datum) => {
  //       const link = document.createElement('link');
  //       link.rel = 'stylesheet';
  //       link.type = 'text/css';
  //       link.href = datum.variants.includes('regular')
  //         ? `https://fonts.googleapis.com/css2?family=${datum.family}:wght@400&display=fallback`
  //         : `https://fonts.googleapis.com/css2?family=${datum.family}:wght@500&display=fallback`;
  //       document.head.appendChild(link);
  //       // const tag = document.createElement('style');
  //       // tag.crossorigin = 'anonymous';
  //       // tag.async = true;
  //       // tag.innerHTML = `
  //       // @import url('https://fonts.googleapis.com/css2?family=${
  //       //   datum.family
  //       // }:wght@${
  //       //   datum.variants.includes('regular') ? '400' : '500'
  //       // }&display=fallback');
  //       // `;
  //       // document.head.appendChild(tag);
  //     });
  //   },
  //   onError: (e) => {
  //     console.log(e.message);
  //   },
  // });
  // if (status === 'loading') {
  //   return (
  //     <select>
  //       <option style={{ fontFamily: 'Arial' }} value='Arial'>
  //         Arial
  //       </option>
  //       <option disabled>Loading...</option>
  //     </select>
  //   );
  // }

  // if (status === 'error') {
  //   return (
  //     <select>
  //       <option style={{ fontFamily: 'Arial' }} value='Arial'>
  //         Arial
  //       </option>
  //       <option disabled>Error: {error.message}</option>
  //     </select>
  //   );
  // }

  const data = [
    'Arial',
    'EBS훈민정음',
    '건축조각체',
    '기후위기',
    '길벗',
    '램체',
    '영도바다체',
    '인천교육자람체',
    '태백은하수체',
    '평창평화체',
    '학교안심우주',
    '한글재민체',
  ];
  return (
    <select
      {...register}
      onChange={(e) => {
        register.onChange(e);
        setSelectedFont(e.target.value);
      }}
      value={selectedFont}
    >
      {data.map((datum) => (
        <option key={uuid()} value={datum} style={{ fontFamily: datum }}>
          {datum}
        </option>
      ))}
      {/* {data.items.map(
        (datum) =>
          (datum.variants.includes('regular') ||
            datum.variants.includes('500')) && (
            <option
              key={uuid()}
              value={datum.family}
              style={{ fontFamily: datum.family }}
            >
              {datum.family}
            </option>
          )
      )} */}
    </select>
  );
}

export default FontSelector;
