import React, { useState } from "react";
import { typeOfData } from "../../data/type";
import { Modal } from "antd";
import { HeartOutlined, HeartFilled, StarFilled } from "@ant-design/icons";
import ViewModal from "../Modal/ViewModal";
interface Props {
  val: any;
  searchRes: typeOfData[];
  setSearchRes: any;
}
const SearchItem: React.FC<Props> = (props) => {
  const { val, searchRes, setSearchRes } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="fashion-content-list-item">
      <div className="fashion-content-list-item-image">
        <img src={val.image} alt={val.name} />
        <div
          className="like"
          onClick={() => {
            const itemIndex = searchRes.findIndex((item) => item.id === val.id);

            if (itemIndex !== -1) {
              const updatedItems = [...searchRes];
              const tempFav = updatedItems[itemIndex].favourite;
              updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                favourite: !tempFav,
              };
              setSearchRes(updatedItems);
            }
          }}
        >
          {val.favourite ? (
            <HeartFilled style={{ color: "red" }} />
          ) : (
            <HeartOutlined style={{ color: "white" }} />
          )}
        </div>
        <div
          className="fashion-content-list-item-image-detail"
          onClick={() => setOpen(true)}
          style={{ display: "inline-block" }}
        >
          View Product
        </div>
      </div>
      <div className="fashion-content-list-item-name">{val.name}</div>
      <div className="fashion-content-list-item-price">
        <span>Rs. {val.price}</span>
        <span>
          {" "}
          &nbsp; Rs.
          {val.price - Math.round((val.discount * val.price) / 100)}
        </span>
      </div>
      <div className="fashion-content-list-item-star">
        {[...Array(parseInt(val.rating))].map(() => (
          <span className="positiveStar">
            <StarFilled style={{ color: "#fff110" }} />
          </span>
        ))}
        {[...Array(5 - parseInt(val.rating))].map(() => (
          <span className="negativeStar">
            <StarFilled style={{ color: "#e1e1e1" }} />
          </span>
        ))}
        &nbsp;
        {"("}
        {val.noOfRatings}
        {")"}
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
        <ViewModal
          {...{ val, setOpen }}
          dataList={searchRes}
          setData={setSearchRes}
        />
      </Modal>
    </div>
  );
};

export default SearchItem;
