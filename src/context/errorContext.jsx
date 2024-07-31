import { createContext, useState } from "react";

const ErrorContext = createContext()

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleError = async (asyncFunction) => {
        try {
            await asyncFunction();
        } catch (error) {
            setError(error.message);

        }
    };
    setTimeout(() => {
        setError(null);
    }, 3000);


    return (
        <ErrorContext.Provider value={{ error, handleError }}>
            {children}
        </ErrorContext.Provider>
    );
}




export default ErrorContext;