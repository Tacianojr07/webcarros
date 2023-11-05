interface InputProps {
  name: string;
  placeholder: string;
  type: string;
}

export function Input({ name, placeholder, type }: InputProps) {
  return (
    <div>
      <input
        className="w-full h-11 border-2 px-2 rounded-lg"
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}
