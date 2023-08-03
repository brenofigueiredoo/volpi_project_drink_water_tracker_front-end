import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios"
import { IGoalResponse } from "../Home";
import { Container } from "./style";
import { useNavigate } from "react-router-dom";

interface IUserReturn {
    id: string;
    name: string;
    weight_kg: number;
}

export const Historic =  () => {

    const { user_id } = useContext(UserContext);

    const navigate = useNavigate();

    const [goals, setGoals] = useState<IGoalResponse[]>()
    const [user, setUser] = useState<IUserReturn>()

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/users/${user_id}`)
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });

        axios
        .get(`http://localhost:8000/api/goals/user/list/${user_id}`)
        .then((res) => {
          setGoals(res.data)
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
        }, []);

    return (
        <Container>
            <div className="div_header">
                <h2>Histórico do(a) {user?.name}</h2>
                <button className="div_header_button" type="submit" onClick={() => navigate("/home", { replace: true })}>Ir para Home</button>
            </div>
            {
                goals?.map((elem, index) => (
                    <div className="div_card_goals" key={index}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="td_key">Data: </td>
                                    <td>{elem.date}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="td_key">Meta: </td>
                                    <td>{elem.goal_of_the_day_ml}ml</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="td_key">Meta já consumida: </td>
                                    <td>{elem.goal_consumed_ml}ml</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="td_key">Chegou na meta ? </td>
                                    <td>{elem.goal_consumed_percentage !== 100 ? <p>NÃO</p> : <p>SIM</p>}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))
            }
        </Container>
    )
}
