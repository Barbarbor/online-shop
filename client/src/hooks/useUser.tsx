import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userTokenVerify, userLogout } from '../store/modules/User/userActions';
import {IUserCurrent} from "../models/IUser";
interface UserContextType {
    currentUser: IUserCurrent | null;
    logoutUser: () => void;
}
interface UserContextProviderProps {
    children: ReactNode;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};
export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<IUserCurrent | null>(null);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    useEffect(() => {
        const verifyUserToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const user = await userTokenVerify(token);
                    setCurrentUser(user);
                    setIsVerified(true);
                } else {
                    setIsVerified(true);
                }
            } catch (error) {
                console.error('Ошибка при верификации токена:', error);
            }
        };

        verifyUserToken();
    }, []);

    const logoutUser = async() => {
        await userLogout();
        setCurrentUser(null);
    };
    if (!isVerified) {
        // Можно добавить компонент загрузки, если верификация ещё не завершена
        return <div></div>;
    }
    return (
        <UserContext.Provider value={{ currentUser,  logoutUser }}>
    {children}
    </UserContext.Provider>
);
};