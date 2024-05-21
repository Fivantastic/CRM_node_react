import './succesRating.css';

export const SuccesRating = () => {
  return (
    <div className="card">
      {/*  <button className="dismiss" type="button">
        ×
      </button> */}
      <div className="header">
        <div className="div_image_v">
          <div className="image">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M20 7L9.00004 18L3.99994 13"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{' '}
              </g>
            </svg>
          </div>
        </div>
        <div className="content">
          <span className="title">Gracias Por Su Valoración</span>
          <p className="message">
            Es muy importate su valoración para nosotros. Gracias por confiar en
            cosmic CRM
          </p>
        </div>
      </div>
    </div>
  );
};
