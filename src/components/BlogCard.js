import { Link } from "react-router-dom";
import { dataBlogs } from "../utils/DataBlogs";

function BlogCard() {
  return (
    <>
      {dataBlogs.map((item, index) => {
        return (
          <div className="col-12 col-xl-3">
            <div className="blog-card">
              <div className="card-image">
                <img className="img-fluid" src={item?.image} alt="blog" />
              </div>
              <div className="blog-content">
                <p className="date">
                  {new Date().getDay()}/{new Date().getMonth()}/
                  {new Date().getFullYear()}
                </p>
                <h5 className="title">{item?.title}</h5>
                <p className="desc">{item?.desc}</p>
                <Link to="/" className="button">
                  Read Now
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default BlogCard;
