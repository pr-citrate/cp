import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DesignWrapper from '../utils/DesignWrapper.jsx';
import ActionForm from './ActionForm.jsx';
import FontSelector from './FontSelector.jsx';
import Main from './main.jsx';

function DesignForm({ userDesign, characters, setCharacters }) {
  const [design, setDesign] = useState({});
  const [imgType, setImgType] = useState('color');
  const [fileName, setFileName] = useState('첨부파일');
  const [file, setFile] = useState(null);
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
  console.log(watch(), userDesign);
  useEffect(() => setDesign(watch()), []);

  return (
    <DesignWrapper design={design}>
      <ActionForm characters={characters} setCharacters={setCharacters} />
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
                    {...register('background.bgType')}
                    defaultChecked
                  />
                  <label>color</label>
                  <input
                    type='color'
                    defaultValue='#FFFFFF'
                    {...register('background.color')}
                  />
                </div>
              </div>
              <div className='webimgbg selector'>
                <div>
                  <input
                    defaultChecked={
                      userDesign?.background?.bgType === 'webimg' ? true : false
                    }
                    type='radio'
                    name='background'
                    value='webimg'
                    {...register('background.bgType')}
                  />
                  <label>webimg</label>
                </div>
                <div className='imgSelect'>
                  {bgImgs.map((imgName, index) => (
                    <div key={imgName}>
                      <input
                        type='radio'
                        name='bgimgs'
                        defaultChecked={
                          userDesign?.background?.internalLink ===
                          `./../../assets/images/${imgName}`
                            ? true
                            : false
                        }
                        value={`./../../assets/images/${imgName}`}
                        hidden
                        {...register('background.internalLink')}
                      />
                      <img
                        className='bgimgs'
                        src={`./../../assets/images/${imgName}`}
                        onClick={(e) => {
                          e.target.previousSibling.click();

                          if (design.background.bgType === 'webimg') {
                            document
                              .querySelectorAll('.bgimgs')
                              .forEach((elem) => {
                                elem.style.outline = 'none';
                              });
                            e.target.style.outline = '0.3em solid skyblue';
                          }
                        }}
                      />
                      {/* <div
                        key={imgName}
                        className='bgimgs'
                        onClick={(e) => {
                            document.querySelector(
                              '.container'
                            ).style.backgroundColor = '#FFFFFF';
                            document.querySelector(
                              '.container'
                            ).style.backgroundImage =
                              e.target.style.backgroundImage;
                          }
                        }}
                      ></div> */}
                    </div>
                  ))}
                </div>
              </div>
              <div className='userimg selector'>
                <div>
                  <input
                    type='radio'
                    name='background'
                    value='externalimg'
                    {...register('background.bgType')}
                  />
                  <label>externalimg</label>
                </div>
                <div>
                  <label>url</label>
                  <input type='text' {...register('background.externalLink')} />
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
                defaultValue='#BBBBBB'
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
