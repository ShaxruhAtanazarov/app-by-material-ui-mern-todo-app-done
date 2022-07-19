// importing dependencies
import { AuthContext } from "context/AuthContext";
import { useAuth } from "hook/useAuth";
// ===------------------------------------------

const ContextProvider = ({ children }) => {
  const { login, logOut, token, userId, isReady } = useAuth();
  const isLogin = !!token;

  return (
    <AuthContext.Provider
      value={{
        login,
        logOut,
        token,
        userId,
        isReady,
        isLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
