/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/product/productSlice";
import ReactPaginate from "react-paginate";

function OurStore() {
  const productState = useSelector((state) => state?.product?.product);
  const [grid, setGrid] = useState(6);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Filter States
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  useEffect(() => {
    let newBrands = [];
    let category = [];

    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      category.push(element.category.toLowerCase());
      newBrands.push(element.brand.toLowerCase());
    }
    setCategories(category);
    setBrands(newBrands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productState]);

  // console.log([...new Set(categories)]);
  // console.log([...new Set(brands)]);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, [sort, brand, category, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(getAllProduct({ sort, brand, category, minPrice, maxPrice }));
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />

      <section className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-xl-3 store-brand">
              <div className="filter-card mb-3">
                <h3 className="filter-tilte">Shop by Brands</h3>
                <div>
                  <ul className="ps-0">
                    {brands &&
                      [...new Set(brands)].map((item, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              setBrand(item);
                            }}
                          >
                            {" "}
                            {item}{" "}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>

              <div className="filter-card mb-3 store-filter">
                <h3 className="filter-tilte">Filter by</h3>
                <div>
                  <h5 className="sub-title">Availablity</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" for="">
                        In stock (1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                        checked
                      />
                      <label className="form-check-label" for="">
                        Out of stock (2)
                      </label>
                    </div>
                  </div>

                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div class="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        name="formId1"
                        id="formId1"
                        placeholder="From"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label htmlFor="formId1">From</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        name="formId1"
                        id="formId1"
                        placeholder="To"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label htmlFor="formId1">To</label>
                    </div>
                  </div>

                  <h5 className="sub-title">Size</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" for="">
                        S(1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                        checked
                      />
                      <label className="form-check-label" for="">
                        M(2)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-card mb-3">
                <h3 className="filter-tilte store-category">
                  Category product
                </h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {categories &&
                      [...new Set(categories)].map((item, index) => {
                        return (
                          <span
                            onClick={() => setCategory(item)}
                            className="barge bg-light text-secondary rounded-3 py-2 px-2"
                            key={index}
                          >
                            {item.toUpperCase()}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-9">
              <div className="filter-sort-grid">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort By:
                    </p>

                    <select
                      class="form-control form-select "
                      name=""
                      id=""
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="best-selling" selected disabled>
                        Choose sort you want
                      </option>
                      <option value="title">A-Z, name product </option>
                      <option value="-title">Z-A, name product</option>
                      <option value="price">Price, low to high</option>
                      <option value="-price">Price, high to low</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="total-product mb-0">
                      {productState?.length} Products
                    </p>
                    <div className="d-flex align-items-center gap-10 grid choose-grid">
                      <img
                        src="images/gr4.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(3);
                        }}
                      />
                      <img
                        src="images/gr3.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(4);
                        }}
                      />
                      <img
                        src="images/gr2.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(6);
                        }}
                      />
                      <img
                        src="images/gr.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(12);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-list py-4">
                <div className="d-flex gap-10 flex-wrap product-item">
                  <ProductCard
                    data={productState ? productState : []}
                    grid={grid}
                  />
                </div>

                {/* <ReactPaginate
                  previousLabel="Previous"
                  nextLabel="Next"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  //   breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  pageCount={productState.length}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  //   onPageChange={handlePageChange}
                  containerClassName="pagination"
                  activeClassName="active"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OurStore;
