
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className=" max-w-sm md:max-w-md mx-auto text-center">
            <h3 className="text-[#D99904] italic text-xl pb-3">{subHeading}</h3>
            <h3 className="uppercase text-4xl border-y-4 py-5">{heading}</h3>
        </div>
    );
};

export default SectionTitle;