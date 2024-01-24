import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosUsersInstance } from "../utils/utils";

const AuthContext = createContext({
    login: () => {},
    register: () => {},
    logout: () => {},
    logoutAll: () => {},
    accessToken: "",
    setAccessToken: () => {},
});

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState("");
    const [notification, setNotification] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setAccessToken(JSON.parse(localStorage.getItem("token")));
        }
    }, [location.pathname]);
    const login = async (email, password) => {
        try {
            const result = await axiosUsersInstance.post("/login", {
                email,
                password,
            });
            
            setAccessToken(result.data.accessToken);
            localStorage.setItem(
                "token",
                JSON.stringify(result.data.accessToken)
            );
            return result;
        } catch (error) {
            
            return error;
        }
    };
    const register = async (userInfo) => {
        try {
            const result = await axiosUsersInstance.post("register", userInfo);
            
            setAccessToken(result.data.accessToken);
            localStorage.setItem(
                "token",
                JSON.stringify(result.data.accessToken)
            );
            return result;
        } catch (error) {
            
            return error;
        }
    };
    const logout = async () => {
        try {
            
            if (accessToken) {
                await axiosUsersInstance.put(
                    "/logout",
                    {},
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );
            }
            localStorage.clear();
            setAccessToken("");
            navigate("/auth/login");
        } catch (error) {
            
            return error;
        }
    };
    const logoutAll = async () => {
        try {
            if (accessToken) {
                await axiosUsersInstance.put(
                    "/logoutAll",
                    {},
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );
                localStorage.clear();
                setAccessToken("");
                navigate("/auth/login");
            }
        } catch (error) {
           
            return error;
        }
    };

    const AuthValues = {
        login,
        register,
        logout,
        logoutAll,
        setAccessToken,
        accessToken,
        notification,
    };
    return (
        <AuthContext.Provider value={AuthValues}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
