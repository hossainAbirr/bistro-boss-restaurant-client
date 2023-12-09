import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { GiChefToque, GiWallet } from "react-icons/gi";
import { FaTruckMoving, FaUsers } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const AdminHome = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: statistics = {} } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            const res = await axiosSecure.get('/statistics');
            return res.data;
        }
    })
    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data
        }
    })

    // custom shape for bar chart 
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    // custom shape for pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })
    console.log(pieChartData);
    return (
        <div>
            <h3>Hello, Welcome {user ? user?.displayName : 'Back'}</h3>

            <section className="p-6 my-6 text-white dark:bg-gray-800 dark:text-gray-100">
                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                    <div className="flex p-2 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <GiWallet className="text-5xl"></GiWallet>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leadi">{statistics?.revenue}</p>
                            <p className="capitalize">Revenues</p>
                        </div>
                    </div>
                    <div className="flex bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] p-2 rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <FaUsers className="text-5xl"></FaUsers>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leadi">{statistics?.customers}</p>
                            <p className="capitalize">Customers</p>
                        </div>
                    </div>
                    <div className="flex p-2 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <GiChefToque className="text-5xl"></GiChefToque>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leadi">{statistics?.products}</p>
                            <p className="capitalize">Produccts</p>
                        </div>
                    </div>
                    <div className="flex p-2 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <FaTruckMoving className="text-5xl"></FaTruckMoving>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leadi">{statistics.orders}</p>
                            <p className="capitalize">Orders</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            legendType="rect"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;