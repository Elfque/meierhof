const openReservationBtn = document.querySelector("#open-reservation-btn");
const reservationHome = document.querySelector(".starting-modal");
const peopleModal = document.querySelector(".people-modal");
const dateModal = document.querySelector(".date-modal");
const timeModal = document.querySelector(".time-modal");
const cannotPlaceModal = document.querySelector(".cannot-offer-seat-modal");
const informationModal = document.querySelector(".information-modal");
const availaleModal = document.querySelector(".available-modal");
const moreModal = document.querySelector(".more-than-modal");
const overlay = document.querySelector(".overlay");
const peopleSpan = document.querySelectorAll(".people-number");
const dateSpan = document.querySelectorAll(".date-div");
const timeSpan = document.querySelectorAll(".time-div");
const availableSchedule = document.querySelectorAll(".available-sch");
const peoplesDiv = document.querySelector(".peoples");
const peopleInput = document.querySelector(".people-input");
const peopleSetBtn = document.querySelector(".people-set-btn");
const peopleCancelBtn = document.querySelector(".people-cancel-btn");
const dateSetBtn = document.querySelector(".date-set-btn");
const dateCancelBtn = document.querySelector(".date-cancel-btn");
const timeSetBtn = document.querySelector(".time-set-btn");
const timeCancelBtn = document.querySelector(".time-cancel-btn");
const moreThanBtn = document.querySelector(".more-than-btn");
const bookBtn = document.querySelector(".book-btn");
const openPeople = document.querySelector(".open-people");
const openDate = document.querySelector(".open-date");
const openTime = document.querySelector(".open-time");
const currentMonthDiv = document.querySelector(".current-month");
const calendarContainer = document.getElementById("calendar");

const nextMonthBtn = document.querySelector(".next-month");
const prevMonthBtn = document.querySelector(".prev-month");

const infoBookBtn = document.querySelector(".info-book-btn");
const infoBackBtn = document.querySelector(".info-back-btn");

const singleAvailability = document.querySelectorAll(".single-time-available");
const closeBtn = document.querySelectorAll(".close-btn");
const openMoreTimeBtn = document.querySelector(".open-more-time");

closeBtn.forEach((item) => {
  item.addEventListener("click", () => {
    reservationHome.classList.remove("active");
    dateModal.classList.remove("active");
    timeModal.classList.remove("active");
    peopleModal.classList.remove("active");
    cannotPlaceModal.classList.remove("active");
    informationModal.classList.remove("active");
    availaleModal.classList.remove("active");
    moreModal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

let reservationDate = "";
let reservationTime = "";
let people = 4;

const closePeopleModal = () => {
  peopleModal.classList.remove("active");
  reservationHome.classList.add("active");
};

const closeDateModal = () => {
  dateModal.classList.remove("active");
  reservationHome.classList.add("active");
};

dateSetBtn.addEventListener("click", closeDateModal);
dateCancelBtn.addEventListener("click", closeDateModal);

const closeTimeModal = () => {
  timeModal.classList.remove("active");
  reservationHome.classList.add("active");
};

timeSetBtn.addEventListener("click", closeTimeModal);
timeCancelBtn.addEventListener("click", closeTimeModal);

openDate.addEventListener("click", () => {
  dateModal.classList.add("active");
  reservationHome.classList.add("active");
});

openTime.addEventListener("click", () => {
  timeModal.classList.add("active");
  reservationHome.classList.add("active");
});

infoBackBtn.addEventListener("click", () => {
  reservationHome.classList.add("active");
  informationModal.classList.remove("active");
});

infoBookBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  informationModal.classList.remove("active");
});

openMoreTimeBtn.addEventListener("click", () => {
  availaleModal.classList.add("active");
  cannotPlaceModal.classList.remove("active");
});

peopleCancelBtn.addEventListener("click", closePeopleModal);
peopleSetBtn.addEventListener("click", closePeopleModal);

bookBtn.addEventListener("click", () => {
  //   if (people > 10) {
  // } else {
  //     informationModal.classList.add("active");
  // }
  cannotPlaceModal.classList.add("active");
  reservationHome.classList.remove("active");
});

const setPeopleNumber = () => {
  peopleSpan.forEach((item) => {
    item.textContent = people;
  });
};
setPeopleNumber();

const fillPeopleContainer = () => {
  for (let i = 1; i < 21; i++) {
    const content = `<div class="px-4 border-bottom border-dark py-2 single-person" id="${i}">${i} ${
      i > 1 ? "People" : "Person"
    }</div>`;
    peoplesDiv.insertAdjacentHTML("beforeend", content);
  }
};

const selectActivePeople = () => {
  peoplesDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("single-person")) {
      const child = peoplesDiv.querySelectorAll(".single-person");
      people = e.target.id;
      peopleInput.value = e.target.id;
      setPeopleNumber();
      child.forEach((item) => {
        item.classList.remove("active");
      });

      e.target.classList.add("active");
    }
  });
};

selectActivePeople();
fillPeopleContainer();

availableSchedule.forEach((item) => {
  item.addEventListener("click", () => {
    const parent = item.parentElement;
    const grid = parent.querySelector(".available-grid");
    grid.classList.toggle("active");
  });
});

openPeople.addEventListener("click", () => {
  peopleModal.classList.add("active");
});

peopleInput.addEventListener("input", (e) => {
  const child = peoplesDiv.querySelectorAll(".single-person");
  child.forEach((item) => {
    item.classList.remove("active");
  });

  people = e.target.value;
  const parent = peopleInput.parentElement;
  parent.classList.add("active");
  setPeopleNumber();
});

openReservationBtn.addEventListener("click", () => {
  reservationHome.classList.add("active");
  overlay.classList.add("active");
});

singleAvailability.forEach((item) => {
  item.addEventListener("click", (single) => {
    if (people > 10) {
      moreModal.classList.add("active");
    } else {
      informationModal.classList.add("active");
    }

    availaleModal.classList.remove("active");
  });
});

moreThanBtn.addEventListener("click", () => {
  moreModal.classList.remove("active");
  availaleModal.classList.add("active");
});

// CALENDAR
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const showDate = () => {
  dateSpan.forEach((item) => {
    item.textContent = reservationDate;
  });
};

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

currentMonthDiv.textContent = `${
  months[Number(currentMonth - 1)]
} ${currentYear}`;
reservationDate = `${currentDate.getDate()}/${currentMonth}/${currentYear}`;

showDate();
const generateCalendar = (month, year) => {
  const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
  const startDay = dayjs(`${year}-${month}-01`).day();
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-day");
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-day");
    dayCell.id = day;
    dayCell.innerText = day;
    calendar.appendChild(dayCell);
  }
};

generateCalendar(currentMonth, currentYear);

nextMonthBtn.addEventListener("click", () => {
  if (Number(currentMonth) === 12) {
    currentYear++;
    currentMonth = 1;
  } else {
    currentMonth++;
  }
  currentMonthDiv.textContent = `${
    months[Number(currentMonth - 1)]
  } ${currentYear}`;
  generateCalendar(currentMonth, currentYear);
});

prevMonthBtn.addEventListener("click", () => {
  if (Number(currentMonth) === 1) {
    currentYear--;
    currentMonth = 12;
  } else {
    currentMonth--;
  }
  currentMonthDiv.textContent = `${
    months[Number(currentMonth - 1)]
  } ${currentYear}`;
  generateCalendar(currentMonth, currentYear);
});

calendarContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("calendar-day")) {
    reservationDate = `${e.target.id}/${currentMonth}/${currentYear}`;

    calendarContainer.querySelectorAll(".calendar-day").forEach((item) => {
      item.classList.remove("active");
    });
    e.target.classList.add("active");
  }
  showDate();
});

const showTime = () => {
  timeSpan.forEach((item) => {
    item.textContent = reservationTime;
  });
};

const selectTime = (time) => {
  const timeHour = time.getHours();
  const timeMinute = time.getMinutes();

  reservationTime = `${timeHour} : ${timeMinute}`;
  showTime();
};

createTimePicker("time-picker-container", {
  format: "12hr",
  minuteInterval: 15,
  onSelect: selectTime,
});

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const times = {
  lunch: {
    name: "Lunch",
    timeRange: "11:30 - 16:00",
    times: [
      "11:30",
      "11:45",
      "12:00",
      "12:15",
      "12:30",
      "12:45",
      "13:00",
      "13:15",
      "13:30",
      "13:45",
      "14:00",
    ],
  },
  dinner: {
    name: "Dinner",
    timeRange: "16:00 - 00:00",
    times: [
      "18:00",
      "18:15",
      "18:30",
      "18:45",
      "19:00",
      "19:15",
      "19:30",
      "19:45",
      "20:00",
      "20:15",
      "20:30",
      "20:45",
      "21:00",
    ],
  },
};
// const times = ["10:00", "15:00", "15:40"];
const daysContainer = document.getElementById("daysContainer");

function getCurrentWeekDates() {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const currentWeekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - currentDayOfWeek + i);
    currentWeekDates.push(date);
  }
  return currentWeekDates;
}

function formatDate(date) {
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

const currentWeekDates = getCurrentWeekDates();

daysOfWeek.forEach((day, index) => {
  const dayContainer = document.createElement("div");
  dayContainer.className = "avaiable-day mt-4";

  const dayTitle = document.createElement("div");
  dayTitle.className = "text-center py-1 available-date";
  dayTitle.textContent = `${day} (${formatDate(currentWeekDates[index])})`;

  dayContainer.appendChild(dayTitle);

  const timesContainer = document.createElement("div");
  timesContainer.className = "times";

  Object.values(times).forEach((time) => {
    const contain = document.createElement("div");
    const timeType = document.createElement("div");
    timeType.className =
      "d-flex justify-content-between px-2 py-2 available-sch";

    timeType.addEventListener("click", (e) => {
      const parent = timeType.parentElement;
      const grid = parent.querySelector(".available-grid");
      grid.classList.toggle("active");
    });

    const times = document.createElement("div");
    times.className = "available-grid";

    time.times.forEach((item) => {
      const timeElement = document.createElement("div");
      timeElement.className = "single-time-available";
      timeElement.textContent = item;
      timeElement.addEventListener("click", function () {
        if (people > 10) {
          moreModal.classList.add("active");
        } else {
          informationModal.classList.add("active");
        }

        availaleModal.classList.remove("active");
      });
      times.appendChild(timeElement);
    });

    timeType.innerHTML = `<div class="flex">
   ${time.name} <span class="fw-bold ml-2">${time.timeRange}</span>
 </div>
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  width="20"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>`;

    contain.appendChild(timeType);
    contain.appendChild(times);

    timesContainer.appendChild(contain);
  });

  dayContainer.appendChild(timesContainer);
  daysContainer.appendChild(dayContainer);
});
