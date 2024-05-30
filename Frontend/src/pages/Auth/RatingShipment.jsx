import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ratingShipment.css';
import { Toast } from '../../components/alerts/Toast.jsx';
import { SuccesRating } from '../../components/alerts/SuccesRating.jsx';

const URL = import.meta.env.VITE_URL;

export const RatingShipment = () => {
  const [rating_module, setRating_module] = useState(0);
  const [rating_comment, setRating_comment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Cambiado a false inicialmente
  const { ref_SH } = useParams();

  useEffect(() => {
    console.log('ref_SH Number from URL:', ref_SH);

    const checkRatingStatus = async () => {
      try {
        const response = await fetch(`${URL}/shipment/check-feedback/${ref_SH}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Feedback status:', responseData);

          if (responseData.feedbackExists) {
            setIsSuccess(true); // Si la valoración ya existe, mostrar el mensaje de éxito
          } else {
            setIsSuccess(false); // Si no hay valoración, mostrar el formulario
          }
        } else {
          console.error('Error al comprobar el estado de la valoración:', response.statusText);
        }
      } catch (error) {
        console.error('Error al comprobar el estado de la valoración:', error);
      }
    };

    checkRatingStatus();
  }, [ref_SH]);

  const handleRatingChange = (e) => {
    setRating_module(e.target.value);
  };

  const handleCommentChange = (e) => {
    setRating_comment(e.target.value);
  };

  const handleRatingShipmentSubmit = async (data) => {
    try {
      const response = await fetch(`${URL}/shipment/feedback/${ref_SH}`, {
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
        Toast.fire({
          icon: 'success',
          position: 'top-end',
          title: 'Valoración enviada con éxito!',
        });
        setIsSuccess(true); // Cambiar el estado a éxito después de enviar la valoración
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
      rating_module,
      rating_comment,
    });
  };

  return (
    <section className="rating_container">
      <img className="title_rating" src="../../../Logo_cosmic.svg" alt="Logo" />
      {isSuccess ? (
        <SuccesRating />
      ) : (
        <>
          <p className="rating_agent">Valora nuestro servicio de envío</p>
          <form onSubmit={handleSubmit}>
            <section className="rating_body">
              <div className="rating">
                <input
                  value="5"
                  name="rating_module"
                  id="star5"
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label htmlFor="star5"></label>
                <input
                  value="4"
                  name="rating_module"
                  id="star4"
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label htmlFor="star4"></label>
                <input
                  value="3"
                  name="rating_module"
                  id="star3"
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label htmlFor="star3"></label>
                <input
                  value="2"
                  name="rating_module"
                  id="star2"
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label htmlFor="star2"></label>
                <input
                  value="1"
                  name="rating_module"
                  id="star1"
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label htmlFor="star1"></label>
              </div>
              <textarea
                className="textarea_rating"
                id="rating_comment"
                name="rating_comment"
                value={rating_comment}
                placeholder="Comentario"
                onChange={handleCommentChange}
              ></textarea>

              <button className="btn_rating" type="submit">
                Enviar
              </button>
            </section>
          </form>
        </>
      )}
    </section>
  );
};
