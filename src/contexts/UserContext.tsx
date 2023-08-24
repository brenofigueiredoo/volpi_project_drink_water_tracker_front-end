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
    goalId: string;
    userId: string;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const ContextProvider = ({ children }: IContextProviderProps) => {
  const [user, setUser] = useState();
  const [isPatched, setIsPatched] = useState(false);

  const goalId = "c9ae38e5-973d-45a2-835c-01fdbc7de6ec"
  const userId = "069efcf7-c6cc-4c59-98df-b353a475f212"

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
      .patch(`http://localhost:8000/api/goals/${goalId}/drinkwater`, data)
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
