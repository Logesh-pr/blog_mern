//context
import { AuthContext } from "./Context";

//custom hook
import { useAuth } from "../hooks/useAuthQuery";

export default function AuthProvider({ children }) {
  const { data: user, isLoading } = useAuth();

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
