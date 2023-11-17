import { useContext, useEffect } from "react";
import { Container } from "./style";
import { IDataDrinkWater, UserContext } from "../../contexts/UserContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const {
    onDrinkWater,
    isPatched,
    onCreateGoal,
    onRetrieverGoalByDate,
    notFound,
    goal,
    goalLoaded,
  } = useContext(UserContext);

  useEffect(() => {
    onRetrieverGoalByDate();
  }, [goalLoaded, isPatched]);

  useEffect(() => {
    notFound && onCreateGoal();
  }, [notFound]);

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

  const partsDate = goal ? goal.date.split("-") : "";
  const resultDate = goal?.date
    ? partsDate[2] + "/" + partsDate[1] + "/" + partsDate[0]
    : "";

  return (
    <Container>
      <div className="div_header">
        <button
          className="div_header_button"
          type="submit"
          onClick={() => navigate("/historico", { replace: true })}
        >
          Mostrar histórico
        </button>
      </div>
      <form onSubmit={handleSubmit(onDrinkWater)}>
        <p>Data de hoje: {resultDate}</p>

        <section className="form_section">
          <div>
            <input type="radio" value="250" {...register("quantity")} />
            <label>Copo pequeno 250ml</label>
          </div>
          <div>
            <input type="radio" value="350" {...register("quantity")} />
            <label>Copo médio 350ml</label>
          </div>
          <div>
            <input type="radio" value="500" {...register("quantity")} />
            <label>Garrafa média 500ml</label>
          </div>
          <p className="p_errors">{errors.quantity?.message}</p>

          <button className="form_button" type="submit">
            Consumir
          </button>
        </section>
      </form>

      <section>
        <table>
          <tbody>
            <tr>
              <td className="td_key">Meta do dia: </td>
              <td>{goalLoaded && goal?.goal_of_the_day_ml}ml</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="td_key">Meta restante: </td>
              <td>{goalLoaded && goal?.remaining_goals_ml}ml</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="td_key">Meta já consumida: </td>
              <td>{goalLoaded && goal?.goal_consumed_ml}ml</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="td_key">Meta já consumida (%): </td>
              <td>{goalLoaded && goal?.goal_consumed_percentage}%</td>
            </tr>
          </tbody>
        </table>
      </section>

      <h2>Chegou na meta hoje ? </h2>
      {goalLoaded && goal?.goal_consumed_percentage == 100 ? (
        <h2 className="td_key">SIM!</h2>
      ) : (
        <h2 className="td_key">NÃO!</h2>
      )}
    </Container>
  );
};
