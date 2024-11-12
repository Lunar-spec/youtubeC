import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [expand, setExpand] = useState(false);

    const mainOptions = [
        {
            icon: "/icons/home.svg",
            text: "Home"
        },
        {
            icon: "/icons/shorts.svg",
            text: "Shorts"
        },
        {
            icon: "/icons/subscriptions.svg",
            text: "Subscriptions"
        },
        {
            divider: true
        },
        {
            title: "You",
            icon: "/icons/you.svg",
            items: [
                {
                    text: "History",
                    icon: "/icons/history.svg"
                },
                {
                    text: "Playlists",
                    icon: "/icons/playlists.svg"
                },
                {
                    text: "Your videos",
                    icon: "/icons/videos.svg"
                },
                {
                    text: "Watch later",
                    icon: "/icons/watchlater.svg"
                },
                {
                    text: "Liked videos",
                    icon: "/icons/liked.svg"
                }
            ]
        },
        {
            divider: true
        },
        {
            title: "Subscriptions",
            icon: "/icons/subscriptions.svg",
            items: [
                {
                    text: "Goobie and Doobie",
                    icon: "https://api.dicebear.com/9.x/thumbs/svg?seed=GoobieAndDoobie"
                },
                {
                    text: "Fireship",
                    icon: "https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Fireship&backgroundColor=b6e3f4"
                },
                {
                    text: "Tier Zoo",
                    icon: "https://api.dicebear.com/9.x/identicon/svg?rowColor=f4511e&seed=TierZoo"
                },
                {
                    text: "Jack Rackham",
                    icon: "https://api.dicebear.com/9.x/notionists/svg?seed=JackRackham&flip=true&gesture=hand,handPhone,ok"
                },
            ]
        },
        {
            divider: true
        },
        {
            title: "Explore",
            icon: "/icons/explore.svg",
            items: [
                {
                    text: "Trending",
                    icon: "/icons/trending.svg"
                },
                {
                    text: "Music",
                    icon: "/icons/music.svg"
                },
                {
                    text: "Gaming",
                    icon: "/icons/gaming.svg"
                },
                {
                    text: "Sports",
                    icon: "/icons/sports.svg"
                },
                {
                    text: "News",
                    icon: "/icons/news.svg"
                },
                {
                    text: "Live",
                    icon: "/icons/live.svg"
                }
            ]
        }
    ];

    const MainSide = () => {
        return (
            <div className="fixed inset-0 bg-black/60 z-50">
                <div className="fixed top-0 left-0 h-screen w-60 bg-white shadow-lg animate-in slide-in-from-left overflow-y-auto z-[51]">
                    <div className="sticky top-0 bg-white p-2 mb-2">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setExpand(false)}
                                className="hover:bg-gray-100 p-2 rounded-md"
                            >
                                <img src="/icons/burger.svg" alt="Menu" height={24} width={24} />
                            </button>
                            <Link to="/">
                                <img src="/icons/youtube.svg" alt="Youtube" />
                            </Link>
                        </div>
                    </div>

                    <div className="px-2 pb-4">
                        {mainOptions.map((option, index) => {
                            if (option.divider) {
                                return <hr key={index} className="my-3 border-gray-200" />;
                            }

                            if (option.title) {
                                return (
                                    <div key={index} className="mb-2">
                                        <h3 className="px-3 py-1 text-sm font-medium text-gray-600">
                                            {option.title}
                                        </h3>
                                        <div className="mt-1">
                                            {option.items?.map((item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <img
                                                        src={item.icon}
                                                        alt={item.text}
                                                        className={item.icon.includes('dice') ? 'w-6 h-6 rounded-full' : 'w-6 h-6'}
                                                    />
                                                    <span className="text-sm">{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                >
                                    <img
                                        src={option.icon}
                                        alt={option.text}
                                        height={24}
                                        width={24}
                                    />
                                    <span className="text-sm">{option.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const compactOptions = [
        {
            icon: "/icons/home.svg",
            text: "Home"
        },
        {
            icon: "/icons/shorts.svg",
            text: "Shorts"
        },
        {
            icon: "/icons/subscriptions.svg",
            text: "Subscriptions"
        },
        {
            icon: "/icons/you.svg",
            text: "You"
        }
    ];

    const CompactSide = () => {
        return (
            <div className="w-16 flex flex-col items-center p-2 space-y-4">
                <button
                    onClick={() => setExpand(true)}
                    className="hover:bg-gray-100 p-2 rounded-md"
                >
                    <img src="/icons/burger.svg" alt="Menu" height={24} width={24} />
                </button>
                <div className='flex flex-col gap-6'>
                    {compactOptions.map((option, index) => (
                        <div key={index} className='flex flex-col items-center gap-0.5 hover:bg-gray-100 rounded-md cursor-pointer'>
                            <span className='flex flex-col items-center p-1'>
                                <img src={option.icon} alt={option.text} height={24} width={24} />
                            </span>
                            <span className='text-[10px] font-medium'>
                                {option.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed top-0 left-0 h-screen bg-white transition-all duration-300">
            {expand ? <MainSide /> : <CompactSide />}
        </div>
    );
};

export default Sidebar;