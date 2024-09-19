import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from 'swiper'
import DeliveryCard from './DeliveryCard';

function FoodCarousel() {
    const items = [
        {   // image:"https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
            // title:"Pizza"
            image:"/Tiffin/Tiffin1.jpg",
        },
        {
            image:"/Tiffin/Tiffin2.jpg",
        },
        {
         
            image:"/Tiffin/Tiffin3.jpg",
        },
        {
            image:"/Tiffin/Tiffin5.jpg",
        },
        {
            image:"/Tiffin/Tiffin6.jpg",
        },
        {
            image:"/Tiffin/Tiffin7.jpg",
        },
        {
            image:"/Tiffin/Tiffin8.jpg",
        },
        {
            image:"/Tiffin/Tiffin9.jpeg",
        },
       
    ]
    const slideConfig = {
        slidesPerView: 6,
        spaceBetween: 0,
        pagination: {
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        },
        modules: [Navigation],
        className: "mySwiper",
        navigation: true,
      };

  return (
    <div>
        <h5 className='font-semibold text-2xl py-2 lg:px-16 md:px-8 px-4'>Inspiration for your first order</h5>
            <div className='px-2.5 py-5 md:hidden flex items-center justify-center gap-2.5 flex-wrap'>
                {items.map((item)=>(
                    <DeliveryCard {...item} key={item.title}></DeliveryCard>
                ))}
            </div>
        <div className='hidden md:flex py-5'>
            <Swiper {...slideConfig}>
                {items.map((item,index) =>(
                    <SwiperSlide key={index}>
                        <DeliveryCard {...item}></DeliveryCard>
                    </SwiperSlide>
                ))}
            </Swiper>
      </div>
    </div>
  )
}

export default FoodCarousel