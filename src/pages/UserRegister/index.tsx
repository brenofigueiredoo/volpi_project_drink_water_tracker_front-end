import { useContext } from "react";
import { Container } from "./style"
import { IDataRegister, UserContext } from "../../contexts/UserContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


export const UserRegister = () => {

    const { onRegister } = useContext(UserContext);

    const schema = yup.object({
        name: yup.string().required("Nome é obrigatória"),
        weight_kg: yup.number().required("Peso é obrigatório"),
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IDataRegister>({
        resolver: yupResolver(schema),
      });

    return (
        <>
        <Container> 
            <form onSubmit={handleSubmit(onRegister)}>
                <div>
                    <p>Nome</p>
                        <input type="text" placeholder="Nome" {...register("name")} />
                    <p className="p_errors">{errors.name?.message}</p>
                </div>
                <div>
                    <p>Peso em KG</p>
                        <input type="text" placeholder="Peso" {...register("weight_kg")} defaultValue={0}/>
                    <p className="p_errors">{errors.weight_kg?.message}</p>
                </div>
                
                <button type="submit">Registrar pessoa</button>
            </form>
        </Container>
        </>
    )
}