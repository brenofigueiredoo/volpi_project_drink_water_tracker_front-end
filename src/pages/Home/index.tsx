import {  useContext, useEffect, useState } from "react";
import { Container } from "./style"
import axios from "axios";
import { IDataDrinkWater, UserContext } from "../../contexts/UserContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"

export interface IGoalResponse {
    date: string
    goal_consumed_ml: number
    goal_consumed_percentage: number
    goal_of_the_day_ml: number
    id: string
    remaining_goals_ml: number
    user: string
}

export const Home = () => {

    const [goal, setGoal] = useState<IGoalResponse>();

    const navigate = useNavigate();

    const { onDrinkWater, isPatched, goal_id } = useContext(UserContext);

    useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/goals/${goal_id}`
      )
      .then((res) => {
        setGoal(res.data)
        });
    }, [isPatched]);
    
    const schema = yup.object({
        quantity: yup.number().required("A quantidade é obrigatória"),
    });

    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<IDataDrinkWater>({
            resolver: yupResolver(schema),
    });

    const partsDate = goal ? goal.date.split('-') : ""
    const resultDate = goal?.date ?  partsDate[2] + '/' + partsDate[1] + '/' + partsDate[0] : ""

    return (
        <>
        <Container>
            <div className="div_header">
                <button className="div_header_button" type="submit" onClick={() => navigate("/cadastro", { replace: true })}>Cadastrar Usuário</button>
                <button className="div_header_button" type="submit" onClick={() => navigate("/historico", { replace: true })}>Mostrar histórico</button>
            </div>
            <form onSubmit={handleSubmit(onDrinkWater)}>
                <p>Data de  hoje: {resultDate}</p>

                <section className="form_section">
                    <div>
                        <input type="radio" value="250" {...register("quantity")}/>
                        <label>Copo pequeno 250ml</label>
                    </div>
                    <div>
                        <input type="radio" value="350" {...register("quantity")}/>
                        <label>Copo médio 350ml</label>
                    </div>
                    <div>
                        <input type="radio" value="500" {...register("quantity")}/>
                        <label>Garrafa média 500ml</label>
                    </div>
                    <p className="p_errors">{errors.quantity?.message}</p>

                    <button className="form_button" type="submit">Consumir</button>
                </section>

            </form>

            <section>
                <table>
                    <tbody>
                        <tr>
                            <td className="td_key">Meta do dia: </td>
                            <td>{goal?.goal_of_the_day_ml}ml</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="td_key">Meta restante: </td>
                            <td>{goal?.remaining_goals_ml}ml</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="td_key">Meta já consumida: </td>
                            <td>{goal?.goal_consumed_ml}ml</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="td_key">Meta já consumida (%): </td>
                            <td>{goal?.goal_consumed_percentage}%</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <h2>Chegou na meta hoje ? </h2>
            {goal !== undefined && goal?.goal_consumed_percentage < 100 ? <h2 className="td_key">NÃO!</h2> : <h2 className="td_key">SIM!</h2>}
        </Container>
        </>
    )
}