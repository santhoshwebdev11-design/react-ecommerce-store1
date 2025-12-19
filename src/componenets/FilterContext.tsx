import React, { createContext, useContext, useState, type ReactNode } from "react";

interface FilterContextType {
  searchquery: string;
  setSearchquery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  keyword: string;
  setKeywords: (keyword: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const FilterContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchquery, setSearchquery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [keyword, setKeywords] = useState<string>('');
  

  return (
    <FilterContext.Provider
      value={
        {searchquery,
          setSearchquery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeywords}
      }
    >
      {children}
    </FilterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () =>{
  const context = useContext(FilterContext)
  if(context === undefined ){
    throw new Error("usefilter must be used within a FilterProvider")
  }
  return context
}

export default FilterContextProvider;
