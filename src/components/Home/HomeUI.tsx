import React, { useState } from "react";
import { typeOfData } from "../../data/type";

import { Modal } from "antd";

import { Search, Logo } from "../../assets/images";
import ViewModal from "../Modal/ViewModal";

interface Props {
  dataList: typeOfData[];
  handleListClick: (name: string) => void;
  inputSearch: string;
  handleInputChange: (e: any) => void;
  handleEnterPress: (e: any) => void;
  handleSearch: () => void;
  searchList: string[];
  setData: any;
}

const HomeUI: React.FC<Props> = (props) => {
  const {
    dataList,
    handleListClick,
    inputSearch,
    handleInputChange,
    handleEnterPress,
    handleSearch,
    searchList,
    setData,
  } = props;
  const [isInputFocused, setInputFocus] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(false);

  const handleInputFocus = () => {
    setInputFocus(true);
    setShowList(true);
  };

  const handleInputBlur = () => {
    setShowList(false);
    setInputFocus(false);
  };
  return (
    <div className="home">
      {/* Home Logo */}
      <div className="home-logo" onClick={handleInputBlur}>
        <img src={Logo} alt="" />
      </div>
      {/* ----------------- */}
      {/* Home Search */}
      <div className="home-search">
        <input
          className="home-search-input"
          type="text"
          placeholder="Search"
          value={inputSearch}
          onFocus={handleInputFocus}
          // onBlur={() => setShowList(false)}
          onChange={handleInputChange}
          onKeyPress={handleEnterPress}
        />
        <div className="home-search-button" onClick={handleSearch}>
          <img src={Search} alt="" />
        </div>
        {searchList && inputSearch.length > 0 && showList && (
          <div className="home-search-list">
            {searchList.splice(0, 20).map((val) => (
              <div
                className="home-search-list-item"
                onClick={() => handleListClick(val)}
              >
                {val}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ----------------- */}
      {/* Home List */}
      {isInputFocused && (
        <div style={{ position: "relative" }}>
          <div
            onClick={handleInputBlur}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          ></div>
          <div className="home-list" onClick={() => setShowList(false)}>
            <div className="home-list-trend">
              <div className="home-list-trend-heading">Latest Trends</div>
              <div className="home-list-trend-list">
                {dataList
                  .sort((a, b) => b.trendingPercentage - a.trendingPercentage)
                  .slice(0, 5)
                  .map((val) => (
                    <>
                      <TrendItem {...{ val, setData, dataList }} />
                    </>
                  ))}
              </div>
            </div>
            <div className="home-list-suggestion">
              <div className="home-list-suggestion-heading">
                Popular Suggestions
              </div>
              <div className="home-list-suggestion-list">
                {dataList
                  .sort(
                    (a, b) => b.suggestionPercentage - a.suggestionPercentage
                  )
                  .slice(0, 5)
                  .map((val) => (
                    <div
                      className="home-list-suggestion-list-item"
                      onClick={() => handleListClick(val.name)}
                    >
                      <div className="home-list-suggestion-list-item-name">
                        {val.name}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ----------------- */}
    </div>
  );
};

interface TrendProp {
  val: any;
  dataList: typeOfData[];
  setData: any;
}
const TrendItem: React.FC<TrendProp> = (props) => {
  const { val, dataList, setData } = props;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="home-list-trend-list-item" onClick={() => setOpen(true)}>
        <img
          className="home-list-trend-list-item-image"
          src={val.image}
          alt={val.name}
        />
        <div className="home-list-trend-list-item-name">{val.name}</div>
      </div>
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        centered
        width={450}
        footer={null}
      >
        <ViewModal {...{ val, dataList, setData, setOpen }} />
      </Modal>
    </div>
  );
};

export default HomeUI;
