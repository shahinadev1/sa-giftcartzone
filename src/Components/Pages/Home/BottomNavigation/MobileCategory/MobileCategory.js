import React, { useState, useEffect } from "react";
import "../MobileCartModal/MobileCartModal.css";
import axios from "axios";
import CategoryLoading from "../../../../common/Loading/CategoryLoading";
import { useNavigate } from "react-router-dom";
const MobileCategory = ({ isOpen }) => {
  const { open2, setOpen2 } = isOpen;
  const [close, setClose] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const navigate = useNavigate();
  //get parent category
  useEffect(() => {
    setFetchLoading(true);
    axios
      .get("https://intense-basin-48901.herokuapp.com/parent-category")
      .then((res) => {
        setParentCategories(res.data.result);
      })
      .catch((err) => {
        // console.log(err.message);
      })
      .finally(() => {
        setFetchLoading(false);
      });
  }, []);

  //get sub category
  useEffect(() => {
    setFetchLoading(true);
    axios
      .get("https://intense-basin-48901.herokuapp.com/sub-category")
      .then((res) => {
        setSubCategories(res.data.result);
      })
      .catch((err) => {
        // console.log(err.message);
      })
      .finally(() => {
        setFetchLoading(false);
      });
  }, []);
  return (
    <>
      <div
        className={`mobile cart-modal shadow-lg border-0 card animate__fadeIn ${
          open2 && "open"
        } ${close ? "close" : ""}`}
      >
        <div className="mobile card-header bg-primary">
          <button
            className="btn btn-primary"
            onClick={() => {
              setOpen2(!open2);
            }}
          >
            X
          </button>
        </div>
        <div className="mobile card-body px-1 py-4">
          {fetchLoading ? (
            <>
              <CategoryLoading />
              <CategoryLoading />
              <CategoryLoading />
              <CategoryLoading />
            </>
          ) : (
            <>
              {parentCategories.length === 0 ? (
                <p>No category found!</p>
              ) : (
                parentCategories.map((parent) => (
                  <>
                    <div
                      class="accordion"
                      key={parent._id}
                      id="accordionExample"
                    >
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${parent._id}`}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            {parent.name}
                          </button>
                        </h2>
                        <div
                          id={`collapse-${parent._id}`}
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            {subCategories.map((subC) => (
                              <div key={subC._id}>
                                {subC.parentId === parent._id && (
                                  <p
                                    style={{ color: "#333" }}
                                    kye={subC._id}
                                    className="d-block text-decoration-none"
                                    onClick={() => {
                                      navigate(`/category/${subC.slug}`);
                                      setOpen2(!open2);
                                    }}
                                  >
                                    ---{subC.name}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileCategory;
