import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AdminHome = () => {
  const [stats, setStats] = useState({
    weeklyStats: { days: [], totalFunds: 0 },
    monthlyStats: { months: [], totalFunds: 0 },
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://litl-pal-server-margubtech-gmailcom.vercel.app/posts/stats")
      .then((data) => {
        setStats(data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }, []);
  const thisWeekMissingAdoptionPostsData = stats.weeklyStats.days.map(
    ({ dayOfWeek, adoptionCount, missingCount }) => ({
      name: dayOfWeek,
      "Adoption Posts": adoptionCount,
      "Missing Posts": missingCount,
    })
  );
  const thisWeekFoundAdoptedData = stats.weeklyStats.days.map(
    ({ dayOfWeek, adoptionSuccessCount, missingSuccessCount }) => ({
      name: dayOfWeek,
      "Found Pets": adoptionSuccessCount,
      "Adopted Pets": missingSuccessCount,
    })
  );
  const thisWeekFundsCollectionData = stats.weeklyStats.days.map(
    ({ dayOfWeek, totalFunds }) => ({
      name: dayOfWeek,
      "Funds Raised ($)": totalFunds,
    })
  );

  const thisMonthMissingAdoptionPostsData = stats.monthlyStats.months.map(
    ({ monthOfYear, adoptionCount, missingCount }) => ({
      name: monthOfYear,
      "Adoption Posts": adoptionCount,
      "Missing Posts": missingCount,
    })
  );
  const thisMonthFoundAdoptedData = stats.monthlyStats.months.map(
    ({ monthOfYear, adoptionSuccessCount, missingSuccessCount }) => ({
      name: monthOfYear,
      "Found Pets": adoptionSuccessCount,
      "Adopted Pets": missingSuccessCount,
    })
  );
  const thisMonthFundsCollectionData = stats.monthlyStats.months.map(
    ({ monthOfYear, totalFunds }) => ({
      name: monthOfYear,
      "Funds Raised ($)": totalFunds,
    })
  );

  return (
    <div className="px-5 pb-5">
      {/* --------------------------------------------------weekly */}
      <div>
        <h2 className="text-center text-2xl font-bold mb-5">This Week</h2>
        {loading ? (
          <div className="text-center">
            <span className="loading loading-spinner text-blue-500"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-amber-500 text-white p-5">
                <div>
                  <h3>Adoption Posts</h3>
                  <h4 className="text-4xl">
                    {stats.weeklyStats.days.reduce(
                      (prev, current) => prev + current.adoptionCount,
                      0
                    )}
                  </h4>
                </div>
              </div>
              <div className="bg-red-500 text-white p-5">
                <div>
                  <h3>Missing Posts</h3>
                  <h4 className="text-4xl">
                    {stats.weeklyStats.days.reduce(
                      (prev, current) => prev + current.missingCount,
                      0
                    )}
                  </h4>
                </div>
              </div>
              <div className="bg-green-500 text-white p-5">
                <div>
                  <h3>Successes</h3>
                  <h4 className="text-4xl">
                    {stats.weeklyStats.days.reduce(
                      (prev, current) =>
                        prev +
                        current.adoptionSuccessCount +
                        current.missingSuccessCount,
                      0
                    )}
                  </h4>
                </div>
              </div>
              <div className="bg-blue-500 text-white p-5">
                <div>
                  <h3>Raised Funds</h3>
                  <h4 className="text-4xl">
                    $ {stats.weeklyStats.totalFunds}
                  </h4>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div>
                <BarChart
                  width={500}
                  height={300}
                  data={thisWeekMissingAdoptionPostsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Missing Posts"
                    fill="#EF4444"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="Adoption Posts"
                    fill="#F59E0B"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </div>
              <div>
                {/* foundAdoptedChart */}
                <BarChart
                  width={500}
                  height={300}
                  data={thisWeekFoundAdoptedData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Found Pets"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="Adopted Pets"
                    fill="#82ca9d"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </div>
            </div>
            <div>
              {/* this week funds chart */}
              <BarChart
                width={500}
                className="mx-auto mt-5"
                height={300}
                data={thisWeekFundsCollectionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Funds Raised ($)"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
              </BarChart>
            </div>
          </>
        )}
      </div>
      {/* ------------------------------------------------- monthly */}
      <div className="mt-10">
        <h2 className="text-center text-2xl font-bold mb-5">This Month</h2>
        {loading ? (
          <div className="text-center">
            <span className="loading loading-spinner text-blue-500"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-amber-500 text-white p-5">
                <div>
                  <h3>Adoption Posts</h3>
                  <h4 className="text-4xl">
                    {stats.monthlyStats.months.reduce(
                      (prev, current) => prev + current.adoptionCount,
                      0
                    )}
                  </h4>
                </div>
              </div>
              <div className="bg-red-500 text-white p-5">
                <div>
                  <h3>Missing Posts</h3>
                  <h4 className="text-4xl">
                    {stats.monthlyStats.months.reduce(
                      (prev, current) => prev + current.missingCount,
                      0
                    )}
                  </h4>
                </div>
              </div>
              <div className="bg-green-500 text-white p-5">
                <div>
                  <h3>Successes</h3>
                  <h4 className="text-4xl">
                    {stats.monthlyStats.months.reduce(
                      (prev, current) =>
                        prev +
                        current.adoptionSuccessCount +
                        current.missingSuccessCount,
                      0
                    )}
                  </h4>
                </div>
              </div>
              <div className="bg-blue-500 text-white p-5">
                <div>
                  <h3>Raised Funds</h3>
                  <h4 className="text-4xl">
                    $ {stats.monthlyStats.totalFunds}
                  </h4>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div>
                <BarChart
                  width={500}
                  height={300}
                  data={thisMonthMissingAdoptionPostsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Missing Posts"
                    fill="#EF4444"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="Adoption Posts"
                    fill="#F59E0B"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </div>
              <div>
                {/* foundAdoptedChart */}
                <BarChart
                  width={500}
                  height={300}
                  data={thisMonthFoundAdoptedData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Found Pets"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="Adopted Pets"
                    fill="#82ca9d"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </div>
            </div>
            <div>
              {/* this week funds chart */}
              <BarChart
                width={500}
                className="mx-auto mt-5"
                height={300}
                data={thisMonthFundsCollectionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Funds Raised ($)"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
              </BarChart>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
