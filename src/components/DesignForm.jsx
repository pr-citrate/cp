import { useState, useContext } from 'react';
import { designContext } from '../utils/DesignWrapper';
import FontSelector from './FontSelector';
import DesignWrapper from '../utils/DesignWrapper';
import { useForm } from 'react-hook-form';
import { useLayoutEffect } from 'react';
import Main from './main';
import { useEffect } from 'react';

function DesignForm({ userDesign, characters, setCharacters }) {
  const [design, setDesign] = useState({});
  const [fileName, setFileName] = useState('첨부파일');
  const { register, watch, trigger } = useForm({
    defaultValues: userDesign,
  });
  console.log(watch());
  useLayoutEffect(() => setDesign(watch()), []);

  return (
    <DesignWrapper design={design}>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend>Title</legend>
          <label>Title</label>
          <input type='text' defaultValue='title' {...register('title.text')} />
          <label>color</label>
          <input type='color' {...register('title.color')} />
          <label>font</label>
          <FontSelector register={register('title.font')} />
          <input
            type='range'
            min={16}
            max={60}
            step={4}
            {...register('title.size')}
          />
          <p
            style={{
              fontFamily: design?.title?.font,
              color: design?.title?.color,
              fontSize: design?.title?.size + 'px',
            }}
          >
            {design?.title?.text}
          </p>
        </fieldset>

        <fieldset>
          <legend>Subtitle</legend>
          <label>Subtitle</label>
          <input
            type='text'
            defaultValue='subtitle'
            {...register('subtitle.text')}
          />
          <label>color</label>
          <input
            type='color'
            defaultValue='#000000'
            {...register('subtitle.color')}
          />
          <label>font</label>
          <FontSelector register={register('subtitle.font')} />
          <input
            type='range'
            min={12}
            max={40}
            step={4}
            defaultValue={24}
            {...register('subtitle.size')}
          />
          <p
            style={{
              fontFamily: design?.subtitle?.font,
              color: design?.subtitle?.color,
              fontSize: design?.subtitle?.size + 'px',
            }}
          >
            {design?.subtitle?.text}
          </p>
        </fieldset>

        <fieldset>
          <legend>background</legend>
          <div className='filebox'>
            <input readOnly className='upload-name' value={fileName} />
            <label htmlFor='file'>파일찾기</label>
            <input
              type='file'
              id='file'
              onChange={(e) => {
                setFileName(e.target.value);
                const file = e.target.files[0];

                const reader = new FileReader();
                reader.onloadend = () => {
                  document.querySelector(
                    '.container'
                  ).style.backgroundImage = `url(${reader.result})`;
                };

                if (file) {
                  reader.readAsDataURL(file);
                }

                // document.querySelector(
                //   '.container'
                // ).style.backgroundImage = `url(${e.target.files[0]})`;
              }}
            />
          </div>
        </fieldset>

        <button type='submit'>apply</button>
      </form>
      <Main characters={characters} setCharacters={setCharacters} />
    </DesignWrapper>
  );
}

export default DesignForm;
