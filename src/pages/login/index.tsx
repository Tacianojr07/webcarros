import { Container } from "../../components/container";
import logoImg from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { Input } from "../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string().nonempty("a senha não pode ser nula"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <Link className="w-full max-w-sm mb-6" to="/">
          <img className="w-full" src={logoImg} alt="logo" />
        </Link>

        <form
          className="w-full max-w-sm rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite seu email"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button>Acessar</button>
        </form>
      </div>
    </Container>
  );
}
