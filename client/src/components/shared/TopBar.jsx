import { HiMicrophone } from "react-icons/hi2";
import AvatarSection from "./AvatarSection"
import SearchBar from "./SearchBar"
import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <div className="flex justify-between items-center bg-white p-2 z-50">
            <Link to="/">
                <img src="/icons/youtube.svg" alt="Youtube" />
            </Link>
            <div className="flex gap-2 items-center">
                <SearchBar />
                <div className="bg-gray-100 hidden md:flex p-2 rounded-full">
                    <HiMicrophone className="text-xl" />
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <div className="hover:bg-gray-100 hidden md:flex cursor-pointer p-2 rounded-full">
                    <img src="/icons/add-video.svg" alt="Add Video" />
                </div>
                <div className="hover:bg-gray-100 cursor-pointer p-2 rounded-full">
                    <img src="/icons/bell.svg" alt="Notifications" />
                </div>
                <AvatarSection />
            </div>
        </div >
    )
}

export default TopBar