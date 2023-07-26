import React, { useEffect, useRef, useState } from 'react'
import {useCart,useDispatchCart} from '../components/ContextReduser'

const Card = (props) => {
  let dispatch = useDispatchCart()
  let data = useCart()
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty,setQuty] = useState(1);
  const [size , setSize] = useState('')

  let foodItem = props.foodItem
  
  const handleAddtocart = async ()=>{

    let food = [];
    for(const item of data){
      if(item.id === foodItem.id){
        food = item;
        break;
      }
    }
    if(food !== []){
      if(food.size === size){
        await dispatch({type : 'UPDATE',id : foodItem.id,price:finelPrice,qty:qty})
        return
      }
      else if(food.size !== size){
        await dispatch({type:'ADD',id:foodItem._id,name : foodItem.name, price:finelPrice, qty:qty, size:size})
    
      }
    }
   
  }

  let finelPrice = qty * parseInt(options[size])
  useEffect(()=>{
    setSize(priceRef.current.value)
    console.log(finelPrice)
  },[])
  
  return (
    <div className="card mt-3" style={{ "width": "18rem","maxHeight":"360px" }}>
        <img src={foodItem.img} style={{objectFit:'fill',maxHeight:'140px'}} className="card-img-top"  alt="..." />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <p className="card-text">{foodItem.CategoryName}</p>
          <div className="container w-100">
            <select className='m-2 h-100  bg-success rounded' onChange={(e)=>setQuty(e.target.value)}>
              {
                Array.from(Array(6),(e,i)=>{
                  return(
                    <option key={i + 1} value={i+1}>{i+1}</option>
                  )
                })
              }
            </select>
            <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
              {
                priceOptions.map((data)=>{
                  return <option key={data} >{data}</option>
                })
              }
            </select>
            <div className="d-inline h-100 fs-6">
             {finelPrice}<p>$</p>
            </div>
          </div>
          <hr />
          
          <button className="btn btn-success justify-center ms-2" onClick={handleAddtocart}>Add to Cart</button>

        </div>
      </div>
  )
}

export default Card
