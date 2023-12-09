import SectionTitle from "../../../SharedComponents/SectionTitle";
import featured from '../../../../assets/home/featured.jpg'
const FeaturedItem = () => {
    return (
        <div className="text-white  bg-fixed" style={{ backgroundImage: `url(${featured})` }}>
            <div className="h-full py-20 w-full text-white bg-gradient-to-r from-[#151515B3] to-[#151515B3] opacity-70">
                <SectionTitle
                    subHeading={'---Check it out---'}
                    heading={'Featured Item'}
                    className={''}
                ></SectionTitle>
                <div className="md:flex justify-center items-center gap-12 pt-12 px-36">
                    <div className="flex-1">
                        <img className="" src={featured} alt="" />
                    </div>
                    <div className="flex-1 ">
                        <h2>March , 20, 2023</h2>
                        <h2 className="uppercase">Where Can i get some?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque nemo est aut eum laudantium natus incidunt consequuntur minus recusandae qui voluptas possimus asperiores, quidem amet eius expedita laborum, nulla fugit ex. Quia sit maiores dignissimos architecto nemo, eius debitis quis quas quidem repudiandae voluptatibus neque vitae exercitationem id hic sapiente.</p>
                        <button className="btn text-white border-0 border-b-[3px] bg-transparent">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedItem;