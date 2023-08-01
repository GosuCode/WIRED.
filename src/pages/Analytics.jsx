import PostChart from "../components/charts/PostChart"
import UserChart from "../components/charts/UserChart"

const Analytics = () => {
    return (
        <div className="pl-5 grid place-items-center">
            <div className="mt-24">
                <UserChart />
            </div>
            <div className="h-[350px] mt-24">
                <PostChart />
            </div>
        </div>
    )
}

export default Analytics
