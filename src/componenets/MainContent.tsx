import { Tally3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = () => {
  const { searchquery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [product, setProduct] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const itemPerPage = 8;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${
      (currentPage - 1) * itemPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }
    axios
      .get(url)
      .then((response) => {
        setProduct(response.data.products);
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }, [currentPage, keyword]);

  const getfilterProduct = () => {
    let filterProduct = product;
    if (selectedCategory) {
      filterProduct = filterProduct.filter(
        (item) => item.category === selectedCategory
      );
      console.log(filterProduct);
    }

    if (minPrice !== undefined) {
      filterProduct = filterProduct.filter((item) => item.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filterProduct = filterProduct.filter((item) => item.price <= maxPrice);
    }

    if (searchquery) {
      filterProduct = filterProduct.filter((item) =>
        item.title.toLowerCase().includes(searchquery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filterProduct.sort((a, b) => b.price - a.price);

      case "cheap":
        return filterProduct.sort((a, b) => a.price - b.price);

      case "populor":
        return filterProduct.sort((a, b) => b.rating - a.rating);

      default:
        return filterProduct;
    }
  };
  const filterProduct = getfilterProduct();
  console.log(filterProduct);

  const totalProducts = 100;
  const totalPage = Math.ceil(totalProducts / itemPerPage)
  const handlePageChange=(page:number)=>{
    if(page > 0 && page <= totalPage){
      setCurrentPage(page)
    }

  }

  const getPaginationButtons =()=>{
    const buttons:number[] = [];
    let startPage = Math.max(1,currentPage - 2)
    let endPage = Math.min(totalPage , currentPage + 2)

    if(currentPage - 2 < 1){
      endPage = Math.min(totalPage,endPage + (2 - currentPage - 1))
    }

    
    if(currentPage + 2 > totalPage){
      startPage = Math.min(1, startPage - (2 - totalPage- currentPage))
    }

    for(let page=startPage; page<=endPage ; page++){
           buttons.push(page)
    }
    return buttons;
  }
  

  return (
    <section className=" xl:w-220 mr-10 l:w-220 sm:w-160 xs:w-80 p-5 ">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mt-5 mb-5">
            <button
              onClick={() => setDropDownOpen(!dropDownOpen)}
              
              className="border-none px-4 py-2  rounded-full flex items-center "
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>
            {dropDownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-300"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-300"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("populor")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-300"
                >
                  Populor
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {/* bookcard */}
          {filterProduct.map((item) => (
            <BookCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.thumbnail}
              price={item.price}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-1">
          {/* privious button */}
          <button
           onClick={()=>handlePageChange(currentPage-1)}
           disabled={currentPage === 1}
          className="px-4 py-2 mx-2 border-none bg-gray-300 hover:bg-gray-400 active:bg-gray-600 rounded-full">previous</button>


           {/* 1,2,3,4,5 */}
          <div className="flex flex-wrap justify-center">
            {/* pagination button */}
            {getPaginationButtons().map((page)=>(
              <button key={page} onClick={()=>handlePageChange(page)} 
              className={`border-none py-2 px-4 mx-1 rounded-full  ${page === currentPage ? "bg-black text-white" : ""} `} >{page}</button>
            ))}
            <button>

            </button>
          </div>


          {/* next */}
          <button onClick={()=>handlePageChange(currentPage+1)}
          disabled={currentPage === totalPage}
          className="px-4 py-2 mx-2 rounded-full border-none bg-gray-300 hover:bg-gray-400 active:bg-gray-600 ">next</button>

         
        </div>
      </div>
    </section>
  );
};

export default MainContent;
