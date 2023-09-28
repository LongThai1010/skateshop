import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function SpecialProduct() {
    return (
        <div className="col-4">
            <div className="special-product-card">
                <div className="d-flex justify-content-between ">
                    <div>
                        <img className="img-fluid" src="images/watch.jpg" alt="product_image" />
                    </div>
                    <div className="special-product-content">
                        <h5 className="brand">Havel</h5>
                        <p className="title">Sam Sung note 10</p>
                        <ReactStars
                            count={5}
                            size={24}
                            value={5}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className="price">
                            <span className="red-p">100$</span> &nbsp; <strike>200$</strike>
                        </p>
                        <div className="discount-till d-flex align-items-center gap-10">
                            <p className="mb-0">
                                <b>5</b>days
                            </p>
                            <div className="d-flex gap-10 align-items-center ">
                                <span className="badge rounded-circle p-2 bg-danger">1</span>:
                                <span className="badge rounded-circle p-2 bg-danger">2</span>:
                                <span className="badge rounded-circle p-2 bg-danger">3</span>
                            </div>

                        </div>
                        <Link className="button my-3">Add to cart</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecialProduct;