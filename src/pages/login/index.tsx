import { Container } from "../../components/container";
import logoImg from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { Input } from "../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .min(1, { message: "insira um email valido" }),
  password: z.string().min(1, { message: "a senha não pode ser nula" }),
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

  return (
    <Container>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <Link className="w-full max-w-sm mb-6" to="/">
          <img className="w-full" src={logoImg} alt="logo" />
        </Link>

        <form className="w-full max-w-sm rounded-lg">
          <Input />
        </form>
      </div>
    </Container>
  );
}
