import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export function DashboardHeaderl() {
  const navigate = useNavigate();
  async function handleLogout() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <div className="w-full bg-red-500 h-10 flex items-center gap-4 px-4 text-white font-medium rounded-lg mb-4">
      <Link to="/dashboard">Dahsboard</Link>
      <Link to="/dashboard/new">Cadastrar carro</Link>

      <button className="ml-auto" onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  );
}
