import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  addMonths,
  subMonths,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  getDay,
} from "date-fns";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");

  // const dates = {
  //   "2024-02-12": {
  //     message: <div>PRESENT</div>,
  //     type: "PRESENT",
  //   },
  //   "2024-02-13": {
  //     message: <div>PRESENT</div>,
  //     type: "PRESENT",
  //   },

  //   "2024-02-15": {
  //     message: <div>PRESENT</div>,
  //     type: "PRESENT",
  //   },
  //   "2024-02-16": {
  //     message: <div>PRESENT</div>,
  //     type: "PRESENT",
  //   },
  //   "2024-02-19": {
  //     message: <div>SICK LEAVE</div>,
  //     type: "ABSENT",
  //   },
  //   "2024-02-20": {
  //     message: <div>SICK LEAVE</div>,
  //     type: "ABSENT",
  //   },
  //   "2024-02-14": {
  //     message: <div>PRESENT</div>,
  //     type: "PRESENT",
  //   },
  // };

  const dates = {
    "2024-05-06": {
      message: "Leave 1",
      type: "EARNED_LEAVE",
      status: "PENDING",
    },
    "2024-05-07": {
      message: "Leave 1",
      type: "EARNED_LEAVE",
      status: "PENDING",
    },
    "2024-05-08": {
      message: "Leave 1",
      type: "EARNED_LEAVE",
      status: "PENDING",
    },
    "2024-05-13": {
      message: "Leave 2",
      type: "EARNED_LEAVE",
      status: "PENDING",
    },
    "2024-05-14": {
      message: "message",
      type: "ABSENT",
    },
    "2024-05-15": {
      message: "message",
      type: "PRESENT",
    },
    "2024-05-16": {
      message: "message",
      type: "PRESENT",
    },
    "2024-05-17": {
      message: "message",
      type: "ABSENT",
    },
    "2024-05-21": {
      message: "Holiday",
      type: "HOLIDAY",
      is_restricted: false,
    },
    "2024-05-22": {
      message: "Holiday",
      type: "HOLIDAY",
      is_restricted: false,
    },
    "2024-05-28": {
      message: "Holiday",
      type: "HOLIDAY",
      is_restricted: false,
    },
    "2024-05-29": {
      message: "Holiday",
      type: "HOLIDAY",
      is_restricted: false,
    },
    "2024-05-30": {
      message: "Holiday",
      type: "HOLIDAY",
      is_restricted: false,
    },
  };

  const getDaysInMonth = (date) => {
    const start = startOfWeek(startOfMonth(date));
    const end = endOfWeek(endOfMonth(date));
    return eachDayOfInterval({ start, end });
  };

  const getDaysInWeek = (date) => {
    const start = startOfWeek(startOfDay(date));
    const end = endOfWeek(endOfDay(date));
    return eachDayOfInterval({ start, end });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const switchViewMode = (mode) => {
    setViewMode(mode);
  };

  const goToPreviousMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const renderCalendar = () => {
    switch (viewMode) {
      case "day":
        return getDay(selectedDate);
      case "week":
        return getDaysInWeek(selectedDate);
      case "month":
      default:
        return getDaysInMonth(selectedDate);
    }
  };

  const calendarDays = renderCalendar();

  return (
    <div className="p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center border border-gray-300 p-4 bg-[#F9FAFB]">
          <div>
            <h1 className="text-2xl font-bold">
              {format(selectedDate, "MMMM yyyy")}
            </h1>
          </div>
          <div className="flex space-x-2 p-2 border">
            <select
              id="viewMode"
              value={viewMode}
              onChange={(e) => switchViewMode(e.target.value)}
              className="select"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-7" style={{ background: "" }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center border border-gray-300 p-2">
              <span>{day}</span>
            </div>
          ))}
          {calendarDays.map((day) => (
            <div
              key={day}
              className={`day text-center py-2 border border-gray-300 min-h-[100px] ${
                !isSameMonth(day, selectedDate)
                  ? "text-gray-400 bg-[#F9FAFB]"
                  : ""
              } ${
                isSameMonth(day, selectedDate) && isSameDay(day, new Date())
                  ? "bg-blue-500 text-white"
                  : ""
              } ${
                getDay(day) === 0 || getDay(day) === 6 ? "bg-[#F0FDF4]" : ""
              } ${
                dates[format(day, "yyyy-MM-dd")]?.type === "ABSENT" &&
                "bg-[#FEF2F2]"
              } ${
                dates[format(day, "yyyy-MM-dd")]?.type === "PRESENT" &&
                "bg-[#F0FDF4]"
              }`}
              onClick={() => handleDateChange(day)}
            >
              <div>{format(day, "d")}</div>
              {dates[format(day, "yyyy-MM-dd")] && (
                <div>{dates[format(day, "yyyy-MM-dd")]?.message}</div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2 border border-gray-300 p-4">
          <button
            onClick={goToPreviousMonth}
            className="button border border-gray-300 p-2 rounded"
          >
            Previous Month
          </button>
          <button
            onClick={goToNextMonth}
            className="button border border-gray-300 p-2 rounded"
          >
            Next Month
          </button>
        </div>
      </div>
    </div>
  );
}
