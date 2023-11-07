import { Container } from "../../components/container";
import logoImg from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { Input } from "../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string().nonempty("O campo é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("login com sucesso");
        console.log(user);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <Link className="w-full max-w-sm mb-6" to="/">
          <img className="w-full" src={logoImg} alt="logo" />
        </Link>

        <form
          className="w-full max-w-lg rounded-lg p-4 bg-white"
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

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white font-medium h-10 rounded-lg"
          >
            Acessar
          </button>
        </form>

        <Link to="/register">Ainda não possui uma conta? Cadastra-se</Link>
      </div>
    </Container>
  );
}
