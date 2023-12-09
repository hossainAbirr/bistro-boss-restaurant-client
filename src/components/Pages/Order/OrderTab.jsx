
import FoodCard from '../../SharedComponents/FoodCard/FoodCard';

const OrderTab = ({ item }) => {
    return (
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {
                item.map(food => <FoodCard
                    key={food._id}
                    food={food}

                ></FoodCard>)
            }
        </div>
    );
};

export default OrderTab;