
const MenuItem = ({ menu }) => {
    const { name, image, recipe, price } = menu;
    return (
        <div className="flex gap-8">
            <img className="rounded-r-[200px] rounded-bl-[200px] w-[100px]" src={image} alt="" />
            <div>
                <div className="flex justify-between">
                    <h2 className="text-xl text-[#151515]">{name}---------</h2>
                    <p className="text-[#BB8506]">${price}</p>
                </div>
                <p>{recipe}</p>
            </div>
        </div>
    );
};

export default MenuItem;