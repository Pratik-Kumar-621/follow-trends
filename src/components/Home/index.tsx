import React, { useState } from "react";
import HomeUI from "./HomeUI";
import "./home.scss";
import { data } from "../../data/data";
import { fuse } from "../../App";
import { createSearchParams, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState<string>("");
  const [searchList, setSearchList] = useState<string[]>([]);
  const [dataList, setData] = useState(data);

  const handleListClick = (name: string) => {
    console.log(fuse.search(name));
    navigate({
      pathname: "/fashion",
      search: createSearchParams({
        search: name,
      }).toString(),
    });
  };
  const handleInputChange = (e: any) => {
    setInputSearch(e.target.value);
    setSearchList(
      data
        .filter((val) => val.name.includes(inputSearch))
        .map((val) => val.name)
    );
  };
  console.log(searchList);

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
    <HomeUI
      {...{
        dataList,
        setData,
        handleListClick,
        inputSearch,
        handleInputChange,
        handleEnterPress,
        handleSearch,
        searchList,
      }}
    />
  );
};

export default Home;
