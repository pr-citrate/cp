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
      <div className='main-container'>
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>Title</legend>
            <div>
              <label htmlFor='title-text'>Title</label>
              <input
                id='title-text'
                type='text'
                defaultValue='title'
                {...register('title.text')}
              />
            </div>
            <div>
              <label>color</label>
              <input type='color' {...register('title.color')} />
            </div>
            <div>
              <label>font</label>
              <FontSelector register={register('title.font')} />
            </div>
            <div>
              <label>fontsize</label>
              <input
                type='range'
                min={16}
                max={60}
                step={4}
                {...register('title.size')}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Subtitle</legend>
            <div>
              <label>Subtitle</label>
              <input
                type='text'
                defaultValue='subtitle'
                {...register('subtitle.text')}
              />
            </div>
            <div>
              <label>color</label>
              <input
                type='color'
                defaultValue='#000000'
                {...register('subtitle.color')}
              />
            </div>
            <div>
              <label>font</label>
              <FontSelector register={register('subtitle.font')} />
            </div>
            <div>
              <label>fontsize</label>
              <input
                type='range'
                min={12}
                max={40}
                step={4}
                defaultValue={24}
                {...register('subtitle.size')}
              />
            </div>
          </fieldset>

          <fieldset className='bgfield'>
            <legend>background</legend>
            {/* about 9:5 */}
            <div>
              <div className='colorbg selector'>
                <div>
                  <input
                    type='radio'
                    name='background'
                    value='color'
                    onClick={(e) => setImgType(e.target.value)}
                    defaultChecked
                  />
                  <label>color</label>
                  <input
                    type='color'
                    defaultValue='#FFFFFF'
                    disabled={imgType === 'color' ? false : true}
                    onChange={(e) => {
                      document.querySelector(
                        '.container'
                      ).style.backgroundImage = 'none';
                      document.querySelector(
                        '.container'
                      ).style.backgroundColor = e.target.value;
                    }}
                  />
                </div>
              </div>
              <div className='webimgbg selector'>
                <div>
                  <input
                    type='radio'
                    name='background'
                    value='webimg'
                    onClick={(e) => setImgType(e.target.value)}
                  />
                  <label>webimg</label>
                </div>
                <div className='imgSelect'>
                  {bgImgs.map((imgName) => (
                    <div
                      key={imgName}
                      className='bgimgs'
                      onClick={(e) => {
                        if (imgType === 'webimg') {
                          document
                            .querySelectorAll('.bgimgs')
                            .forEach((elem) => {
                              elem.style.outline = 'none';
                            });
                          e.target.style.outline = '0.3em solid skyblue';
                          document.querySelector(
                            '.container'
                          ).style.backgroundColor = '#FFFFFF';
                          document.querySelector(
                            '.container'
                          ).style.backgroundImage =
                            e.target.style.backgroundImage;
                        }
                      }}
                      style={{
                        backgroundImage: `url('./../../assets/images/${imgName}')`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className='userimg selector'>
                <div>
                  <input
                    type='radio'
                    name='background'
                    value='userimg'
                    onClick={(e) => setImgType(e.target.value)}
                  />
                  <label>userimg</label>
                </div>
                <div className='filebox'>
                  <input readOnly className='upload-name' value={fileName} />
                  <label htmlFor='file'>find</label>
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
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>arrow</legend>
            <div>
              <label>color</label>
              <input
                type='color'
                defaultValue='#000000'
                {...register('arrow.color')}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>characters</legend>
            <div>
              <label>background color</label>
              <input
                type='color'
                defaultValue='#FFFFFF'
                {...register('characters.bgcolor')}
              />
            </div>
            <div>
              <label>text color</label>
              <input
                type='color'
                defaultValue='#000000'
                {...register('characters.color')}
              />
            </div>
            <div>
              <label>font</label>
              <FontSelector register={register('characters.font')} />
            </div>
          </fieldset>
        </form>
        <div className='main-direct-container'>
          <Main characters={characters} setCharacters={setCharacters} />
        </div>
      </div>
    </DesignWrapper>
  );
}

export default DesignForm;
