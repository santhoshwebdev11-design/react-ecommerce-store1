import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface products {
  category: string;
  categories: string[];
}
interface FetchResponse {
  products: products[];
}

const SideBar = () => {
   
  const{ searchquery,
          setSearchquery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        setKeywords}= useFilter()

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products`);
        const data: FetchResponse = await response.json();
        const uniqCategory = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqCategory);
        
      } catch (error) {
        console.log("error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

 


 const handleMinPriceChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  const value = (e.target.value)
  setMinPrice(value ? parseFloat(value) : undefined)
 }
 
 const handleMaxPriceChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  const value = (e.target.value)
  setMaxPrice(value ? parseFloat(value) : undefined)
 }

  const handleRadioChangeCategories=(category:string)=>{
    setSelectedCategory(category)
  }

  const handleKeywordClick=(keyword : string)=>{
    setKeywords(keyword)
  }

  const handleResetFilter =()=>{
  
        
  }

  return (
    <div className="w-64 h-screen p-5 mt-3">
      <h1 className="text-2xl font-bold mb-10 mt-4 bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">REACT STORE</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="search products"
          value={searchquery}
          onChange={(e)=>setSearchquery(e.target.value)}
        />

        <div className="flex justify-center items-center mt-0.5">
          <input
            type="text"
            className="border-2 mr-2 px-3 py-3 mb-3 w-full"
            placeholder="min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-2 mr-2 px-3 py-3 mb-3 w-full"
            placeholder="max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        <section>
          {/* category section */}
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Categories</h2>
          </div>

          {categories.map((category, i) => (
            <label key={i} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={()=>handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
                className="mr-2 h-4 w-4"
              />
              {category.toUpperCase()} 
            </label>
          ))}
        </section>

        {/* Keyword section */}
      <div className="mb-5 mt-4">
           <h2 className="text-xl font-semibold mb-3">Keyword</h2>
           <div>
            {keywords.map((keyword,index)=>(
              <button 
              key={index} 
              onClick={()=>handleKeywordClick(keyword)}
              className="block mb-2 px-4 py-2 w-full text-left border-0 roundede hover:bg-gray-200">
              {keyword.toUpperCase()}
              </button>
            ))}
           </div>
      </div>


     <button 
     onClick={handleResetFilter}
     className="w-full bg-black text-white rounded mb-16 py-2 mt-5">Reset Filters</button>
      </section>
    </div>
  );
};

export default SideBar;
