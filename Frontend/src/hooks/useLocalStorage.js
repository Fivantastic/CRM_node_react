import { useEffect, useState } from "react";

export const useLocalStorage = (name , outsideInitialValue) => {

    const [value, setValue] = useState(() => {
        return JSON.parse(localStorage.getItem(name)) || outsideInitialValue
    });

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(value));
    }, [name, value]);

    return [value, setValue];
}
