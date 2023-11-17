import { useContext } from "react";
import { IDataLogin, UserContext } from "../../contexts/UserContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Container } from "../UserRegister/style";

export const UserLogin = () => {
  const { onLogin } = useContext(UserContext);

  const schema = yup.object({
    email: yup.string().email().required("Email é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataLogin>({
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <form onSubmit={handleSubmit(onLogin)}>
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

        <button type="submit">Entrar</button>
      </form>
    </Container>
  );
};
