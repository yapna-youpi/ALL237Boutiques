import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import {headerActions} from "../../../redux/slices/headerslice"

import "./boutique-card.css";

const BoutiqueCard = ({ data }) => {

  const Dispatch  = useDispatch()

  const addBoutique = ()=>{
    Dispatch(
      headerActions.addBoutique({
         productName: data.productName
      })
    )
  }
    
  // console.log(" donne le nom de la boutique", data. productName);
  // console.log(" donne de labtq", data);

  return (

    <div className="boutique_card">
      <Link to={`/Boutique/${data.productName}`} onClick={addBoutique}>
      <div className="imgbx">
        <img src={data.imgUrl} alt={data.productName} />
        <div className="contentBx">
          <h4>{data.productName}</h4>
          <h5>{data.place}</h5>
          <Link to={`/Boutique/${data.productName}`} onClick={addBoutique}><small>Aller a</small></Link>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default BoutiqueCard
