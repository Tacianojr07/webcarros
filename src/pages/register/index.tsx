import { useEffect } from "react";
import { Container } from "../../components/container";
import logoImg from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z.string().email("Insira um email válido"),
  password: z
    .string()
    .min(6, "O campo senha precisar ter minímo 6 caracteres")
    .nonempty("O campo é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleLogOut() {
      await signOut(auth);
    }

    handleLogOut();
  }, []);

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });
        console.log("cadastrado com sucesso");
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
              type="text"
              placeholder="Digite seu nome completo"
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>

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
            Cadastrar
          </button>
        </form>

        <Link to="/login">Já possui uma conta? Faça login</Link>
      </div>
    </Container>
  );
}
