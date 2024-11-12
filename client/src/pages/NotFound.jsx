import { HiMiniMagnifyingGlass } from "react-icons/hi2"

const NotFound = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex items-center justify-center flex-col">
            <img src="/images/monkey.png" alt="not found" />
            <div className="flex flex-col gap-6">
                <div className="text-center text-base">
                    <div>
                        This page isn&apos;t available. Sorry about that.
                    </div>
                    <div>
                        Try searching for something else.
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <img src="/icons/youtube.svg" alt="youtube" />
                    <div className="flex items-center">
                        <input type="text" name="search" placeholder="Search" className="border px-2" />
                        <button className="border p-1 w-14 flex justify-center items-center">
                            <HiMiniMagnifyingGlass className="text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound