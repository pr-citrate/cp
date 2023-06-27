import { useQuery } from 'react-query';
import uuid from 'react-uuid';
function FontSelector({ children }) {
  const GOOGLE_FONT_API = import.meta.env.VITE_APP_GOOGLE_FONT_API_KEY;
  const fetchGoogleFont = () => {
    return fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONT_API}&subset=korean`
    )
      .then((res) => res.json())

      .catch((err) => console.log('err', err));
  };

  const { status, data, error } = useQuery('fonts', fetchGoogleFont, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: (data) => {
      // 성공시 호출
      console.log('#####', data.items);
      data.items.forEach((datum) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css?family=${datum.family}&display=swap&subset=korean`;
        document.head.appendChild(link);
      });
    },
    onError: (e) => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      console.log(e.message);
    },
  });

  switch (status) {
    case 'loading':
      return <span>Loading...</span>;

    case 'error':
      return <span>Error: {error.message}</span>;

    default:
      return (
        <ul>
          {data.items.map((datum) => (
            <li key={uuid()}>{datum.family}</li>
          ))}
        </ul>
      );
  }
}
export default FontSelector;
