import { ChangeEvent, useContext, useState } from "react";
import { Container } from "../../../components/container";
import { DashboardHeaderl } from "../../../components/painelheader";
import { Input } from "../../../components/input";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../contexts/AuthContext";
import { v4 as uuidV4 } from "uuid";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O campo modelo é obrigatório"),
  year: z.string().nonempty("O campo do ano é obrigatório"),
  km: z.string().nonempty("O campo do KM é obrigatório"),
  price: z.string().nonempty("O campo do preço é obrigatório"),
  city: z.string().nonempty("O campo da cidade é obrigatório"),
  whatsapp: z
    .string()

    .refine((value) => /^(\d{10,11})$/.test(value), {
      message: "O número de telefone é inválido",
    }),
  description: z.string().nonempty("O campo de descrição é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function New() {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === "image/jpeg" || image.type === "image/png") {
        //enviar pro banco
      } else {
        alert("Envie uma imagem JPEG ou PNG");
        return;
      }
    }
  }

  async function handleUpload() {
    if (!user?.uid) {
      return;
    }

    const useId = user?.uid;
    const uidImage = uuidV4();
  }

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
              onChange={handleFiles}
            />
          </div>
        </button>
      </div>

      <div className="w-full bg-white flex flex-col p-3 rounded-lg mb-3 sm:flex-row items-center gap-3 mt-4">
        <form className="w-full" onClick={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="font-medium">Nome do carro</p>
            <Input
              type="text"
              name="name"
              register={register}
              error={errors.name?.message}
              placeholder="HB20"
            />
          </div>

          <div className="mb-3">
            <p className=" font-medium">Modelo do carro</p>
            <Input
              type="text"
              name="model"
              register={register}
              error={errors.model?.message}
              placeholder="EX: 1.0"
            />
          </div>

          <div className="w-full flex flex-row items-cente gap-4 mb-3">
            <div className="w-full">
              <p className=" font-medium">Ano</p>
              <Input
                type="text"
                name="year"
                register={register}
                error={errors.year?.message}
                placeholder="2016"
              />
            </div>

            <div className="w-full">
              <p className=" font-medium">KM rodados</p>
              <Input
                type="text"
                name="km"
                register={register}
                error={errors.km?.message}
                placeholder="EX: 1.0"
              />
            </div>
          </div>

          <div className="w-full mb-3">
            <p className=" font-medium">Preço</p>
            <Input
              type="text"
              name="price"
              register={register}
              error={errors.price?.message}
              placeholder="27.000"
            />
          </div>

          <div className="w-full mb-3">
            <p className=" font-medium">Cidade</p>
            <Input
              type="text"
              name="city"
              register={register}
              error={errors.city?.message}
              placeholder="EX: São Paulo"
            />
          </div>

          <div className="w-full mb-3">
            <p className=" font-medium">Telefone/whatsapp</p>
            <Input
              type="text"
              name="whatsapp"
              register={register}
              error={errors.whatsapp?.message}
              placeholder="81 0000-0000"
            />
          </div>

          <div className="w-full mb-3">
            <p className="font-medium">Descrição</p>
            <textarea
              className="w-full px-2 rounded-md border-2 h-24"
              {...register("description")}
              id="description"
              placeholder="Digite a descrição do veículo"
            />
            {errors.description && (
              <p className="mb-1 text-red-500">{errors.description?.message}</p>
            )}
          </div>

          <button className="bg-zinc-900 rounded-md text-white font-medium w-full h-10">
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}
