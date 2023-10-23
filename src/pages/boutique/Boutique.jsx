import React,{useState,useEffect,useRef} from 'react'
import BoutiqueOne from './BoutiqueOne'
import boutiques from '../../assets/data/boutique'
import { getUniqueVal } from '../../custom-hooks/addon'

import "./boutique.css"
import img_box from "../../assets/image/slide_01.jpg"
import img_box2 from "../../assets/image/slide_02.jpg"

const Boutique = () => {

  const [boutique, setBoutique] = useState(boutiques)
  const leftBox = useRef(null)

  const handleFilter = (element) =>{
      let newboutique = boutiques.filter( item => item.category == element )

      setBoutique(newboutique)
  }

  console.log(boutique,"la  nouvelle boutq")

  //function to add mnu fixed at left
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        leftBox.current.classList.add("fixed_box");
      } else {
        leftBox.current.classList.remove("fixed_box");
      }
    });
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
    stickyHeaderFunc()
    return () => {
      
    }
  },[boutique])
  
  //recuperation des category unique
  const category_listes = boutiques.map((item)=>item.category)
  const unique_category = category_listes.filter(getUniqueVal)

  return (
    <div className='boutique'>
      {/* <h2># Boutique</h2> */}
      <p>Home - Boutique</p>
      <div className='container'>
        <div className="left_box" >
          <div className='left_content' ref={leftBox}>
            <div className="category">
              <div className="category_header">
                <h3 onClick={()=>setBoutique(boutiques) }>All Category</h3>
              </div>
              <div className="category_box">
                <ul>
                  {
                    unique_category.map((item,index)=>(
                      <li onClick={()=>handleFilter(item)} key={index} ># {item}</li>
                    ))
                  }
                </ul>
              </div>

            </div>
            <div className="boutique_banner">
              <div className="img_box">
                <img src={img_box} alt='boutique banner'/>
              </div>
            </div>
          </div>
        </div>


        <div className="right_box">
          <div className="boutique_banner">
          </div>
          <div className="product_box">
            <h2 className='text-center fw-bolder '>visiter toutes nos boutiques</h2>
            <div className="product_container">
              {
                boutique.map((item,index)=>(
                  <BoutiqueOne data={item} key={index} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Boutique