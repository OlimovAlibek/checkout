import { openDB } from 'idb';
import pic1 from "../assets/images/pizza.png"
import pic2 from "../assets/images/pic2.png"
import pic3 from "../assets/images/pic3.png"

const DB_NAME = 'shoppingCart';
const STORE_NAME = 'cartItems';
const SHIPPING_STORE_NAME = 'shipping';

export const initDB = async () => {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(SHIPPING_STORE_NAME)) {
            db.createObjectStore(SHIPPING_STORE_NAME, { keyPath: 'id' });
            }
        },
    });
    return db;
};

export const saveCardDetails = async (cardDetails) => {
    const db = await openDB('myDatabase', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('cardDetails')) {
                db.createObjectStore('cardDetails', { keyPath: 'id', autoIncrement: true });
            }
        },
    });
  
    const tx = db.transaction('cardDetails', 'readwrite');
    tx.store.add(cardDetails);
    await tx.done;
};

export const addItemToCart = async (item) => {
    const db = await initDB();
    await db.add(STORE_NAME, item);
};

export const getItemsFromCart = async () => {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
};

export const updateItemInCart = async (id, updatedItem) => {
    const db = await initDB();
    await db.put(STORE_NAME, { ...updatedItem, id });
};

export const deleteItemFromCart = async (id) => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
};

export const getShippingPrice = async () => {
    const db = await initDB();
    const shipping = await db.get(SHIPPING_STORE_NAME, 1);
    return shipping ? shipping.price : 0;
};

export const setShippingPrice = async (price) => {
    const db = await initDB();
    await db.put(SHIPPING_STORE_NAME, { id: 1, price });
};

export const addSampleData = async () => {
    try {
        const sampleItems = [
            { id: 1, name: 'Pizza', description: 'Delicious pizza', price: 10, quantity: 2, image:pic1 },
            { id: 2, name: 'Burger', description: 'Tasty burger', price: 20, quantity: 3, image:pic2},
            { id: 3, name: 'Salad', description: 'Healthy salad', price: 30, quantity: 1, image:pic3 },
        ];

        for (const item of sampleItems) {
            await addItemToCart(item);
        }

        await setShippingPrice(5);

        console.log('Sample data added to IndexedDB successfully!');

    } 
    catch (error) {
        console.error('Error adding sample data to IndexedDB:', error);
    }
};

addSampleData();
