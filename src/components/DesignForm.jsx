import React from 'react';
import { designContext } from '../utils/DesignWrapper';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { configDotenv } from 'dotenv';
import FontSelector from './FontSelector';

function DesignForm() {
  const handleFont = (event) => {};

  const [design, setDesign] = useContext(designContext);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ mode: 'onBlur' });
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setDesign(data);
        })}
      >
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
          <input type='text' {...register('title.font')}></input>
          <FontSelector />
          <p style={{ fontFamily: design?.title?.font }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            ipsum cumque non numquam blanditiis amet libero delectus. Maxime,
            fugit architecto ipsam quae consectetur officia a voluptatem omnis,
            laborum quo amet!
          </p>
        </fieldset>
        <button type='submit' disabled={isSubmitting}>
          apply
        </button>
      </form>
    </>
  );
}

export default DesignForm;
