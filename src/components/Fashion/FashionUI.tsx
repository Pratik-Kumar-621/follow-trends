import React, { useState } from "react";
import { typeOfData } from "../../data/type";
import { Collapse, Checkbox } from "antd";
// import { HeartOutlined, HeartFilled, StarFilled } from "@ant-design/icons";
import { StarFilled } from "@ant-design/icons";
import { Logo, Search } from "../../assets/images";
import SearchItem from "./SearchItem";

interface Props {
  brands: string[];
  searchRes: typeOfData[];
  selectedBrand: string[];
  setSelectedBrand: any;
  ranges: string[];
  priceRange: string[];
  setPriceRange: any;
  ratings: number[];
  ratingFilter: number[];
  setRatingFilter: any;
  handleListClick: (name: string) => void;
  inputSearch: string;
  handleInputChange: (e: any) => void;
  handleSearch: () => void;
  searchList: string[];
  handleEnterPress: (e: any) => void;
  setSearchRes: any;
}

const FashionUI: React.FC<Props> = (props) => {
  const {
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
  } = props;
  const [showList, setShowList] = useState<boolean>(false);
  return (
    <div className="fashion">
      <div className="fashion-logo" onClick={() => setShowList(false)}>
        <img src={Logo} alt="" />
      </div>
      <div className="fashion-search">
        <input
          className="fashion-search-input"
          type="text"
          placeholder="Search"
          value={inputSearch}
          onFocus={() => setShowList(true)}
          onChange={handleInputChange}
          onKeyPress={handleEnterPress}
        />
        <div className="fashion-search-button" onClick={handleSearch}>
          <img src={Search} alt="" />
        </div>
        {searchList && inputSearch.length > 0 && showList && (
          <div className="fashion-search-list">
            {searchList.splice(0, 20).map((val) => (
              <div
                className="fashion-search-list-item"
                onClick={() => handleListClick(val)}
              >
                {val}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="fashion-heading">Search Results</div>
      <div className="fashion-content">
        <div className="fashion-content-sidepanel">
          <div className="brand-collapse">
            <Collapse
              defaultActiveKey={["1"]}
              ghost
              expandIconPosition="end"
              items={[
                {
                  key: "1",
                  label: <div className="fashion-brand-heading">BRAND</div>,
                  children: (
                    <>
                      {brands.map((val) => (
                        <div
                          className="fashion-brand-item"
                          onClick={() =>
                            selectedBrand.includes(val)
                              ? setSelectedBrand(
                                  selectedBrand.filter((temp) => temp !== val)
                                )
                              : setSelectedBrand([...selectedBrand, val])
                          }
                        >
                          <Checkbox checked={selectedBrand.includes(val)} />
                          &nbsp; &nbsp;
                          <div>{val}</div>
                        </div>
                      ))}
                    </>
                  ),
                },
              ]}
            />
          </div>
          <div className="price-collapse">
            <Collapse
              defaultActiveKey={["1"]}
              ghost
              expandIconPosition="end"
              items={[
                {
                  key: "1",
                  label: (
                    <div className="fashion-brand-heading">PRICE RANGE</div>
                  ),
                  children: (
                    <>
                      {ranges.map((val) => (
                        <div
                          className="fashion-brand-item"
                          onClick={() =>
                            priceRange.includes(val)
                              ? setPriceRange(
                                  priceRange.filter((temp) => temp !== val)
                                )
                              : setPriceRange([...priceRange, val])
                          }
                        >
                          <Checkbox checked={priceRange.includes(val)} />
                          &nbsp; &nbsp;
                          <div>
                            {val === "range_500" && <>Under 500</>}
                            {val === "range_btw" && <>501 to 3000</>}
                            {val === "range_3000" && <>Above 3000</>}
                          </div>
                        </div>
                      ))}
                    </>
                  ),
                },
              ]}
            />
          </div>
          <div className="star-collapse">
            <Collapse
              defaultActiveKey={["1"]}
              ghost
              expandIconPosition="end"
              items={[
                {
                  key: "1",
                  label: <div className="fashion-brand-heading">RATINGS</div>,
                  children: (
                    <>
                      {ratings.map((val) => (
                        <div
                          className="fashion-brand-item"
                          onClick={() =>
                            ratingFilter.includes(val)
                              ? setRatingFilter(
                                  ratingFilter.filter((temp) => temp !== val)
                                )
                              : setRatingFilter([...ratingFilter, val])
                          }
                        >
                          <Checkbox checked={ratingFilter.includes(val)} />
                          &nbsp; &nbsp;
                          <div>
                            {[...Array(val)].map(() => (
                              <>
                                <span className="positiveStar">
                                  <StarFilled style={{ color: "#fff110" }} />
                                </span>
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "3px",
                                  }}
                                ></span>
                              </>
                            ))}

                            {[...Array(5 - val)].map(() => (
                              <>
                                <span className="negativeStar">
                                  <StarFilled style={{ color: "#e1e1e1" }} />
                                </span>
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "3px",
                                  }}
                                ></span>
                              </>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <div className="fashion-content-list">
          {searchRes
            .filter((val) => {
              if (
                selectedBrand.length > 0 &&
                selectedBrand.includes(val.brandName)
              ) {
                return true;
              } else if (selectedBrand.length === 0) return true;
              return false;
            })
            .filter((val) => {
              const dicPrice =
                val.price - Math.round((val.discount * val.price) / 100);
              if (priceRange.length === 0) return true;
              else {
                if (priceRange.includes("range_500") && dicPrice <= 500) {
                  return true;
                }
                if (
                  priceRange.includes("range_btw") &&
                  dicPrice > 500 &&
                  dicPrice <= 3000
                ) {
                  return true;
                }
                if (priceRange.includes("range_3000") && dicPrice > 3000)
                  return true;
              }
              return false;
            })
            .filter((val) => {
              if (
                ratingFilter.length > 0 &&
                ratingFilter.includes(val.rating)
              ) {
                return true;
              } else if (ratingFilter.length === 0) return true;
              return false;
            })
            .map((val) => (
              <SearchItem {...{ val, searchRes, setSearchRes }} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FashionUI;
