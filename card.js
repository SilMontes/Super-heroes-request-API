import React from "react";
//componenete stateless o presentacional (solo se preocupa de mostrar información)
const Card = (props) => {
  return (
    //*w-25 = indica que el ancho será el 25% del siponible */
    <div className="card w-25 mr-2 mb-2">
      <img className="card-img-top" src={props.imageUrl} alt="superhero" />
      <div className="card-body">
        <p className="card-text">{props.name}</p>
      </div>
    </div>
  );
};
export default Card;
