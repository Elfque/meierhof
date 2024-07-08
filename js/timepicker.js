function createTimePicker(elementId, options) {
  const defaultOptions = {
    format: "24hr",
    minuteInterval: 5,
    onSelect: (time) => {},
  };

  const settings = { ...defaultOptions, ...options };
  const container = document.getElementById(elementId);

  // Create hour and minute dropdowns
  const hourSelect = document.createElement("select");
  const minuteSelect = document.createElement("select");
  const periodSelect = document.createElement("select");

  hourSelect.className = "time-select";
  minuteSelect.className = "time-select";
  periodSelect.className = "time-select";

  const createOption = (value, text) => {
    const option = document.createElement("option");
    option.value = value;
    option.text = text;
    return option;
  };

  // Populate hour dropdown
  const hourRange = settings.format === "12hr" ? 12 : 24;
  for (let i = 0; i < hourRange; i++) {
    const hour = settings.format === "12hr" ? (i === 0 ? 12 : i) : i;
    hourSelect.appendChild(createOption(hour, String(hour).padStart(2, "0")));
  }

  // Populate minute dropdown
  for (let i = 0; i < 60; i += settings.minuteInterval) {
    minuteSelect.appendChild(createOption(i, String(i).padStart(2, "0")));
  }

  // Populate period dropdown for 12hr format
  if (settings.format === "12hr") {
    periodSelect.appendChild(createOption("AM", "AM"));
    periodSelect.appendChild(createOption("PM", "PM"));
  }

  // Append selects to the time picker element
  const timePickerElement = document.createElement("div");
  timePickerElement.classList.add("time-picker");
  timePickerElement.appendChild(hourSelect);
  timePickerElement.appendChild(document.createTextNode(":"));
  timePickerElement.appendChild(minuteSelect);
  if (settings.format === "12hr") {
    timePickerElement.appendChild(periodSelect);
  }
  container.appendChild(timePickerElement);

  // Function to get selected time
  const getSelectedTime = () => {
    let hours = parseInt(hourSelect.value);
    const minutes = parseInt(minuteSelect.value);
    const period = settings.format === "12hr" ? periodSelect.value : "";

    if (settings.format === "12hr") {
      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }
    }

    const time = new Date();
    time.setHours(hours, minutes, 0, 0);
    return time;
  };

  // Event listeners for select elements
  const updateTime = () => {
    const selectedTime = getSelectedTime();
    settings.onSelect(selectedTime);
  };

  hourSelect.addEventListener("change", updateTime);
  minuteSelect.addEventListener("change", updateTime);
  if (settings.format === "12hr") {
    periodSelect.addEventListener("change", updateTime);
  }

  // Initialize with current time
  const now = new Date();
  let initialHours = now.getHours();
  if (settings.format === "12hr") {
    periodSelect.value = initialHours >= 12 ? "PM" : "AM";
    initialHours = initialHours % 12 || 12; // Convert 0 to 12 for 12-hour format
  }
  hourSelect.value = initialHours;
  minuteSelect.value =
    Math.floor(now.getMinutes() / settings.minuteInterval) *
    settings.minuteInterval;

  // Trigger initial selection callback
  updateTime();
}
