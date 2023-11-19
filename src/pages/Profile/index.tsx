import { Container } from "./style";
import { useContext, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IDataUpdate, UserContext } from "../../contexts/UserContext";

const Profile = () => {
  const { onRetriverUser, onUpdateUser, user } = useContext(UserContext);

  const schema = yup.object({
    username: yup.string().required("Nome é obrigatória"),
    weight_kg: yup.number().required("Peso é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IDataUpdate>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    onRetriverUser();
  }, []);

  useEffect(() => {
    setValue("username", user?.username || "");
    setValue("weight_kg", user?.weight_kg || 0);
  }, [user]);

  return (
    <Container>
      <FaUser size="12rem" />
      <form onSubmit={handleSubmit(onUpdateUser)}>
        <div>
          <p>Nome</p>
          <input type="text" placeholder="Nome" {...register("username")} />
          <p className="p_errors">{errors.username?.message}</p>
        </div>
        <div>
          <p>Peso em KG</p>
          <input type="text" placeholder="Peso" {...register("weight_kg")} />
          <p className="p_errors">{errors.weight_kg?.message}</p>
        </div>

        <button type="submit">Atualizar Dados</button>
      </form>
    </Container>
  );
};

export default Profile;
