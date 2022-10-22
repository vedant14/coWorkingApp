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
  Store,
}) {
  const userDoc = doc(db, "user_profile", userId);
  const userSnapShot = await getDoc(userDoc);
  const verifySlug = await verifySlugFuntion(userId, slug);
  if (slug && verifySlug === false) {
    Store.addNotification({
      title: "Error",
      message: "Sorry, this url is already taken",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
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
          Store.addNotification({
            title: "Profile Updated!",
            message: "Please refresh this page to load the new changes",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        } else {
          Router.push("/dashboard");
        }
      })
      .catch((error) => {
        Store.addNotification({
          title: "Error",
          message: error.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  }
}

// slug: slugify(
//   firstName + lastName + "-" + Math.random().toString(36).slice(6)
// ),
async function verifySlugFuntion(userId, slug) {
  if (slug) {
    const slugRef = query(
      collection(db, "user_profile"),
      where("slug", "==", slug)
    );
    const querySnapshot = await getDocs(slugRef);
    if (querySnapshot.docs.length === 0) {
      return true;
    } else {
      if (querySnapshot.docs[0].id === userId) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
}

export async function saveSlotData(uniqueId, userAvailability, Store) {
  const userSlotRef = doc(db, "user_slots", uniqueId);
  const userSlotData = {
    updatedAt: Timestamp.now(),
    scheduleData: userAvailability,
  };
  await setDoc(userSlotRef, userSlotData)
    .then(() => {
      Store.addNotification({
        title: "Schedule Updated!",
        message: "Your new schedule has been updated",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    })
    .catch((error) => {
      console.error(error.message);
    });
}

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
  setProfilePic,
  Store
) {
  setProfilePic(null);
  Store.addNotification({
    title: "Uploading profile pic!",
    message: "Give us a few seconds to upload the profile pic",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
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
