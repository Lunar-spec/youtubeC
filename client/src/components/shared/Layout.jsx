import PropTypes from "prop-types";
import TopBar from "./TopBar";

const Layout = ({ children }) => {
    return (
        <div>
            <TopBar />
            {children}
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;