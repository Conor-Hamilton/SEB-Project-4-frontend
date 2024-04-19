import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import { IClasses } from "../interfaces/classes";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Classes() {
  const [bookedClassId, setBookedClassId] = useState<number | null>(null);
  const [classes, setClasses] = useState<IClasses[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      const start = startDate.toISOString().split("T")[0];
      const end = endDate.toISOString().split("T")[0];
      console.log("Fetching classes for:", start, "to", end);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/classes?start=${start}&end=${end}`
        );
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [startDate, endDate]);

  const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });

  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(format(addDays(startOfWeekDate, i), "EEEE"));
  }

  const [successMessage, setSuccessMessage] = useState("");

  const handleBookClass = async (classId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      const bookingEndpoint = `http://localhost:4000/api/class_attendees`;

      const userId = JSON.parse(atob(token.split(".")[1])).sub;

      try {
        const response = await axios.post(
          bookingEndpoint,
          {
            class_id: classId,
            user_id: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Booked class successfully:", response.data);
        setSuccessMessage("Class booked successfully!");
        setBookedClassId(classId);
        setTimeout(() => setBookedClassId(null), 5000);
      } catch (error) {
        console.error("Error booking class:");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <h2 className="text-4xl font-bold text-[#2E1A47]">Class Timetable</h2>
        <div className="flex justify-center space-x-4 mt-4 ml-14">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => {
              if (date) setStartDate(date);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMMM d, yyyy"
          />
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => {
              if (date) setEndDate(date);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="MMMM d, yyyy"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {days.map((day) => (
          <div
            key={day}
            className="bg-[#2E1A47] text-white p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold underline mb-4">{day}</h3>
            <div className="space-y-3">
              {classes
                .filter((c) => format(new Date(c.start_time), "EEEE") === day)
                .map((c) => (
                  <div
                    key={c.id}
                    className="bg-white text-[#2E1A47] p-3 rounded shadow"
                  >
                    <h4 className="font-semibold">{c.title}</h4>
                    <p>{`${format(new Date(c.start_time), "p")} - ${format(
                      new Date(c.end_time),
                      "p"
                    )}`}</p>
                    <p className="my-4">{c.description}</p>
                    <p className="my-4">Location: {c.location}</p>
                    <p>Instructor: {c.creator.username}</p>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleBookClass(c.id)}
                        className="mt-2 bg-[#2E1A47] hover:bg-gray-800 transition-colors text-white font-bold py-2 px-4 rounded"
                      >
                        Book Class
                      </button>
                      {bookedClassId === c.id && (
                        <div
                          className="text-xs sm:text-sm md:text-base py-2 px-4 ml-2 mt-2 bg-green-200 rounded-lg flex items-center justify-center"
                          role="alert"
                        >
                          <span className="font-medium">
                            Class booked successfully!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
