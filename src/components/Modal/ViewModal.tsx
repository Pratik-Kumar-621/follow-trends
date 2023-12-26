import React from "react";
import { HeartOutlined, HeartFilled, StarFilled } from "@ant-design/icons";
import { Button } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";
import { typeOfData } from "../../data/type";
interface Props {
  val: any;
  dataList: typeOfData[];
  setData: any;
  setOpen: any;
}
const ViewModal: React.FC<Props> = (props) => {
  const { val, dataList, setData, setOpen } = props;
  const navigate = useNavigate();

  return (
    <div className="modal">
      <div className="modal-heading">Product Detail</div>
      <div className="modal-details">
        <div className="modal-details-image">
          <img src={val.image} alt="" />
          <div
            className="like"
            onClick={() => {
              const itemIndex = dataList.findIndex(
                (item) => item.id === val.id
              );

              if (itemIndex !== -1) {
                const updatedItems = [...dataList];
                const tempFav = updatedItems[itemIndex].favourite;
                updatedItems[itemIndex] = {
                  ...updatedItems[itemIndex],
                  favourite: !tempFav,
                };
                setData(updatedItems);
              }
            }}
          >
            {val.favourite ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined style={{ color: "white" }} />
            )}
          </div>
        </div>
        <div className="modal-details-content">
          <div className="modal-details-content-name">{val.name}</div>
          <div className="modal-details-content-brand_name">
            {val.brandName}
          </div>
          <div className="modal-details-content-price">
            <span>Rs. {val.price}</span>
            <span>
              {" "}
              &nbsp; Rs.
              {val.price - Math.round((val.discount * val.price) / 100)}
            </span>
          </div>
          <div className="modal-details-content-discount">
            Discount: <span>{val.discount}%</span>
          </div>
          <div className="modal-details-content-star">
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
            &nbsp; &nbsp;
            {"("}
            {val.noOfRatings}
            {")"}
          </div>
          <div className="modal-details-content-trending_value">
            Trending Percentage: <span>{val.trendingPercentage}%</span>
          </div>
          <div className="modal-details-content-suggestion_value">
            Suggestion Percentage: <span>{val.suggestionPercentage}%</span>
          </div>
        </div>
      </div>
      <div className="modal-buttons">
        <Button
          type="primary"
          onClick={() => {
            setOpen(false);
            navigate({
              pathname: "/fashion",
              search: createSearchParams({
                search: val.name,
              }).toString(),
            });
          }}
        >
          Related Products
        </Button>
        <Button danger onClick={() => setOpen(false)}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ViewModal;
