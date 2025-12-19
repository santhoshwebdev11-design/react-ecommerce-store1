import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ProductProps{
id:number;
title:string;
images:string[];
price:number;
rating:number;
description:string;
  

}

const ProdctPage = () => {
  const {id} = useParams<{id:string}>();
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductProps | null>(null)

  useEffect(() => {
  if (id) {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data); // FIX
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }
}, [id]);

// Loading UI must be HERE, NOT inside useEffect
if (!product) {
  return <h1>loading....</h1>;
}

  
  return (
    <div className="p-5 w-[60%]">
      <button onClick={()=>navigate(-1)} className="mb-5 px-4 py-2 bg-black text-white rounded">back</button>
      <img src={product.images[0]} alt={product.title} className="w-[50%] mb-5" />
      <h2 className="font-bold text-2xl ">{product.title}</h2>
      <p className="font-semibold mt-1">{"Price :" + " " +"$"+product.price}</p>
      <p className="font-semibold mt-1">{"Rating :" + " " +product.rating + "⭐"}</p>
      <p className="font-semibold text-gray-700 p-2 mt-1">{product.description}</p>
      
    </div>
  )
}

export default ProdctPage