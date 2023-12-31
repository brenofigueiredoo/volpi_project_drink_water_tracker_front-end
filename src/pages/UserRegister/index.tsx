import { useContext } from "react";
import { Container } from "./style";
import { IDataRegister, UserContext } from "../../contexts/UserContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const UserRegister = () => {
  const { onRegister } = useContext(UserContext);

  const schema = yup.object({
    username: yup.string().required("Nome é obrigatória"),
    weight_kg: yup.number().required("Peso é obrigatório"),
    email: yup.string().email().required("Email é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataRegister>({
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <form onSubmit={handleSubmit(onRegister)}>
        <div>
          <p>Nome</p>
          <input type="text" placeholder="Nome" {...register("username")} />
          <p className="p_errors">{errors.username?.message}</p>
        </div>
        <div>
          <p>Email</p>
          <input type="text" placeholder="Email" {...register("email")} />
          <p className="p_errors">{errors.email?.message}</p>
        </div>
        <div>
          <p>Senha</p>
          <input
            type="password"
            placeholder="Senha"
            {...register("password")}
          />
          <p className="p_errors">{errors.password?.message}</p>
        </div>
        <div>
          <p>Peso em KG</p>
          <input
            type="text"
            placeholder="Peso"
            {...register("weight_kg")}
            defaultValue={0}
          />
          <p className="p_errors">{errors.weight_kg?.message}</p>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
};
