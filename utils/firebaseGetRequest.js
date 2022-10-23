import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import { toastNotification } from "../components/atoms/toastNotification";
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
  querySnapshot.docs.map((doc) => {
    if (querySnapshot.docs.length !== 0) {
      getBrandName(doc.data().brandId, function (brandName) {
        setBrandData((brandData) => [
          ...brandData,
          {
            id: doc.data().brandId,
            name: brandName.name,
          },
        ]);
      });
    } else {
      toastNotification("Error", "No data found", "danger");
    }
  });
}

export async function getBrandName(brandId, callback) {
  const brandDataRef = doc(db, "brands", brandId);
  const querySnapshot = await getDoc(brandDataRef);
  if (querySnapshot) {
    return callback(querySnapshot.data());
  }
}

export async function getBrandDetails(brandId, setBrandData) {
  const brandDataRef = doc(db, "brands", brandId);
  const querySnapshot = await getDoc(brandDataRef);
  if (querySnapshot) {
    setBrandData(querySnapshot.data());
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
