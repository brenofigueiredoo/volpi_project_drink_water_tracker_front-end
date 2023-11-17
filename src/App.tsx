import "./App.css";
import ContextProvider from "./contexts/UserContext";
import { RoutersMain } from "./routes";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

function App() {
  return (
    <>
      <ContextProvider>
        <Header />
        <RoutersMain />
        <ToastContainer />
      </ContextProvider>
    </>
  );
}

export default App;
