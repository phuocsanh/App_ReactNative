import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
} from "firebase9/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase9/storage";
// import { initializeApp } from "firebase9/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyBNwWFKrZ_aHS-O2Q8OtjoEaCxbOIz3wr8",
//   authDomain: "myprojectreactnative-faff7.firebaseapp.com",
//   projectId: "myprojectreactnative-faff7",
//   storageBucket: "myprojectreactnative-faff7.appspot.com",
//   messagingSenderId: "562033096838",
//   appId: "1:562033096838:web:f0236981882d1b610f7907",
// };
// const app = initializeApp(firebaseConfig);

// const db = getFirestore();
export const getProducts = async (categoryKey = "da3BzX9lzzP9CZaFmpFW", db) => {
  const docRef = doc(db, "product_categories", categoryKey);
  const ref = collection(db, "products");
  const q = query(ref, where("category", "==", docRef));
  const snapshot = await getDocs(q);
  let arr = [];
  snapshot.forEach((doc) => {
    const { description, images, name, price, published, quantity } =
      doc.data();
    arr.push({
      id: doc.id,
      description,
      images,
      name,
      price,
      published,
      quantity,
    });
  });
  console.log(arr);
  return arr;
};

export const getCategories = async (db) => {
  const q = collection(db, "product_categories");

  const snapshot = await getDocs(q);
  let arr = [];
  snapshot.forEach((doc) => {
    const { name } = doc.data();
    arr.push({
      id: doc.id,
      name,
    });
  });
  return arr;
};
export const insertProduct = async (product, db) => {
  const docRef = doc(db, "product_categories", product.categoryKey);
  let p = {
    images: product.images,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    published: product.published,
    description: product.description,
    category: docRef,
  };
  await addDoc(collection(db, "products"), p);
};
export const deleteProduct = async (id, db) => {
  await deleteDoc(doc(db, "products", id));
};

export const updateProduct = async (product, db) => {
  const docRef = doc(db, "product_categories", product.categoryKey);
  let p = {
    images: product.images,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    published: product.published,
    description: product.description,
    category: docRef,
  };
  await setDoc(doc(db, "products", product.id), p);
};

export const uploadImg = async (img) => {
  if (!img) return;
  const storage = getStorage();
  const { uri } = img;
  const storageRef = ref(storage, "product/" + Math.random());
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Image error"));
    };
    xhr.responseType = "blob";
    xhr.open("Get", uri, true);
    xhr.send(null);
  });
  await uploadBytesResumable(storageRef, blob);
  const url = await getDownloadURL(storageRef);
  return url;
};
