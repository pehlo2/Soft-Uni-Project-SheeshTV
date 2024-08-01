import { createContext, useState } from "react";
import { ErrorComponent } from "../components/error/Error";

const ErrorContext = createContext()

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleErrorFunction = async (asyncFunction) => {
        try {
            await asyncFunction();
        } catch (error) {
            console.log(error);
            setError(error.message);
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setTimeout(() => setError(null), 3000);
    };



    return (
        <ErrorContext.Provider value={{ error, handleError, handleErrorFunction }}>
           {error && < ErrorComponent errorMessage={error} />} 
            {children}
        </ErrorContext.Provider>
    );
}




export default ErrorContext;