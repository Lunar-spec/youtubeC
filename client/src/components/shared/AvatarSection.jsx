import { useState, useRef, useEffect } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/reducer';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaUser } from "react-icons/fa6";;

const AvatarSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get user data from Redux store using your selector
    const { user } = useSelector(selectUser);

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
        toast.success('Logout Successful');
        navigate('/auth/login');
    };

    // Get first letter of name for avatar fallback
    const getInitials = (name) => {
        return name?.charAt(0).toUpperCase() || '';
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // If user is not authenticated, show login button
    if (!user) {
        return (
            <div className="relative z-50" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`h-8 w-8 rounded-full overflow-hidden focus:outline-none border-2 transition-all duration-300 border-transparent ease-in-out ${isOpen ? 'border-cyan-500' : ''} bg-gray-100 flex items-center justify-center`}
                >
                    <FaUser className="text-gray-400 text-xl" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
                        <div className="text-center mb-4">
                            <FaUser className="text-4xl text-gray-400 mx-auto mb-2" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">Sign in</h3>
                            <p className="text-sm text-gray-500 mb-4">Sign in to upload videos, comment and subscribe</p>
                        </div>
                        <Link
                            to="/auth/login"
                            className="block w-full py-2 px-4 text-center bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign in
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    // If user is authenticated, show regular avatar section
    return (
        <div className="relative z-50" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-8 w-8 bg-white rounded-full overflow-hidden focus:outline-none border-2 transition-all duration-300 border-transparent ease-in-out ${isOpen ? 'border-cyan-500' : ''}`}
            >
                {user?.channels ? (
                    <img
                        src={user?.channels?.avatarUrl}
                        alt={user?.channels?.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-500 text-white font-medium flex items-center justify-center">
                        {getInitials(user.name)}
                    </div>
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-2">
                    {/* User Info Section */}
                    <div className="flex items-center gap-3 mb-3 pb-2 border-b border-gray-100">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                            {user?.channels?.avatarUrl ? (
                                <img
                                    src={user?.channels?.avatarUrl}
                                    alt={user?.channels?.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : (
                                <div className="h-full w-full bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-500 text-white font-medium flex items-center justify-center">
                                    {getInitials(user.name)}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{user?.channels?.name || user.name}</span>
                            <span className="text-sm text-gray-500">@{user.id}</span>
                            <Link
                                to={`/channel/${user.id}`}
                                className="block text-blue-600 hover:text-blue-700 text-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                {user?.channels ? "View your channel" : "Create a channel"}
                            </Link>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className='flex w-full items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md'
                    >
                        <IoLogOutOutline className='text-2xl' />
                        <span>Sign out</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default AvatarSection;