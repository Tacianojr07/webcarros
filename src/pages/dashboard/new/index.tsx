import { Container } from "../../../components/container";
import { DashboardHeaderl } from "../../../components/painelheader";
import { Input } from "../../../components/input";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O campo modelo é obrigatório"),
  year: z.string().nonempty("O campo do ano é obrigatório"),
  km: z.string().nonempty("O campo do KM é obrigatório"),
  price: z.string().nonempty("O campo do preço é obrigatório"),
  city: z.string().nonempty("O campo do cidade é obrigatório"),
  whatsapp: z
    .string()
    .nonempty("O campo do whatsapp é obrigatório")
    .refine((value) => /^(\d{10,11})$/.test(value), {
      message: "O número de telefone é inválido",
    }),
  description: z.string().nonempty("O campo de descrição é obrigatório"),
});

type FormData = z.infer<typeof schema>;

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
