import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ratingVisit.css';
import { Toast } from '../../components/alerts/Toast.jsx';
import { SuccesRating } from '../../components/alerts/SuccesRating.jsx';
const URL = import.meta.env.VITE_URL;

export const RatingVisit = () => {
  const [rating_visit, setRating_visit] = useState(0);
  const [comment_visit, setComment_visit] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const { ref_VT } = useParams();
/*   const [isChecked, setIsChecked] = useState({});
  console.log(isSuccess) */

  const handleRatingChange = (e) => {
    setRating_visit(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment_visit(e.target.value);
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
        /* setIsChecked(responseData.data); */

        Toast.fire({
          icon: 'success',
          position: 'top-end',
          title: 'Valoración enviada con exito!',
        });
      } else {
        const errorData = await response.json();
        console.error('Rating falló:', errorData);
        Toast.fire({
          icon: 'error',
          position: 'top-end',
          title: 'La valoración ya ha sido emitida...',
        });
      }
    } catch (error) {
      console.error('Error durante el rating:', error);
      // Manejar el error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRatingVisitSubmit({
      rating_visit,
      comment_visit,
    });
    setIsSuccess(false);
  };

  /* useEffect(() => {
    if (isChecked.rating_visit === null) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]); */

  return (
    <section className="rating_container">
      <img className="title_rating" src="../../../Logo_cosmic.svg" alt="Logo" />
      {isSuccess ? (
        <>
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
                className="textarea_rating"
                id="comment_visit"
                name="comment_visit"
                value={comment_visit}
                placeholder="Comentario"
                onChange={handleCommentChange}
              ></textarea>

              <button className="btn_rating" type="submit">
                Enviar
              </button>
            </section>
          </form>
        </>
      ) : (
        <SuccesRating />
      )}
    </section>
  );
};
