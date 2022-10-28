export function displaySlotData(value) {
  var minutes = value % 100;
  if (minutes == 0) {
    minutes = "00";
  }
  var hour = (value - minutes) / 100;
  if (hour === 0) {
    return `12:${minutes} am`;
  } else if (hour < 12) {
    return `${hour}:${minutes} am`;
  } else if (hour == 12) {
    return `${hour}:${minutes} pm`;
  } else {
    return `${hour - 12}:${minutes} pm`;
  }
}

export function getInitials(inputName) {
  return inputName
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function displayDate(inputDate) {
  const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "June",
    6: "July",
    7: "Aug",
    8: "Sept",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  const year = inputDate.getFullYear();
  const date = inputDate.getDate();
  const monthName = months[inputDate.getMonth()];
  return date + ", " + monthName + " " + year;
}
