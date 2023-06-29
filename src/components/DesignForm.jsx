import { useState, useContext } from 'react';
import { designContext } from '../utils/DesignWrapper';
import FontSelector from './FontSelector';
import DesignWrapper from '../utils/DesignWrapper';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Main from './main';

function DesignForm({ userDesign, characters, setCharacters }) {
  const [design, setDesign] = useState({});
  const { register, watch } = useForm({
    defaultValues: userDesign,
  });
  console.log(watch());
  useEffect(() => setDesign(watch()), []);

  return (
    <DesignWrapper design={design}>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend>Title</legend>
          <label>Title</label>
          <input
            type='text'
            defaultValue='title'
            {...register('title.text')}
          ></input>
          <label>color</label>
          <input
            type='color'
            defaultValue='#000000'
            {...register('title.color')}
          ></input>
          <label>font</label>
          {/* <input type='text' {...register('title.font')}></input> */}
          <FontSelector register={register('title.font')} />
          <p
            style={{
              fontFamily: design?.title?.font,
              color: design?.title?.color,
            }}
          >
            {design?.title?.text}
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            ipsum cumque non numquam blanditiis amet libero delectus. Maxime,
            fugit architecto ipsam quae consectetur officia a voluptatem omnis,
            laborum quo amet!
          </p>
        </fieldset>
        <button type='submit'>apply</button>
      </form>
      <Main characters={characters} setCharacters={setCharacters} />
    </DesignWrapper>
  );
}

export default DesignForm;
