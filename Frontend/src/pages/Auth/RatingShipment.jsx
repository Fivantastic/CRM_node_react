import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ratingShipment.css';
import { Toast } from '../../components/alerts/Toast.jsx';
import { SuccesRating } from '../../components/alerts/SuccesRating.jsx';

const URL = import.meta.env.VITE_URL;

export const RatingShipment = () => {
  const [rating_shipment, setRating_shipment] = useState(0);
  const [comment_shipment, setComment_shipment] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const { trackingNumber } = useParams();

  const handleRatingChange = (e) => {
    setRating_shipment(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment_shipment(e.target.value);
  };

  const handleRatingShipmentSubmit = async (data) => {
    try {
      const response = await fetch(`${URL}/shipment/feedback/${trackingNumber}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Opcional: puedes descomentar el siguiente console.log para ver la respuesta en la consola
        const responseData = await response.json();
         console.log('Rating enviado con éxito:', responseData);
        Toast.fire({
          icon: 'success',
          position: 'top-end',
          title: 'Valoración enviada con éxito!',
        });
      } else {
         const errorData = await response.json();
         console.error('Rating falló:', errorData);
        Toast.fire({
          icon: 'error',
          position: 'top-end',
          title: 'Error al enviar la valoración',
        });
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        position: 'top-end',
        title: 'Error al enviar la valoración',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRatingShipmentSubmit({
      rating_shipment,
      comment_shipment,
    });
    setIsSuccess(false);
  };

  return (
    <section className="rating_container">
      <img className="title_rating" src="../../../Logo_cosmic.svg" alt="Logo" />
      {isSuccess ? (
        <>
          <p className="rating_agent">Valora nuestro servicio de envío</p>
          <form onSubmit={handleSubmit}>
            <section className="rating_body">
              <div className="rating">
                <input
                  value="5"
                  name="rating_shipment"
                  id="star5"
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label htmlFor="star5"></label>
                <input
                  value="4"
                  name="rating_shipment"
                  id="star4"
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label htmlFor="star4"></label>
                <input
                  value="3"
                  name="rating_shipment"
                  id="star3"
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label htmlFor="star3"></label>
                <input
                  value="2"
                  name="rating_shipment"
                  id="star2"
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label htmlFor="star2"></label>
                <input
                  value="1"
                  name="rating_shipment"
                  id="star1"
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label htmlFor="star1"></label>
              </div>
              <textarea
                className="textarea_rating"
                id="comment_shipment"
                name="comment_shipment"
                value={comment_shipment}
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
