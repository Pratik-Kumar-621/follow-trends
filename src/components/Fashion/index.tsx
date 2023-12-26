import React, { useState } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { fuse } from "../../App";
import { data } from "../../data/data";
import FashionUI from "./FashionUI";
import "./fashion.scss";
import { typeOfData } from "../../data/type";

const Fashion: React.FC = () => {
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const name: string | any = searchparams.get("search");
  const [searchRes, setSearchRes] = useState<typeOfData[]>([]);
  React.useEffect(() => {
    const unsubscribe = () => {
      setSearchRes([
        ...data.filter((val) => val.name.includes(name)),
        ...fuse
          .search(name)
          .filter((val) => !val.item.name.includes(name))
          .map((val) => val.item),
      ]);
    };
    unsubscribe();
  }, [name]);

  const [inputSearch, setInputSearch] = useState<string>("");
  const [searchList, setSearchList] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  console.log(priceRange);

  // Brands
  const brandSet: Set<string> = new Set(searchRes.map((val) => val.brandName));
  const brands: string[] = Array.from(brandSet);
  console.log(selectedBrand);

  // Ratings
  const ratings: number[] = [1, 2, 3, 4, 5];

  const handleListClick = (name: string) => {
    console.log("CLICKED");

    navigate({
      pathname: "/fashion",
      search: createSearchParams({
        search: name,
      }).toString(),
    });
  };

  const ranges = ["range_500", "range_btw", "range_3000"];
  const handleInputChange = (e: any) => {
    setInputSearch(e.target.value);
    setSearchList(
      data
        .filter((val) => val.name.includes(inputSearch))
        .map((val) => val.name)
    );
  };
  const handleEnterPress = (e: any) => {
    if (e.key === "Enter") {
      navigate({
        pathname: "/fashion",
        search: createSearchParams({
          search: inputSearch,
        }).toString(),
      });
    }
  };
  const handleSearch = () => {
    console.log(fuse.search(inputSearch));
    navigate({
      pathname: "/fashion",
      search: createSearchParams({
        search: inputSearch,
      }).toString(),
    });
  };
  return (
    <FashionUI
      {...{
        brands,
        searchRes,
        selectedBrand,
        setSelectedBrand,
        ranges,
        priceRange,
        setPriceRange,
        ratings,
        ratingFilter,
        setRatingFilter,
        handleListClick,
        inputSearch,
        handleInputChange,
        handleEnterPress,
        handleSearch,
        searchList,
        setSearchRes,
      }}
    />
  );
};

export default Fashion;
