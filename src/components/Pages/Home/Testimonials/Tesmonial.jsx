import { useEffect, useState } from "react";
import SectionTitle from "../../../SharedComponents/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Lottie from 'lottie-react';
import qoutation from '../../../../assets/qoutation.json'
const Tesmonial = () => {
    const [reviews, setReviews] = useState([]);
    console.log(reviews);

    useEffect(() => {
        fetch('http://localhost:3900/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section>
            <SectionTitle
                subHeading={'---What Our Clients Say---'}
                heading={'TESTIMONIALS'}
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}

                    >
                        <div className="flex flex-col items-center mt-10">
                            <Rating
                                style={{ maxWidth: 250 }}
                                value={review.rating}
                                readOnly
                            />
                            <Lottie className="w-20 mt-5" animationData={qoutation} loop={true}></Lottie>
                            <div className="mx-24 mb-24 mt-10">

                                <p>{review.details}</p>
                                <h3 className="">{review.name}</h3>
                            </div>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </section>
    );
};

export default Tesmonial;