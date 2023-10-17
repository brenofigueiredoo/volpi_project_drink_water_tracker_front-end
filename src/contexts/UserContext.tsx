/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface IContextProviderProps {
    children: ReactNode;
}
  
export interface IDataRegister {
    name: string;
    weight_kg: number;
}

export interface IDataDrinkWater {
    quantity: number;
}

interface IUserContext {
    onRegister: (data: IDataRegister) => void;
    onDrinkWater: (data: IDataDrinkWater) => void;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any | undefined>>;
    isPatched: boolean;
    goalId: string;
    userId: string;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const ContextProvider = ({ children }: IContextProviderProps) => {
  const [user, setUser] = useState();
  const [isPatched, setIsPatched] = useState(false);

  const goalId = "13ad72ee-a542-47bc-a501-d1c5c8cc4bb8"
  const userId = "549e96d7-4bc4-416b-a582-c7413a68c4af"

  const navigate = useNavigate();

  const onRegister = (data: IDataRegister) => {
    
    data.weight_kg = +data.weight_kg

    api
      .post("/users", data)
      .then((res) => {
        console.log(res);
        setUser(res.data.id)
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const onDrinkWater = (data: IDataDrinkWater) => {
    api
      .patch(`/goals/${goalId}/drinkwater`, data)
      .then((res) => {
        console.log(res);
        setIsPatched(!isPatched)
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <UserContext.Provider value={{ onRegister, onDrinkWater, user, setUser, isPatched, goalId, userId }}>
      {children}
    </UserContext.Provider>
  );
};
export default ContextProvider;
