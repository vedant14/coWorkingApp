import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function getUserProfile(setCurrentUser, uniqueId) {
  const usersRef = doc(db, "user_profile", uniqueId);
  const userSnapShot = await getDoc(usersRef);
  if (userSnapShot.exists()) {
    setCurrentUser(userSnapShot.data());
  } else {
    setCurrentUser(null);
  }
}

export async function getAdminBrandData(uniqueId, brandData, setBrandData) {
  const brandUserRef = query(
    collection(db, "brand_users"),
    where("userId", "==", uniqueId)
  );
  const querySnapshot = await getDocs(brandUserRef);
  if (querySnapshot.docs.length !== 0) {
    querySnapshot.docs.map((doc) => {
      getBrandName(doc.data().brandId, function (brandName) {
        setBrandData((brandData) => [
          ...brandData,
          {
            id: doc.data().brandId,
            name: brandName.name,
          },
        ]);
      });
    });
  }
}

export async function getBrandName(brandId, callback) {
  const brandDataRef = doc(db, "brands", brandId);
  const querySnapshot = await getDoc(brandDataRef);
  if (querySnapshot) {
    return callback(querySnapshot.data());
  }
}

export async function getUserLocationData(uniqueId, brandId, callback) {
  const locationUserRef = query(
    collection(db, "location_users"),
    where("userId", "==", uniqueId),
    where("brandId", "==", brandId)
  );
  const querySnapshot = await getDocs(locationUserRef);
  var array = [];
  querySnapshot.docs.map((doc) => {
    console.log(doc.data());
    getLocationName(doc.data().locationId, function (fetchedLocationData) {
      array.push({
        id: doc.data().locationId,
        name: fetchedLocationData.name,
      });
    });
  });
  return callback(array);
}

export async function getLocationName(locationId, callback) {
  const locationDataRef = doc(db, "locations", locationId);
  const querySnapshot = await getDoc(locationDataRef);
  if (querySnapshot) {
    getBrandName(querySnapshot.data().brandId, function (brandData) {
      var array = {
        id: locationId,
        name: querySnapshot.data().name,
        slug: querySnapshot.data().slug,
        brandName: brandData.name,
        brandId: querySnapshot.data().brandId,
      };
      return callback(array);
    });
  }
}

export async function getBrandDetails(uniqueId, brandId, callback) {
  const brandDataRef = doc(db, "brands", brandId);
  // TODO CHECK IF THE USER IS THE OWNER OF THE BRAND
  const querySnapshot = await getDoc(brandDataRef);
  if (querySnapshot) {
    getUserLocationData(uniqueId, brandId, function (fetchedLocationData) {
      console.log("fetchedLocationData", fetchedLocationData);
      var array = {
        id: brandId,
        name: querySnapshot.data().name,
        locations: fetchedLocationData,
      };
      return callback(array);
    });
  }
}

export async function getEditScheduleData(uniqueId, setEditData) {
  const scheduleRef = doc(db, "user_slots", uniqueId);
  const querySnapshot = await getDoc(scheduleRef);
  if (querySnapshot) {
    setEditData({ data: querySnapshot.data(), id: querySnapshot.id });
  }
}

export async function getUserSchedules(uniqueId, setScheduleData) {
  const slotsRef = query(
    collection(db, "user_slots"),
    where("userRef", "==", uniqueId)
  );
  const querySnapshot = await getDocs(slotsRef);
  setScheduleData(
    querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
  );
}

export async function getUpcomingUserBookings(uniqueId, setBookingData) {
  const slotsRef = query(
    collection(db, "bookings"),
    where("mentorRef", "==", uniqueId),
    where("paymentCaptured", "==", true),
    where("date", ">=", new Date(new Date().setHours(0, 0, 0, 0)))
  );
  const querySnapshot = await getDocs(slotsRef);
  setBookingData(
    querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
  );
}

export async function getTodayUserBookings(uniqueId, setBookingData) {
  const slotsRef = query(
    collection(db, "bookings"),
    where("mentorRef", "==", uniqueId),
    where("paymentCaptured", "==", true),
    where("date", "==", new Date(new Date().setHours(0, 0, 0, 0)))
  );
  const querySnapshot = await getDocs(slotsRef);
  setBookingData(
    querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
  );
}
