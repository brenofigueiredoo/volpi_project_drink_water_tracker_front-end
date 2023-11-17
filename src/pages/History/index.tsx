import { useEffect, useState } from "react";
import { IGoalResponse } from "../../contexts/UserContext";
import { Container } from "./style";
import { useNavigate } from "react-router-dom";
import { api, config } from "../../services/api";

export const History = () => {
  const navigate = useNavigate();

  const [goals, setGoals] = useState<IGoalResponse[]>();

  useEffect(() => {
    api
      .get(`/goals`, config())
      .then((res) => {
        const sortedGoals = res.data.sort(
          (a: IGoalResponse, b: IGoalResponse) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            return dateB - dateA;
          }
        );
        setGoals(sortedGoals);
      })
      .catch(() => {});
  }, []);

  return (
    <Container>
      <div className="div__father">
        <div className="div_header">
          <h2>Histórico do(a) {goals && goals[0].user.username}</h2>
          <button
            className="div_header_button"
            type="submit"
            onClick={() => navigate("/home", { replace: true })}
          >
            Ir para Home
          </button>
        </div>
        {goals?.map((elem, index) => (
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
                  <td>
                    {elem.goal_consumed_percentage !== 100 ? (
                      <p>NÃO</p>
                    ) : (
                      <p>SIM</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </Container>
  );
};
