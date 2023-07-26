import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from './Card'


const Home = () => {
  const foodCatigory = ["Starter","Biryani/Rice","Pizza",]
  const [search,setserch] = useState('')

  const [foodItem, setfoodItem] = useState([]);
  const [catigory,setCatigory] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:500/api/foodData", {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      }
    })
    response = await response.json()
    setfoodItem(response[0])
    setCatigory(foodCatigory)
  
    console.log(response[1])
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <div>
      <div><Header /></div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:"contain !importent"}}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{zIndex:"10"}}>
            <div className="d-flex justify-content-center" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>setserch(e.target.value)}/>
            
            </div>
          </div>
          <div className="carousel-item active">
            <img src=" https://source.unsplash.com/random/900×700/?burger "  className="d-block w-100 h-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src=" https://source.unsplash.com/random/900×700/?pastry " className="d-block w-100 h-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src=" https://source.unsplash.com/random/900×700/?barbeque " className="d-block w-100 h-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className='container'>
      {
        foodCatigory.map((data,ind)=>{
          return  <div className='row mb-3'>
         
            <h1 key={ind}>{data}</h1>
            {
              foodItem.filter((item)=>(item.CategoryName === data)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))
              .map(filterItems=>{
                return(
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodItem = {filterItems} options = {filterItems.options[0]} />
                    </div>
                )
              })
            }
            </div>
        })
       
       
      }

        
      </div>
      <div><Footer /></div>
    </div>
  )
}

export default Home
