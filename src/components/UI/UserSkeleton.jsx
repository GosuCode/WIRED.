
const UserSkeleton = () => {
    return (
        <div>
            <div className="pt-10">
                <div className="grid grid-cols-3 pt-4">
                    <div className="flex">
                        <span className="w-10 -mt-1 text-white font-semibold h-10 rounded-full m-1 p-1 bg-gradient-to-r animate-pulse from-cyan-50 to-cyan-100">
                        </span>
                        <div className="pt-2 bg-gradient-to-r animate-pulse from-cyan-50 to-cyan-100 h-9 md:w-[200px]"></div>
                    </div>
                    <div className="bg-gradient-to-r animate-pulse from-cyan-50 to-cyan-100 h-8 w-[200px] ml-16">
                    </div>
                    <span className='pt-2 bg-gradient-to-r animate-pulse from-cyan-50 to-cyan-100 h-8 w-[50%] ml-36'></span>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default UserSkeleton
