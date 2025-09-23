import React from 'react';
import { Link, useParams } from 'react-router-dom';

const LayoutSideCard = ({ item, itemIndex }) => {
  const { id } = useParams(); // id is a string

  return (
    <div>
      <Link to={`/course/${itemIndex + 1}`}>
        <div
          className={`flex gap-4 items-center w-full ${
            String(itemIndex + 1) === id ? "bg-rose-500" : "bg-gray-600"
          } p-3 rounded-md`}
        >
          <p className="rounded-lg">{item.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default LayoutSideCard;
