import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Avatar, Rating } from '@mui/material';
import { useSelector } from 'react-redux';

dayjs.extend(relativeTime);

function Reviews() {
    const reviews = useSelector((state) => state.reviews.providerReviews);

    return (
        <div className="bg-gradient-to-r from-teal-50 to-white min-h-screen py-10">
            {reviews && reviews.length > 0 ? (
                <div className="container mx-auto px-4 md:px-8">
                    <h1 className="text-2xl font-bold text-primary mb-6 text-center">Customer Reviews</h1>
                    <div className="space-y-6">
                        {reviews.map((review, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                <div className="flex items-center gap-4 mb-2">
                                    <Avatar />
                                    <h5 className="text-lg font-medium">{review.user.name}</h5>
                                </div>
                                <div className="flex items-center mb-2">
                                    <Rating name="read-only" size="small" value={review.rating} precision={0.5} readOnly />
                                </div>
                                <p className="text-sm text-gray-400 mb-2">{dayjs().to(dayjs(review.createdAt))}</p>
                                <p className="text-gray-700">{review.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-lg font-semibold text-gray-500">No Reviews Available</p>
                </div>
            )}
        </div>
    );
}

export default Reviews;
