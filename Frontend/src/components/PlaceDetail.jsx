import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddRating from "./AddRating";
import ReviewCard from "./ReviewCard";
import MapView from "./MapView";

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  // Fetch place details
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/admin/places/${id}`);
        setPlace(res.data);
      } catch (err) {
        console.error("Failed to fetch place", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  // Fetch reviews for the place
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/api/reviews/${id}`,{withCredentials:true});
        console.log(res.data);
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!place) {
    return <div className="text-center mt-10 text-red-500">Place not found</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mt-4 text-center">{place.name}</h2>
      <div className="flex flex-col bg-white shadow-lg rounded-lg w-3/5 p-6 mx-auto">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full h-60 object-cover rounded-lg"
        />
        <p className="text-gray-600 mt-2">{place.description}</p>
        <p className="text-gray-700 mt-1 font-medium">Location: {place.location}</p>
        <div className="rating mt-2">
          Rating:
          {[...Array(5)].map((_, i) => (
            <input
              key={i}
              type="radio"
              className="mask mask-star-2 bg-yellow-400"
              readOnly
              checked={i < place.avgRating}
            />
          ))}
        </div>
        <button
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => navigate("/places")}
        >
          Close
        </button>
      </div>

      <div>
        <AddRating />
      </div>

      <div className="my-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mt-4 text-center">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-center mt-2">No reviews yet.</p>
        ) : (
          reviews.map((review,index) => (
            <ReviewCard key={index} review={review} />
          ))
        )}
      </div>

      <MapView placeName={place.location} />
    </>
  );
};

export default PlaceDetail;
