// class STORAGE {
//   static setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

//   static getItem = key => JSON.parse(localStorage.getItem(key));

//   static isItem = key =>
//     JSON.parse(localStorage.getItem(key)) === null ||
//     JSON.parse(localStorage.getItem(key)) === '' ||
//     localStorage.getItem(key) === undefined;

//   static removeItem = key => localStorage.removeItem(key);

//   static clear = () => localStorage.clear();
// }

// export default STORAGE;


class STORAGE {
  constructor() {
    this.dbName = 'PLAYTHEM_WIDGET_DB';
    this.storeName = 'PLAYTHEM_WIDGET_STORE';
    this.dbVersion = 1;
    this.db = null;

    this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async setItem(key, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(JSON.stringify(value), key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error setting item:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async getItem(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = (event) => {
        const result = event.target.result;
        resolve(result ? JSON.parse(result) : null);
      };

      request.onerror = (event) => {
        console.error('Error getting item:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async isItem(key) {
    const item = await this.getItem(key);
    return item === null || item === '';
  }

  async removeItem(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error removing item:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async clear() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error clearing store:', event.target.error);
        reject(event.target.error);
      };
    });
  }
}

export default STORAGE;
