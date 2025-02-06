const localStorage = 'localStorage';
const sessionStorage = 'sessionStorage';

const storage = {
    get<T>(key: string, session?: boolean): T {
        let value: string = '';
        let returnValue: T = '' as T;
        const storage = session ? sessionStorage : localStorage;

        try {
            value = window[storage].getItem(key) || '';
            returnValue = JSON.parse(value) as T;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) { /* empty */ }

        if (typeof returnValue !== 'object') {
            returnValue = value as T;
        }

        return returnValue;
    },

    set(key: string, _value: string | object, session?: boolean): void {
        const storage = session ? sessionStorage : localStorage;
        let value = _value as string;

        if (typeof value === 'object') {
            try {
                value = JSON.stringify(value);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) { /* empty */ }
        }

        try {
            window[storage].setItem(key, value);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) { /* empty */ }
    },

    remove(key: string, session?: boolean): void {
        const storage = session ? sessionStorage : localStorage;

        try {
            window[storage].removeItem(key);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) { /* empty */ }
    },
};

export default storage;
