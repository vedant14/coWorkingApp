import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import defaultSlotData from "../data/timeSlots.json";

export async function getMentorPublicDetails(slug, setMentorData) {
  const usersRef = query(
    collection(db, "user_profile"),
    where("slug", "==", slug)
  );
  const querySnapshot = await getDocs(usersRef);
  if (querySnapshot.docs.length !== 0) {
    setMentorData(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  } else {
    setMentorData(false);
  }
}

export async function getSlotDetails(mentorId, fromDate, setSlotData) {
  fromDate = new Date(fromDate);
  var toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
  if (mentorId) {
    getUserSlots(mentorId, function (slotData) {
      if (slotData.length === 0) {
        setSlotData(null);
      } else {
        checkAvailability(
          fromDate,
          toDate,
          slotData,
          function (userSlotSchedule) {
            removeExistingBookings(
              userSlotSchedule,
              mentorId,
              function (availableSlotData) {
                setSlotData(availableSlotData);
              }
            );
          }
        );
      }
    });
  } else {
    setSlotData(null);
  }
}

async function getUserSlots(mentorId, callback) {
  var slotArray = [];
  const slotsRef = doc(db, "user_slots", mentorId);
  const querySnapshot = await getDoc(slotsRef);
  if (querySnapshot.exists()) {
    slotArray = querySnapshot.data().scheduleData;
  }
  return callback(slotArray);
}

function checkAvailability(fromDate, toDate, slotData, callback) {
  var dateArray = [];
  var currentDay = 0;
  for (var d = fromDate; d <= toDate; d.setDate(d.getDate() + 1)) {
    dateArray.push({
      date: new Date(d.setHours(0, 0, 0, 0)),
      day: d.getDay(),
      slots: [],
    });
    var currentDaySlots = slotData[d.getDay()]?.slots;
    if (currentDaySlots) {
      defaultSlotData.map((slots) => {
        currentDaySlots.map((currentDaySlot) =>
          getFinalSlots(slots, currentDaySlot, d, function (returnData) {
            dateArray[currentDay]?.slots.push(returnData);
          })
        );
      });
    }
    currentDay++;
  }
  return callback(dateArray);
}

function getFinalSlots(slots, currentDaySlot, d, callback) {
  if (d > new Date()) {
    if (
      slots.value >= currentDaySlot.startTime &&
      slots.value < currentDaySlot.endTime
    ) {
      return callback(slots.value);
    }
  }
}

async function removeExistingBookings(slotData, mentorId, callback) {
  var currentBookings = [];
  const slotsRef = query(
    collection(db, "bookings"),
    where("mentorRef", "==", mentorId)
  );
  const querySnapshot = await getDocs(slotsRef);
  currentBookings = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  if (currentBookings.length > 0) {
    currentBookings.map((booking) => {
      var find = slotData.findIndex(function (slotObject) {
        return (
          slotObject.date.getDate() === booking.date.toDate().getDate() &&
          slotObject.date.getMonth() === booking.date.toDate().getMonth() &&
          slotObject.date.getYear() === booking.date.toDate().getYear()
        );
      });
      if (find !== -1 && slotData[find].slots.length > 0) {
        slotData[find].slots = removeBookingSlot(
          slotData[find].slots,
          booking.time
        );
      }
    });
  }
  return callback(slotData);
}

function removeBookingSlot(arr, value) {
  return arr.filter(function (ele) {
    return ele < value || ele > value + 60;
  });
}
