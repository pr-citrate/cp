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
  const [imgType, setImgType] = useState('color');
  const [fileName, setFileName] = useState('첨부파일');
  const { register, watch, trigger } = useForm({
    defaultValues: userDesign,
  });
  const bgImgs = [
    'aurora.webp',
    'bokeh.webp',
    'clouds.webp',
    'lamp.webp',
    'leaves.webp',
    'milky-way.webp',
    'pool.webp',
    'water.webp',
  ];
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
        </fieldset>

        <fieldset>
          <legend>background</legend>
          {/* about 9:5 */}
          <div>
            <label>color</label>
            <input
              type='radio'
              name='background'
              value='color'
              onClick={(e) => setImgType(e.target.value)}
              defaultChecked
            />
            <label>webimg</label>
            <input
              type='radio'
              name='background'
              value='webimg'
              onClick={(e) => setImgType(e.target.value)}
            />
            <label>userimg</label>
            <input
              type='radio'
              name='background'
              value='userimg'
              onClick={(e) => setImgType(e.target.value)}
            />
          </div>
          <input
            type='color'
            defaultValue='#FFFFFF'
            disabled={imgType === 'color' ? false : true}
            onChange={(e) => {
              document.querySelector('.container').style.backgroundImage =
                'none';
              document.querySelector('.container').style.backgroundColor =
                e.target.value;
            }}
          />
          <div className='imgSelect'>
            {bgImgs.map((imgName) => (
              <div
                key={imgName}
                onClick={(e) => {
                  if (imgType === 'webimg') {
                    document.querySelector('.container').style.backgroundColor =
                      '#FFFFFF';
                    document.querySelector('.container').style.backgroundImage =
                      e.target.style.backgroundImage;
                  }
                }}
                style={{
                  backgroundImage: `url('./../../assets/images/${imgName}')`,
                }}
              ></div>
            ))}
          </div>
          <div className='filebox'>
            <input readOnly className='upload-name' value={fileName} />
            <label htmlFor='file'>파일찾기</label>
            <input
              type='file'
              id='file'
              accept='image/*'
              disabled={imgType === 'userimg' ? false : true}
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
              }}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>arrow</legend>
          <input
            type='color'
            defaultValue='#000000'
            {...register('arrow.color')}
          />
        </fieldset>

        <button type='submit'>apply</button>
      </form>
      <Main characters={characters} setCharacters={setCharacters} />
    </DesignWrapper>
  );
}

export default DesignForm;
