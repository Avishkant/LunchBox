import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../Skeleton';

function MealBox({ foods }) {
  const [loading, setLoading] = useState(true);

  if (!foods || foods.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 w-full">
        <p className="font-semibold text-gray-500">No Meals Found</p>
      </div>
    );
  }

  return (
    <div className="lg:px-12 md:px-6 px-4 py-4">
      <h1 className="font-bold text-2xl text-center mb-6">All Meal Plans</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {foods.map((food, index) => {
          if (food.quantity > 0) {
            return (
              <Link to={`/food/${food._id}`} key={index} className="group block rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="overflow-hidden rounded-t-lg">
                  {loading && <Skeleton />}
                  <img
                    src={food.image}
                    className={`w-full h-40 object-cover ${loading ? 'hidden' : 'block'}`}
                    onLoad={() => setLoading(false)}
                    alt={food.name}
                  />
                </div>
                <div className="p-4 bg-white rounded-b-lg">
                  <h3 className="font-semibold mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">{food.name}</h3>
                  <div className="flex justify-between items-center text-gray-700">
                    <p>Price</p>
                    <p>₹ <span className="font-semibold">{food.price}/meal</span></p>
                  </div>
                </div>
              </Link>
            );
          } else {
            return <div key={index} className="hidden"></div>;
          }
        })}
      </div>
    </div>
  );
}

export default MealBox;
