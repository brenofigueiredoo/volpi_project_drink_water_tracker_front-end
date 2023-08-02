/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    goal_id: string;
    user_id: string;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const ContextProvider = ({ children }: IContextProviderProps) => {
  const [user, setUser] = useState();
  const [isPatched, setIsPatched] = useState(false);

  const goal_id = "a6312839-6e0d-447b-81e2-f157c6bf1d25"
  const user_id = "fb179e59-408f-4f97-bca6-a63b1972c202"

  const navigate = useNavigate();

  const onRegister = (data: IDataRegister) => {
    
    data.weight_kg = +data.weight_kg

    axios
      .post("http://localhost:8000/api/users", data)
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
    axios
      .patch(`http://localhost:8000/api/goals/${goal_id}/drinkwater`, data)
      .then((res) => {
        console.log(res);
        setIsPatched(!isPatched)
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <UserContext.Provider value={{ onRegister, onDrinkWater, user, setUser, isPatched, goal_id, user_id }}>
      {children}
    </UserContext.Provider>
  );
};
export default ContextProvider;
