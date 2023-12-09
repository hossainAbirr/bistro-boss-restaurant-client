import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

import SectionTitle from "../../../SharedComponents/SectionTitle";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    console.log(payments);
    return (
        <div>
            <SectionTitle
                subHeading={'---At a Glance!---'}
                heading={'PAYMENT HISTORY'}
            ></SectionTitle>

            <h2 className='text-3xl font-bold font-fontCinzel mt-5'>Total Payments : {payments.length}</h2>
            <div className="overflow-x-auto mt-8">

                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#D1A054] text-white font-fontCinzel '>
                            <th className="rounded-tl-2xl">
                                <label>
                                    {/* <input type="checkbox" className="checkbox" /> */}
                                </label>
                            </th>
                            <th>Email</th>
                            <th>Transaction Id</th>
                            <th>Total Price</th>
                            <th className="rounded-tr-2xl">Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payments.map((item, idx) => <tr key={item._id}>
                                <th>
                                    <label>
                                        {idx + 1}
                                    </label>
                                </th>
                                <td>
                                    <p>{item.email}</p>
                                </td>
                                <td>
                                    <p>{item.transactionId}</p>
                                </td>
                                <td>
                                    <p>${item.price}</p>
                                </td>
                                <td>
                                    <p className="text-[#737373]">{item.date}</p>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;