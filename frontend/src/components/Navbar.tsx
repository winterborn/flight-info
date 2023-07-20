import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="header__container">
        <Link className="header__link" to='/'>
            <h1>Flight Information</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
