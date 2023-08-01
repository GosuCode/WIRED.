// import prism from "../assets/prism.png";

import UserChart from "../components/charts/UserChart";
import moment from 'moment'

const Dashboard = () => {
  const stats = [
    { Name: "Users", number: "12" },
    { Name: "Post", number: "123" },
    { Name: "Likes", number: "200" },
    { Name: "Views", number: "245" },
  ];

  return (
    <div className="w-full grid place-items-center">
      <div className="w-[90%] mt-24">
        <div className="grid grid-cols-12 px-3 gap-3 md:gap-12 md:px-12 text-black place-items-center">
          {stats.map((val, key) => {
            return (
              <div
                key={key}
                className="bg-white col-span-3 w-full cursor-pointer rounded-lg h-20 grid place-items-center md:shadow-neon shadow-green"
              >
                <span className="font-bold">{val.Name}</span>
                <span>{val.number}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-20 h-[400px] ">
          <UserChart />
          <div className="text-white">
            <h2>Latest Posts</h2>
            <b>{moment().format('MMMM Do YYYY, h:mm:ss a')}</b>
            <h1 className="text-9xl">hello</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
