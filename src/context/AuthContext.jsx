import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosUsersInstance } from "../utils/utils";

const AuthContext = createContext({
    login: () => {},
    register: () => {},
    logout: () => {},
    logoutAll: () => {},
    accessToken: "",
});

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState("");
    const [notification, setNotification] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email, password) => {
        try {
            const result = await axiosUsersInstance.post("/login", {
                email,
                password,
            });
            console.log(result);
            setAccessToken(result.data.accessToken);
            localStorage.setItem(
                "token",
                JSON.stringify(result.data.accessToken)
            );
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    const register = async (userInfo) => {
        try {
            const result = await axiosUsersInstance.post("register", userInfo);
            console.log(result);
            setAccessToken(result.data.accessToken);
            localStorage.setItem(
                "token",
                JSON.stringify(result.data.accessToken)
            );
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    const logout = async () => {
        try {
            console.log(accessToken);
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
            navigate("/login");
        } catch (error) {
            console.log(error);
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
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setAccessToken(JSON.parse(localStorage.getItem("token")));
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, []);

    const AuthValues = {
        login,
        register,
        logout,
        logoutAll,
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
