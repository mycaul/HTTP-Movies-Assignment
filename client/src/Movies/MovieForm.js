import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const MovieForm = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  console.log(id)
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (e) => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, {movie})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(`${err.response}`));
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={movie.title}
          onChange={changeHandler}
        />
        <input
          type='text'
          name='director'
          placeholder='Director'
          value={movie.director}
          onChange={changeHandler}
        />
        <input
          type='text'
          name='metascore'
          placeholder='Metascore'
          value={movie.metascore}
          onChange={changeHandler}
        />
        <input
          type='string'
          name='stars'
          placeholder='Stars'
          value={movie.stars}
          onChange={changeHandler}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default MovieForm;