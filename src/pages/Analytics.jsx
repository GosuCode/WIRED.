import PostChart from "../components/charts/PostChart"
import UserChart from "../components/charts/UserChart"

const Analytics = () => {

    const stats = [
        { Name: "Users", number: `12` },
        { Name: "Posts", number: "123" },
        { Name: "Likes", number: "200" },
        { Name: "Views", number: "245" },
        { Name: "Comments", number: "502" },
    ];

    return (
        <div className="pl-5 grid place-items-center">
            <div className="grid mt-24 grid-cols-12 px-3 gap-3 md:gap-12 md:px-12 text-black place-items-center">
                {stats.map((val, key) => {
                    return (
                        <div
                            key={key}
                            className="bg-white col-span-2 w-full cursor-pointer rounded-lg h-20 grid place-items-center md:shadow-neon shadow-green"
                        >
                            <span className="font-bold">{val.Name}</span>
                            <span>{val.number}</span>
                        </div>
                    );
                })}
            </div>
            <div className="mt-20 h-[450px] w-[1000px] px-14 pb-20 border-2 rounded-md border-cyan-200">
                <h1 className="text-white text-xl">Users</h1>
                <UserChart className="w-full h-full" />
            </div>
            <div className="mt-20 h-[450px] w-[1000px] px-14  border-2 rounded-md border-cyan-200">
                <h1 className="text-white text-xl">Posts</h1>
                <PostChart />
            </div>
        </div>
    )
}

export default Analytics
