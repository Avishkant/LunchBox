import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CircularProgress, Typography } from '@mui/material'
import TopNavigation from '../components/TopNavigation'
import HomeLayout from '../layouts/Home.layout'
import { getUserOrders, updateUserOrder } from '../redux/order/order.action'
import ReviewModal from '../components/ReviewModal'
import './CSS/orderPage.css'

function OrdersPage() {
    const orders = useSelector((state) => state.orders.userOrders)
    const allOrders = useSelector((state) => state.orders)
    const [reviewModal, setReviewModal] = useState(false)
    const [activeOrder, setActiveOrder] = useState("")
    let data = ""

    if (!orders || orders?.length === 0) {
        data = <p className='text-gray-600 flex items-center justify-center' style={{ height: '50vh' }}>No Orders Found</p>
    }
    
    const handleReviewModal = (order) => {
        setActiveOrder(order)
        setReviewModal(true)
    }
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserOrders())
    }, [dispatch])
    
    if (allOrders.loading) {
        return (
            <div className='w-full flex items-center justify-center' style={{ height: '50vh' }}>
                <CircularProgress />
            </div>
        )
    }
    
    const breadcrumbs = [
        <Link to='/' key="1" className='hover:underline'>
            Home
        </Link>,
        <Typography key="2" color="textPrimary">
            Orders
        </Typography>
    ];
    
    const handleCancel = (order) => {
        dispatch(updateUserOrder({ _id: order._id, status: "Cancelled", user: order.user, provider: order.provider, food: order.food, quantity: order.quantity }))
    }
    
    return (
        <div className='md:px-8 px-1 py-4'>
            <ReviewModal open={reviewModal} setOpen={setReviewModal} order={activeOrder} />
            <TopNavigation breadcrumbs={breadcrumbs} />
            <h1 className='text-3xl font-bold mb-4'>My Orders</h1>
            {orders && orders.length !== 0 ? (
                <div className='flex flex-col gap-4 pt-4 w-full'>
                    {orders.map((order, idx) => (
                        <div className='order-card' key={idx}>
                            <div className='order-card-image'>
                                <img src={order?.food?.image} alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className='order-card-content'>
                                <p><span className='font-bold'>Name:</span> {order?.food?.name}</p>
                                <p><span className='font-bold'>Quantity:</span> {order?.quantity}</p>
                                <p><span className='font-bold'>Price:</span> ₹{order?.totalAmount}</p>
                                <p><span className='font-bold'>Order Status:</span> {order?.orderStatus}</p>
                                <p><span className='font-bold'>Ordered Date:</span> {order?.date}</p>
                                <div className='flex gap-2 justify-between items-center mt-2'>
                                    {order?.orderStatus === "Ordered" && (
                                        <button className='cancel-button' onClick={() => handleCancel(order)}>Cancel Order</button>
                                    )}
                                    {order?.orderStatus === "Delivered" && (
                                        <button className='review-button' onClick={() => handleReviewModal(order)}>Write a Review</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : data}
        </div>
    )
}

export default HomeLayout(OrdersPage)
