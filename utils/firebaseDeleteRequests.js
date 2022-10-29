import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import Router from "next/router";
export async function postDeleteBrand(brandId) {
  deleteAllLocationUser(brandId);
  deleteAllLocations(brandId);
  deleteAllBrandUsers(brandId);
  deleteBrandClean(brandId);
  Router.push("/brands");
}

async function deleteAllLocationUser(brandId) {
  const locationUserRef = query(
    collection(db, "location_users"),
    where("brandId", "==", brandId)
  );
  const querySnapshot = await getDocs(locationUserRef);
  querySnapshot.docs.map((doc) => deleteLocationUser(doc.id));
}

async function deleteLocationUser(id) {
  await deleteDoc(doc(db, "location_users", id));
  // console.log("DeleteLocationUsers");
}

async function deleteAllLocations(brandId) {
  const locationRef = query(
    collection(db, "locations"),
    where("brandId", "==", brandId)
  );
  const querySnapshot = await getDocs(locationRef);
  querySnapshot.docs.map((doc) => deleteLocation(doc.id));
}

async function deleteLocation(id) {
  await deleteDoc(doc(db, "locations", id));
  // console.log("locations");
}

async function deleteAllBrandUsers(brandId) {
  const brandUserRef = query(
    collection(db, "brand_users"),
    where("brandId", "==", brandId)
  );
  const querySnapshot = await getDocs(brandUserRef);
  querySnapshot.docs.map((doc) => deleteBrandUser(doc.id));
}

async function deleteBrandUser(id) {
  await deleteDoc(doc(db, "brand_users", id));
  // console.log("brandUsers");
}
async function deleteBrandClean(id) {
  await deleteDoc(doc(db, "brands", id));
  // console.log("brands");
}
