import { FiTrash2 } from "react-icons/fi";
import { Container } from "../../components/container";
import { DashboardHeaderl } from "../../components/painelheader";

export function Dashboard() {
  return (
    <Container>
      <DashboardHeaderl />

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg relative">
          <button className="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center right-2 top-2 drop-shadow-sm">
            <FiTrash2 size={26} color="#000" />
          </button>
          <img
            className="w-full max-h-72 rounded-lg mb-2 "
            src="https://firebasestorage.googleapis.com/v0/b/webcarros-13392.appspot.com/o/images%2FvPenMYzywDTvnTnF6t6ECe5IMs73%2F213e3bc8-3b5c-45c7-b100-d41e113f28c1?alt=media&token=5cdd3f27-ab0a-464e-816b-239b5c4e04c4"
            alt="image de carro"
          />
          <p className="font-bold mt-1 px-2 mb-2">Nissa Versa</p>

          <div className="flex flex-col px-1">
            <span className="text-zinc-700">ANO 2016 | 20.813km </span>

            <strong className="text-black font-bold mt-4">
              Preço: R$350.000
            </strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className=" px-2 pb-2">
            <span className="text-black">Toritama - PE</span>
          </div>
        </section>
      </main>
    </Container>
  );
}
