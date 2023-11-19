/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, config } from "../services/api";
import { toast } from "react-toastify";

interface IContextProviderProps {
  children: ReactNode;
}

export interface IDataRegister {
  username: string;
  weight_kg: number;
  email: string;
  password: string;
}

export interface IDataUpdate {
  username: string;
  weight_kg: number;
}

export interface IDataLogin {
  email: string;
  password: string;
}

export interface IDataDrinkWater {
  quantity: number;
}

export interface IDataUser {
  id: string;
  username: string;
  weight_kg: number;
  goal_ml: number;
  email: string;
}

export interface IGoalResponse {
  date: string;
  goal_consumed_ml: number;
  goal_consumed_percentage: number;
  goal_of_the_day_ml: number;
  id: string;
  remaining_goals_ml: number;
  user: {
    id: string;
    username: string;
    weight_kg: number;
    goal_ml: number;
    email: string;
  };
}

interface IUserContext {
  onRegister: (data: IDataRegister) => void;
  onDrinkWater: (data: IDataDrinkWater) => void;
  user: IDataUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IDataUser | undefined>>;
  isPatched: boolean;
  onLogin: (data: IDataLogin) => void;
  onCreateGoal: () => void;
  onRetrieverGoalByDate: () => void;
  notFound: boolean;
  setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
  goal: IGoalResponse | undefined;
  setGoal: React.Dispatch<React.SetStateAction<IGoalResponse | undefined>>;
  goalLoaded: boolean;
  setGoalLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  onRetriverUser: () => void;
  onUpdateUser: (data: IDataUpdate) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const ContextProvider = ({ children }: IContextProviderProps) => {
  const [user, setUser] = useState<IDataUser>();
  const [isPatched, setIsPatched] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [goalLoaded, setGoalLoaded] = useState<boolean>(false);
  const [goal, setGoal] = useState<IGoalResponse>();

  const navigate = useNavigate();

  const onRegister = (data: IDataRegister) => {
    data.weight_kg = +data.weight_kg;

    api
      .post("/users", data)
      .then((res) => {
        setUser(res.data.id);
        toast.success("Usuário cadastrado!");
        navigate("/entrar", { replace: true });
      })
      .catch(() => {
        toast.error("Erro ao cadastrar");
      });
  };

  const onLogin = (data: IDataLogin) => {
    api
      .post("/login", data)
      .then((res) => {
        window.localStorage.clear();
        window.localStorage.setItem("authToken", res.data.access);
        navigate("/home", { replace: true });
        toast.success("Usuário logado!");
      })
      .catch(() => {
        toast.error("Email ou senha incorreta!");
      });
  };

  const onCreateGoal = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    api
      .post(
        `/goals/date/${currentYear}-${currentMonth}-${currentDay}`,
        null,
        config()
      )
      .then(() => {
        setGoalLoaded(true);
      })
      .catch(() => {});
  };

  const onDrinkWater = (data: IDataDrinkWater) => {
    api
      .patch(`/goals/${goal!.id}/drinkwater`, data, config())
      .then(() => {
        setIsPatched(!isPatched);
      })
      .catch(() => {});
  };

  const onRetrieverGoalByDate = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    api
      .get(`/goals/date/${currentYear}-${currentMonth}-${currentDay}`, config())
      .then((res) => {
        setGoal(res.data[0]);
        setGoalLoaded(true);
      })
      .catch((err) => {
        err.response.data.detail == "Not found" && setNotFound(true);
        err.response.data.code == "token_not_valid" &&
          window.localStorage.clear();
      });
  };

  const onRetriverUser = () => {
    api
      .get("/users/detail", config())
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        toast.error("Erro ao cadastrar");
      });
  };

  const onUpdateUser = (data: IDataUpdate) => {
    api
      .patch("/users/detail", data, config())
      .then(() => {
        toast.success("Usuário Atualizado!");
        navigate("/home", { replace: true });
      })
      .catch(() => {
        toast.error("Erro ao cadastrar");
      });
  };

  return (
    <UserContext.Provider
      value={{
        onRegister,
        onDrinkWater,
        user,
        setUser,
        isPatched,
        onLogin,
        onCreateGoal,
        onRetrieverGoalByDate,
        setNotFound,
        notFound,
        goal,
        setGoal,
        goalLoaded,
        setGoalLoaded,
        onRetriverUser,
        onUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default ContextProvider;
