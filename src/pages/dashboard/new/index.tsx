import { Container } from "../../../components/container";
import { DashboardHeaderl } from "../../../components/painelheader";
import { FiUpload } from "react-icons/fi";

export function New() {
  return (
    <Container>
      <DashboardHeaderl />

      <div className="w-full bg-white rounded-lg p-3 flex flex-col  sm:flex-row items-center gap-3">
        <button className="w-48 border-2 flex items-center justify-center rounded-lg cursor-pointer border-gray-600 h-32 md:48">
          <div className="absolute cursor-pointer">
            <FiUpload size={28} color="#000" />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
            />
          </div>
        </button>
      </div>

      <div className="w-full bg-white flex flex-col p-3 rounded-lg sm:flex-row items-center gap-3 mt-4">
        <h1>tesetttts</h1>
      </div>
    </Container>
  );
}
