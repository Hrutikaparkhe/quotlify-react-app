import React from "react";
import "../Card/Card.scss";
import quote from "../../assets/img/quote.png";

const Card = ({tag,content,author,number}) => {
  return (
      <figure className={`card-style ${number%2 == 0 ? "card-color-even" : "card-color-odd"}`}>
       <div className="card">
        <h2 className="card_header">{
            tag.map((e,index)=>{
                return index > 0 ? <div>{ `,${e}`}</div> : <div>{`${e}`}</div>
            })
        }</h2>
        <div className="card-cont">
          <p className="card-text">
          <img src={quote} className="quote_icon" />

          {content}
          </p>
        </div>
        <span className="card_header author">-{author}</span>
        </div>
      </figure>
    
      
  );
};

export default Card;
