const createStorage = () => {
  const dbName = 'PLAYTHEM_WIDGET_DB';
  const storeName = 'PLAYTHEM_WIDGET_STORE';
  const dbVersion = 1;
  let db = null;

  const init = async () => {
    try {
      const request = indexedDB.open(dbName, dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };

      db = await new Promise((resolve, reject) => {
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      });
    } catch (error) {
      console.error('IndexedDB error:', error);
      throw error;
    }
  };

  const setItem = async (key, value) => {
    try {
      await new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(JSON.stringify(value), key);

        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
      });
    } catch (error) {
      console.error('Error setting item:', error);
      throw error;
    }
  };

  const getItem = async (key) => {
      const result = await new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = (event) => resolve(event.target.result ? JSON.parse(event.target.result) : null);
        request.onerror = (event) => reject(event.target.error);
      });
      return result;
  };

  const isItem = async (key) => {
    try {
      const item = await getItem(key);
      return item === null || item === '';
    } catch (error) {
      console.error('Error checking item:', error);
      throw error;
    }
  };

  const removeItem = async (key) => {
    try {
      await new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);

        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
      });
    } catch (error) {
      console.error('Error removing item:', error);
      throw error;
    }
  };

  const clear = async () => {
    try {
      await new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
      });
    } catch (error) {
      console.error('Error clearing store:', error);
      throw error;
    }
  };

  return {
    init,
    setItem,
    getItem,
    isItem,
    removeItem,
    clear
  };
};

export default createStorage;
