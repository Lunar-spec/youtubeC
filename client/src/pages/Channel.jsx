import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchChannel } from "../redux/channelSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import CreateChannel from "../components/channel/CreateChannel";
import ChannelLayout from "../components/channel/ChannelLayout";
import Loader from "../components/shared/Loader";
// import { getUserMe } from "../api/user";

const Channel = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { channelData } = useSelector((state) => state.channel);

    useEffect(() => {
        dispatch(fetchChannel())
            .then(() => {
                setLoading(false);
            });

        // async function getMe() {
        //     await getUserMe();
        // }

        // getMe();
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (!channelData?.channel) {
        return (
            <div>
                <CreateChannel />
            </div>
        );
    }

    return (
        <div>
            <ChannelLayout channelData={channelData} />
        </div>
    );
};

export default Channel;