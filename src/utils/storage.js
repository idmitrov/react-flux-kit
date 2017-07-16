const storage = {
    /**
     * @name get
     * @param {String} key
     * @desc Get storage item
     * @return {String} item
     */
    get: (key) => {
        return localStorage.getItem(key);
    },
    /**
     * @name add
     * @param {String} key
     * @param {String} value
     * @desc Add storage item
     */
    add: (key, value) => {
        if (localStorage.getItem(key)) {
            console.warn(`Storage already containst an item called: ${key}`);
        } else {
            localStorage.setItem(key, value);
        }
    },
     /**
     * @name update
     * @param {String} key
     * @param {String} value
     * @desc Update an existing storage item
     */
    update: (key, value) => {
        localStorage.setItem(key, value);
    },
    /**
     * @name delete
     * @param {String} key
     * @desc Delete storage item
     */
    delete: (key) => {
        localStorage.removeItem(key);
    },
    /**
     * @name clear
     * @desc Clear all storage items
     */
    clear: () => {
        localStorage.clear();
    }
};

export default storage;
