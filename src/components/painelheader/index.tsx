import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export function DashboardHeaderl() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div>
      <Link to="/dashboard">Dahsboard</Link>
      <Link to="/dashboard/new">Cadastrar carro</Link>

      <button onClick={handleLogout}>Sair da conta</button>
    </div>
  );
}
