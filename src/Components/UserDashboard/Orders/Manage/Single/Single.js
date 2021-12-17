import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Single = ({ item }) => {
  const showTemp = () => {
    return {
      __html: item.description,
    };
  };
  return (
    <>
      <div className="card">
        <div className="row g-0">
          <div className="col-lg-4">
            <img
              src={item?.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-lg-8">
            <div className="card-body">
              <h5 className="card-title">
                {item?.name} X {item.quintity}
              </h5>
              <div
                className="card-text"
                dangerouslySetInnerHTML={showTemp()}
              ></div>
              <p className="card-text m-0">
                Price:<small className="text-muted"> {item?.price}$</small>
              </p>
              <p className="card-text m-0">
                Delivery time:
                <small className="text-muted"> {item?.deliveryTime}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Single;
