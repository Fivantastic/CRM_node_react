import { useState } from 'react';
const URL = import.meta.env.VITE_URL;
import { useParams } from 'react-router-dom';
import './ratingVisit.css';

export const RatingVisit = () => {
  const [rating_visit, setRating_visit] = useState(0);
  const [comment_visit, setComment_visit] = useState('');

  const { ref_VT } = useParams();

  console.log(rating_visit);
  const handleRatingChange = (event) => {
    setRating_visit(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment_visit(event.target.value);
  };

  const handleRatingVisitSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${URL}/visits/feedback/${ref_VT}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log('Rating enviado con éxito:', responseData);
        // Redirigir a la página principal o realizar otra acción
      } else {
        const errorData = await response.json();
        console.error('Rating falló:', errorData);
        // Mostrar mensaje de error
      }
    } catch (error) {
      console.error('Error durante el rating:', error);
      // Manejar el error
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRatingVisitSubmit({
      rating_visit,
      comment_visit,
    });
  };

  return (
    <section className="rating_container">
      <img src="../../../public/" alt="Logo" />
      <p className="rating_agent">Valora la visita de nuestro agente</p>
      <form onSubmit={handleSubmit}>
        <section className="rating_body">
          <div className="rating">
            <input
              value="5"
              name="ratting_visit"
              id="star5"
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor="star5"></label>
            <input
              value="4"
              name="rating_visit"
              id="star4"
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor="star4"></label>
            <input
              value="3"
              name="rating_visit"
              id="star3"
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor="star3"></label>
            <input
              value="2"
              name="rating_visit"
              id="star2"
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor="star2"></label>
            <input
              value="1"
              name="rating_visit"
              id="star1"
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor="star1"></label>
          </div>
          <textarea
            id="comment_visit"
            name="comment_visit"
            value={comment_visit}
            onChange={handleCommentChange}
          ></textarea>

          <button className="btn_rating" type="submit">
            Enviar
          </button>
        </section>
      </form>
    </section>
  );
};
