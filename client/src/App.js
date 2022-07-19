// importing components
import { useContext } from "react";
import NavBar from "components/NavBar";
import { AuthContext } from "context/AuthContext";

// importing Route
import { UseRoutes } from "hook/useRoutes";

function App() {
  const { isLogin } = useContext(AuthContext);
  const routes = UseRoutes(isLogin);

  return (
    <div className="App">
      <NavBar />
      {routes}
    </div>
  );
}

export default App;
