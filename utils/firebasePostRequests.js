import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  Timestamp,
  collection,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "./firebaseConfig";
import Router from "next/router";
import { toastNotification } from "../components/atoms/toastNotification";

export async function createUserProfile(
  userId,
  firstName,
  lastName,
  userEmail,
  setError
) {
  const userDoc = doc(db, "user_profile", userId);
  const userDocData = {
    email: userEmail,
    firstName: firstName,
    lastName: lastName,
    createdAt: Timestamp.now(),
    merchant: false,
  };
  await setDoc(userDoc, userDocData)
    .then(() => {
      Router.push("/dashboard");
    })
    .catch((error) => {
      setError(error.message);
    });
}

export async function updateUserProfile({
  userId,
  firstName,
  lastName,
  userEmail,
  slug,
  bio,
  amount,
  linkedInUrl,
  selectedLanguages,
  googleLogin,
  profileForm,
  profilePic,
  mentorServices,
}) {
  const userDoc = doc(db, "user_profile", userId);
  const userSnapShot = await getDoc(userDoc);
  const verifySlug = await verifySlugFuntion(userId, slug);
  if (slug && verifySlug === false) {
    toastNotification(
      "Oops, something is not right",
      "This URL is already taken",
      "danger"
    );
  } else {
    const userDocData = {
      email: userEmail ? userEmail : userSnapShot.data().email,
      firstName: firstName ? firstName : userSnapShot.data().firstName,
      lastName: lastName ? lastName : userSnapShot.data().lastName,
      googleLogin: googleLogin
        ? googleLogin
        : userSnapShot.data().googleLogin
        ? userSnapShot.data().googleLogin
        : false,
      slug: slug
        ? slug
        : userSnapShot.data().slug
        ? userSnapShot.data().slug
        : slugify(
            firstName + lastName + "-" + Math.random().toString(36).slice(6)
          ),
      bio: bio ? bio : userSnapShot.data().bio ? userSnapShot.data().bio : null,
      linkedInUrl: linkedInUrl
        ? linkedInUrl
        : userSnapShot.data().linkedInUrl
        ? userSnapShot.data().linkedInUrl
        : null,
      amount: amount
        ? parseFloat(amount)
        : userSnapShot.data().amount
        ? userSnapShot.data().amount
        : null,
      selectedLanguages: selectedLanguages
        ? selectedLanguages
        : userSnapShot.data().selectedLanguages
        ? userSnapShot.data().selectedLanguages
        : null,
      profilePic: profilePic
        ? profilePic
        : userSnapShot.data().profilePic
        ? userSnapShot.data().profilePic
        : false,
      mentorServices: mentorServices
        ? mentorServices
        : userSnapShot.data().mentorServices
        ? userSnapShot.data().mentorServices
        : null,
      createdAt: Timestamp.now(),
    };
    await setDoc(userDoc, userDocData)
      .then(() => {
        if (profileForm === true) {
          toastNotification(
            "Profile updated",
            "Please refresh this page to load the new changes",
            "success"
          );
        } else {
          Router.push("/dashboard");
        }
      })
      .catch((error) => {
        toastNotification(
          "Oops something is not right",
          error.message,
          "danger"
        );
      });
  }
}

export async function updateLocationSlug(uniqueId, locationId, slug, callback) {
  const newSlug = slugify(slug);
  // const verifySlug = await verifySlugFuntion(locationId, newSlug);
  if (newSlug) {
    const userLocationRef = doc(db, "locations", locationId);
    await updateDoc(userLocationRef, {
      slug: slug,
    }).then(() => {
      return callback({
        success: true,
        message: "ERROR",
      });
    });
  } else {
    return callback({ success: false, message: "ERROR" });
  }
}

export async function createBrand({ name, uniqueId }) {
  const newBrandRef = doc(collection(db, "brands"));
  const brandData = {
    name: name,
    createdAt: Timestamp.now(),
  };
  await setDoc(newBrandRef, brandData)
    .then(() => {
      createBrandUser(uniqueId, newBrandRef.id, true);
    })
    .catch((error) => {
      toastNotification("Oops something is wrong", error.message, "danger");
    });
}

export async function updateBrand({ name, brandId }) {
  const updateBrandRef = doc(db, "brands", brandId);
  const brandData = {
    name: name,
    updatedAt: Timestamp.now(),
  };
  await setDoc(updateBrandRef, brandData)
    .then(() => {
      toastNotification("Brand Update", "Data is updated", "success");
    })
    .catch((error) => {
      toastNotification("Oops something is wrong", error.message, "danger");
    });
}

export async function createLocation({ name, brandId, uniqueId }) {
  const newLocationRef = doc(collection(db, "locations"));
  const locationData = {
    name: name,
    brandId: brandId,
    createdAt: Timestamp.now(),
  };
  await setDoc(newLocationRef, locationData)
    .then(() => {
      createLocationUser(uniqueId, newLocationRef.id, brandId, true);
    })
    .catch((error) => {
      toastNotification("Oops something is wrong", error.message, "danger");
    });
}

export async function createBrandUser(uniqueId, brandId, role) {
  const newBrandUserRef = doc(collection(db, "brand_users"));
  const brandUserData = {
    userId: uniqueId,
    brandId: brandId,
    admin: role,
    staff: true,
    createdAt: Timestamp.now(),
  };
  await setDoc(newBrandUserRef, brandUserData)
    .then(() => {
      toastNotification("Brand Created", "Add locations now", "success");
    })
    .catch((error) => {
      toastNotification("Oops something is wrong", error.message, "danger");
    });
}

export async function createLocationUser(uniqueId, locationId, brandId, role) {
  const newLocationUserRef = doc(collection(db, "location_users"));
  const locationUserData = {
    userId: uniqueId,
    brandId: brandId,
    locationId: locationId,
    admin: role,
    staff: true,
    createdAt: Timestamp.now(),
  };
  await setDoc(newLocationUserRef, locationUserData)
    .then(() => {
      toastNotification("Location Created", "You are all set now", "success");
      Router.push(`/brands/${brandId}`);
    })
    .catch((error) => {
      toastNotification("Oops something is wrong", error.message, "danger");
    });
}

async function verifySlugFuntion(locationId, slug) {
  if (slug) {
    const slugRef = query(
      collection(db, "locations"),
      where("slug", "==", slug)
    );
    const querySnapshot = await getDocs(slugRef);
    if (querySnapshot.docs.length === 0) {
      console.log("Vedant", querySnapshot.docs);
      return true;
    } else {
      if (querySnapshot.docs[0].id === locationId) {
        querySnapshot.docs.map((doc) => console.log(doc.id()));
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
}

export async function saveSlotData(uniqueId, userAvailability) {
  const userSlotRef = doc(db, "user_slots", uniqueId);
  const userSlotData = {
    updatedAt: Timestamp.now(),
    scheduleData: userAvailability,
  };
  await setDoc(userSlotRef, userSlotData)
    .then(() => {
      toastNotification(
        "Schedule Updated",
        "Your new schedule has been updated",
        "success"
      );
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export async function saveBookingData(
  paymentId,
  name,
  email,
  message,
  duration,
  mentorService,
  date,
  time,
  mentorId
) {
  const bookingDataRef = doc(db, "bookings", paymentId);
  const bookingData = {
    name: name,
    email: email,
    message: message || null,
    duration: duration,
    mentorService: mentorService,
    date: new Date(date),
    time: time,
    mentorRef: mentorId,
    paymentCaptured: false,
    createdAt: Timestamp.now(),
  };
  await setDoc(bookingDataRef, bookingData).catch((error) => {
    console.error(error.message);
  });
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function uploadUserProfilePic(
  file,
  uniqueId,
  email,
  setProfilePic
) {
  setProfilePic(null);
  toastNotification(
    "Uploading profile pic",
    "Give us a few seconds to upload the profile pic",
    "success"
  );

  const storage = getStorage();
  const storageRef = ref(storage, `profileUploads/${uniqueId}/profilePic`);
  // 'file' comes from the Blob or File API
  const metadata = {
    contentType: `${file.type}`,
  };
  uploadBytes(storageRef, file, metadata).then((snapshot) => {
    var picture = `https://firebasestorage.googleapis.com/v0/b/${
      snapshot.metadata.bucket
    }/o/${snapshot.metadata.fullPath.replaceAll("/", "%2F")}?alt=media`;
    setProfilePic(picture);
    updateProfilePic(picture, uniqueId, email);
  });
}

async function updateProfilePic(profilePic, uniqueId, email) {
  const userDoc = doc(db, "user_profile", uniqueId);
  const userDocData = {
    email: email,
    profilePic: profilePic,
  };
  await updateDoc(userDoc, userDocData);
}
