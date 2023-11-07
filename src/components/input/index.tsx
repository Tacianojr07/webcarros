import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input({
  name,
  placeholder,
  type,
  register,
  rules,
  error,
}: InputProps) {
  return (
    <div>
      <input
        className="w-full h-11 border-2 px-2 rounded-lg"
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />
      {error && <p>{error}</p>}
    </div>
  );
}
