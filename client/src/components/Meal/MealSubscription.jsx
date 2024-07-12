import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { MdEmail, MdDateRange } from 'react-icons/md'
import { RiIncreaseDecreaseLine } from 'react-icons/ri'
import { FiUser, FiPhone, FiClock } from 'react-icons/fi'
import { addOrder } from '../../redux/order/order.action'
import logo from '../TiffinWalaLogo.png'

function MealSubscription() {
  const user = useSelector((state) => state.user.user)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("")

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setMobileNumber(user.phoneNumber)
    } else {
      setName("")
      setEmail("")
    }
  }, [user])

  const food = useSelector((state) => state.foods.food)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      toast.error("Please log in to place an order")
      navigate('/signin')
    }
    if (quantity > food.quantity)
      return toast.error("Cannot provide this quantity")
    let totalAmount = food.price * quantity
    const data = {
      user: user._id,
      food: food._id,
      provider: food.provider,
      quantity,
      address,
      time,
      date,
      totalAmount
    }
    let options = {
      "key": 'rzp_test_yu67T9aDVZ2U2O',
      "amount": Number(totalAmount) * 100,
      "currency": "INR",
      "name": "TiffinWala",
      "description": "Test Transaction",
      "image": logo,
      "handler": function (response) {
        if (response.razorpay_payment_id) {
          data.paymentStatus = "Success"
          dispatch(addOrder(data))
          toast.success("Order Placed Successfully")
          navigate('/orders')
        } else {
          toast.error("Unable to place order, please try again")
        }
      },
      "prefill": {
        "name": `${user.name}`,
        "email": `${user.email}`,
        "contact": "9999999999"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open()
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gradient-to-r to-white">
      <form className="w-full max-w-md p-8 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">Order Your Tiffin Now</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">Name</label>
            <div className="flex items-center border rounded-lg bg-white">
              <span className="px-3 py-2 text-gray-500"><FiUser /></span>
              <input
                type="text"
                value={name}
                name="name"
                placeholder="Enter Your Name"
                className="w-full px-3 py-2 border-none rounded-r-lg focus:outline-none"
                id="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">Email</label>
            <div className="flex items-center border rounded-lg bg-white">
              <span className="px-3 py-2 text-gray-500"><MdEmail /></span>
              <input
                type="email"
                value={email}
                name="email"
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border-none rounded-r-lg focus:outline-none"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block font-semibold text-gray-700 mb-2">Mobile Number</label>
            <div className="flex items-center border rounded-lg bg-white">
              <span className="px-3 py-2 text-gray-500"><FiPhone /></span>
              <input
                type="tel"
                value={mobileNumber}
                name="phone"
                placeholder="Enter Your Mobile Number"
                className="w-full px-3 py-2 border-none rounded-r-lg focus:outline-none"
                id="phone"
                required
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="quantity" className="block font-semibold text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center border rounded-lg bg-white">
              <span className="px-3 py-2 text-gray-500"><RiIncreaseDecreaseLine /></span>
              <input
                type="number"
                min={1}
                value={quantity}
                name="quantity"
                placeholder="Enter Quantity"
                className="w-full px-3 py-2 border-none rounded-r-lg focus:outline-none"
                id="quantity"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block font-semibold text-gray-700 mb-2">Date</label>
            <div className="flex items-center border rounded-lg bg-white">
              <span className="px-3 py-2 text-gray-500"><MdDateRange /></span>
              <input
                type="date"
                value={date}
                name="date"
                className="w-full px-3 py-2 border-none rounded-r-lg focus:outline-none"
                id="date"
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="time" className="block font-semibold text-gray-700 mb-2">Time</label>
            <div className="flex items-center border rounded-lg bg-white">
              <span className="px-3 py-2 text-gray-500"><FiClock /></span>
              <input
                type="time"
                value={time}
                name="time"
                className="w-full px-3 py-2 border-none rounded-r-lg focus:outline-none"
                id="time"
                required
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block font-semibold text-gray-700 mb-2">Address</label>
            <textarea
              value={address}
              name="address"
              rows={4}
              placeholder="Enter Your Address"
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none"
              id="address"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Order Meal"
              className="bg-slate-900 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-slate-800 transition-colors duration-300 w-full"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default MealSubscription
