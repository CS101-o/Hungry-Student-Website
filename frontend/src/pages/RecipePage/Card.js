import React from "react";
import "./Card.css";
import { diffStatus, budgetStatus } from "../../functions";

import { IoMdTimer } from 'react-icons/io'
import { RiMoneyPoundCircleLine } from 'react-icons/ri'
import { MdBubbleChart } from 'react-icons/md'

export default function Card(props) {


  return (
    <div className="card">
        <div className="card-header">
            <div className="card-title-group">
            <h5 className="card-title">{props.title}</h5>
            </div>
        </div>
        <img className="card-image" src={props.image} alt="Logo" />
        <div className="card-icon"><MdBubbleChart/></div><div className="card-text">{diffStatus(props.difficulty)}</div>
        <div className="card-icon"><IoMdTimer /></div><div className="card-text2"> {`${props.time} mins`}</div>
        {budgetStatus(props.budget)}
        
      </div>

  );
}
