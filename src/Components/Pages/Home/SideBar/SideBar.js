import * as React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../../common/Loading/Loading";
import CategoryLoading from "../../../common/Loading/CategoryLoading";
export default function SideBar() {
  const [parentCategories, setParentCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [fetchLoading, setFetchLoading] = React.useState(false);
  //get parent category
  React.useEffect(() => {
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
  React.useEffect(() => {
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
                <div class="accordion" key={parent._id} id="accordionExample">
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
                              <Link
                                kye={subC._id}
                                className="d-block text-decoration-none"
                                to={`/category/${subC.slug}`}
                              >
                                ---{subC.name}
                              </Link>
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
    </>
  );
}
