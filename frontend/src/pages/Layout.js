import {Outlet, Link} from "react-router-dom";
import '../components/App/App.css';
import Navigation from '../components/Navigation/Navigation'
const Layout = () => {
    return (
        <>
            <Navigation />
            <Link className='link' to="/"><h1>HUNGRY STUDENTS</h1></Link>
            <Outlet />
        </>
    )
};

export default Layout;
