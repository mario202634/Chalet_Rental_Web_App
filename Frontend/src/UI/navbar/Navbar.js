import { useContext } from 'react';
import AuthContext from '../../store/authContext';
import NavItem from './NavItem';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <nav>
      <ul className="flex bg-sky-900 justify-center items-center">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/chalets">Chalets</NavItem>
        {authContext.token && <NavItem to="/chalets/add">Add Chalet</NavItem>}
        {authContext.token && <NavItem to="/editUser">Edit User</NavItem>}
        {authContext.token && <NavItem to="/editChalet">Edit Chalet</NavItem>}
        {authContext.token && <NavItem to="/editRental">Edit Rent</NavItem>}
        {!authContext.token && <NavItem to="/signin">Sign In</NavItem>}
        {!authContext.token && <NavItem to="/signup">Sign Up</NavItem>}
      </ul>
    </nav>
  );
};

export default Navbar;
