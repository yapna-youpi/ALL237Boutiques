import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { headerActions } from "../../redux/slices/headerslice";

const BoutiqueOne = ({ data }) => {

  const Dispatch  = useDispatch()

  const addBoutique = ()=>{
    Dispatch(
      headerActions.addBoutique({
         productName: data.productName
      })
    )
  }

  return (
    <div className="box_content">
      <div className="img_box2">
        <Link to={`/Boutique/${data.productName}`} onClick={addBoutique}>
          <img src={data.imgUrl} alt={data.productName} />
        </Link>
        <div className="icon">
          <li>
            <i class="ri-heart-fill"></i>
          </li>
          <li>
            {" "}
            <i class="ri-eye-fill"></i>
          </li>
        </div>
      </div>
      <div className="details">
        <h3>{data.productName} </h3>
        <p>{data.place} </p>
        <Link to={`/shopDetails/${data.productName}`} onClick={addBoutique}>
          <motion.boutton whileHover={{ scale: 0.9 }} className="btn_shop">
            Ouvrir +{" "}
          </motion.boutton>
        </Link>
      </div>
    </div>
  );
};

export default BoutiqueOne;
