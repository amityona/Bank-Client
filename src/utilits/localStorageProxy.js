export const saveDataToLocalStorage = async (key, data) => {
    const timestamp = new Date().getTime();
    const expirationTime = 2 * 60 * 60 * 1000;
    const dataToSave = {
        data,
        timestamp: timestamp + expirationTime,
    };
    localStorage.setItem(key, JSON.stringify(dataToSave));
};

export const getDataFromLocalStorage = async (key) => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        const currentTimestamp = new Date().getTime();
        if (currentTimestamp < parsedData.timestamp) {
            return parsedData.data;
        } else {
            localStorage.removeItem(key);
            return null;
        }
    }
};