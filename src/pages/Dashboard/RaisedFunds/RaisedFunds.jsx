import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const RaisedFunds = () => {
  const [payments, setPayments] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);

  const getPayments = () => {
    axios
      .get(
        "https://litl-pal-server-margubtech-gmailcom.vercel.app/payments"
      )
      .then((res) => {
        setPayments(res.data);
        setPaymentsLoading(false);
      });
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-center text-2xl font-semibold mb-5">
        Funds Raised
      </h2>

      {paymentsLoading ? (
        <div className="text-center flex justify-center items-center">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <>
          {payments.length ? (
            <div className="overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Price</th>
                      <th>Donation For</th>
                      <th>Date</th>
                      <th>Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(
                      ({
                        _id,
                        email,
                        price,
                        donationFor,
                        date,
                        transactionId
                      }) => (
                        <tr key={_id}>
                          <td>
                            {email}
                          </td>
                          <td className="text-green-500 font-semibold">$ {price}</td>
                          <td>{donationFor || "All"}</td>
                          <td>{new Date(date).toDateString()}</td>
                          <td>{transactionId || "No TransactionId Recorded"}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-50 flex justify-center items-center text-gray-400">
              <span>No Successful Transaction Recorded</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RaisedFunds;
