import "./TripCategory.css";

import { Link } from "react-router-dom";

function TripCategory(props) {
  const allCategory = props.category;

  return (
    <div className="category">
      <h1>Featured Trips</h1>
      <div className="category_controls">
        {allCategory.map((item) => {
          const src = item.category_img;

          return (
            <Link
              to={`/hotels/listing/${item.category_name}`}
              key={item.category_id}
            >
              <div className="category_control">
                <img src={src} alt={item.category_name} />

                <div>
                  <h2>{item.category_name}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TripCategory;
