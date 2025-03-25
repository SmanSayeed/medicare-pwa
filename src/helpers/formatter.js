

  // Helper function to format time
  export const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
  };

 
   // Helper function to format date
   export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  
  // Helper function to format date and time (e.g., "2025-03-25 08:16:20")
  export const formatDateTime = (dateTimeString, type = "all") => {
    const date = new Date(dateTimeString.replace(" ", "T")); // Replace space with 'T' for ISO format
  
    const options = {
      date: { day: "numeric", month: "long", year: "numeric" },
      time: { hour: "numeric", minute: "numeric", hour12: true },
      all: { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", hour12: true },
    };
  
    return date.toLocaleString("en-US", options[type]);
  };

  // Helper function to convert duration (e.g., "00:26:24") to total minutes
export const formatDurationToMinutes = (durationString) => {
  const [hours, minutes, seconds] = durationString.split(":").map(Number);
  const totalMinutes = Math.ceil(hours * 60 + minutes + seconds / 60); // Convert to minutes and round up
  return totalMinutes;
};

// Helper function to calculate duration between two date-time strings
export const calculateDuration = (startTime, endTime) => {
  const start = new Date(startTime.replace(" ", "T")); // Convert start time to Date object
  const end = new Date(endTime.replace(" ", "T")); // Convert end time to Date object

  const durationInMinutes = Math.ceil((end - start) / (1000 * 60)); // Calculate difference in minutes and round up
  return durationInMinutes;
};