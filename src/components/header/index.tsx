import { Link } from "react-router-dom";
import { FiUser, FiLogIn } from "react-icons/fi";
import logosvg from "../../assets/logo.svg";

export function Header() {
  const signed = false;
  const loadingAuth = false;

  return (
    <div className="w-full h-16 flex justify-center items-center mb-4 bg-white drop-shadow-sm">
      <header className="w-full max-w-7xl flex justify-between items-centermx-auto px-4">
        <Link to="/">
          <img src={logosvg} alt="logo" />
        </Link>

        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <div className="p-1 border-2 rounded-full border-black">
              <FiUser size={26} color="#000" />
            </div>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to="/login">
            <div className="p-1 border-2 rounded-full border-black">
              <FiLogIn size={26} color="#000" />
            </div>
          </Link>
        )}
      </header>
    </div>
  );
}
