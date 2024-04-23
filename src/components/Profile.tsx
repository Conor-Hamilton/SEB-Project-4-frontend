import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IUser } from "../interfaces/user";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";

type Tab =
  | "settings"
  | "bookedClasses"
  | "historicClasses"
  | "createClass"
  | "editClass";

interface IUserProfile {
  user: IUser | null;
}

export default function UserProfile({ user }: IUserProfile) {
  const [activeTab, setActiveTab] = useState<Tab>("settings");
  const [historicClasses, setHistoricClasses] = useState<any[]>([]);
  const [bookedClasses, setBookedClasses] = useState<any[]>([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const [isPasswordChangeSuccess, setIsPasswordChangeSuccess] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [classTypeId, setClassTypeId] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [editClassId, setEditClassId] = useState<number | null>(null);
  const [editClassIdInput, setEditClassIdInput] = useState("");
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRoles = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${baseUrl}/current_user_type`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserRoles(response.data.type);
        } catch (error) {
          console.error("Error fetching user roles:", error);
        }
      }
    };

    fetchUserRoles();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      if (activeTab === "historicClasses") {
        fetchHistoricClasses();
      } else if (activeTab === "bookedClasses") {
        fetchBookedClasses();
      }
    };

    fetchClasses();
  }, [activeTab]);

  const fetchHistoricClasses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token is missing");
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/class_attendees/past`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistoricClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch historic classes:", error);
    }
  };

  const fetchBookedClasses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token is missing");
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/class_attendees/future`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookedClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch booked classes:", error);
    }
  };

  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPasswordChangeMessage(
        "You must be logged in to change your password."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordChangeMessage("New passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `${baseUrl}/users/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsPasswordChangeSuccess(true);
      setPasswordChangeMessage("Password successfully updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setIsPasswordChangeSuccess(false);
      setPasswordChangeMessage("Failed to change password.");
    }
  };

  const getTabClass = (tab: Tab) => {
    return `my-2 block border-x-0 border-t-0 border-b-2 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight ${
      activeTab === tab
        ? "text-primary border-primary"
        : "text-neutral-500 hover:bg-neutral-100 dark:text-white/50 dark:hover:bg-neutral-700/60"
    }`;
  };

  const handleCreateClass = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("You need to be logged in to create a class.");
      return;
    }

    const formattedStartTime = new Date(startTime)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedEndTime = new Date(endTime)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const classData = {
      title,
      description,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      location,
      class_type_id: classTypeId,
    };

    console.log("Sending data:", classData);

    try {
      const response = await axios.post(`${baseUrl}/classes`, classData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Class created successfully:", response.data);
      setSuccessMessage("Class created successfully!");
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const handleEditClass = (classId: number) => {
    setEditClassId(classId);
    setActiveTab("editClass");
    console.log("Edit class ID:", classId); 
  };

  const handleUpdateClass = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !editClassIdInput) {
      console.error(
        "You need to be logged in and provide a class ID to update a class."
      );
      return;
    }

    const formattedStartTime = new Date(startTime)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedEndTime = new Date(endTime)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const classData = {
      title,
      description,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      location,
      class_type_id: classTypeId,
    };

    console.log("Sending data:", classData); 

    try {
      const response = await axios.put(
        `${baseUrl}/classes/${editClassIdInput}`,
        classData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Class updated successfully:", response.data);
      setSuccessMessage("Class updated successfully!");
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ul
        className="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0"
        role="tablist"
      >
        <li role="presentation">
          <button
            className={getTabClass("settings")}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </li>
        <li role="presentation">
          <button
            className={getTabClass("bookedClasses")}
            onClick={() => setActiveTab("bookedClasses")}
          >
            My Booked Classes
          </button>
        </li>
        <li role="presentation">
          <button
            className={getTabClass("historicClasses")}
            onClick={() => setActiveTab("historicClasses")}
          >
            Historic Classes
          </button>
        </li>
        {(userRoles.includes("Admin") || userRoles.includes("Coach")) && (
          <li role="presentation">
            <button
              className={getTabClass("createClass")}
              onClick={() => setActiveTab("createClass")}
            >
              Create Class
            </button>
          </li>
        )}
        {(userRoles.includes("Admin") || userRoles.includes("Coach")) && (
          <li role="presentation">
            <button
              className={getTabClass("editClass")}
              onClick={() => setActiveTab("editClass")}
            >
              Edit Class
            </button>
          </li>
        )}
      </ul>

      {activeTab === "settings" && (
        <div
          id="tabs-settings"
          role="tabpanel"
          className="p-4 bg-[#2E1A47] text-white rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            Settings for {user?.username}
          </h2>
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="current-password"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="new-password"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="confirm-new-password"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-new-password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="bg-white hover:bg-gray-300 text-[#2E1A47] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Change Password
            </button>
            {passwordChangeMessage && (
              <div
                className={`mt-4 text-sm font-semibold ${
                  isPasswordChangeSuccess ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordChangeMessage}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "bookedClasses" && (
        <div id="tabs-bookedClasses" role="tabpanel" className="space-y-4">
          {bookedClasses.length > 0 ? (
            bookedClasses.map((cls, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#2E1A47] mb-2">
                    {cls.class_.title}
                  </h3>
                  <p className="text-gray-600">{cls.class_.description}</p>
                  <p className="text-sm text-gray-500">
                    Date: {cls.class_.start_time}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No booked classes found.</p>
          )}
        </div>
      )}

      {activeTab === "historicClasses" && (
        <div id="tabs-historicClasses" role="tabpanel" className="space-y-4">
          {historicClasses.length > 0 ? (
            historicClasses.map((cls, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#2E1A47] mb-2">
                    {cls.class_.title}
                  </h3>
                  <p className="text-gray-600">{cls.class_.description}</p>
                  <p className="text-sm text-gray-500">
                    Date: {cls.class_.start_time}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No historic classes found.</p>
          )}
        </div>
      )}

      {activeTab === "createClass" && (
        <form
          onSubmit={handleCreateClass}
          id="tabs-createClass"
          role="tabpanel"
          className="p-4 bg-[#2E1A47] text-white rounded-lg shadow"
        >
          <h2 className="text-xl font-bold mb-4">Create a New Class</h2>
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="class-title"
              >
                Class Title
              </label>
              <input
                type="text"
                id="class-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter class title"
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="class-description"
              >
                Description
              </label>
              <textarea
                id="class-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter class description"
                rows={3}
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="class-start-time"
              >
                Start Time
              </label>
              <input
                type="datetime-local"
                id="class-start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="class-end-time"
              >
                End Time
              </label>
              <input
                type="datetime-local"
                id="class-end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="class-location"
              >
                Location
              </label>
              <input
                type="text"
                id="class-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter class location"
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="class-type-id"
              >
                Class Type ID
              </label>
              <input
                type="number"
                id="class-type-id"
                value={classTypeId}
                onChange={(e) => setClassTypeId(parseInt(e.target.value))}
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-white hover:bg-gray-300 text-[#2E1A47] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Class
            </button>
            {successMessage && (
              <span className="ml-3 text-sm text-green-500">
                {successMessage}
              </span>
            )}
          </div>
        </form>
      )}

      {activeTab === "editClass" && (
        <form
          onSubmit={handleUpdateClass}
          id="tabs-editClass"
          role="tabpanel"
          className="p-4 bg-[#2E1A47] text-white"
        >
          <input type="hidden" name="classId" value={editClassId || ""} />
          <h2 className="text-xl font-bold mb-4">Edit Class</h2>
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label
                htmlFor="edit-class-id"
                className="block text-sm font-bold mb-2"
              >
                Class ID
              </label>
              <input
                type="text"
                id="edit-class-id"
                value={editClassIdInput}
                onChange={(e) => setEditClassIdInput(e.target.value)}
                placeholder="Enter Class ID"
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="class-title"
                className="block text-sm font-bold mb-2"
              >
                Class Title
              </label>
              <input
                type="text"
                id="class-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter class title"
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="class-description"
                className="block text-sm font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="class-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter class description"
                rows={3}
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="class-start-time"
                className="block text-sm font-bold mb-2"
              >
                Start Time
              </label>
              <input
                type="datetime-local"
                id="class-start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="class-end-time"
                className="block text-sm font-bold mb-2"
              >
                End Time
              </label>
              <input
                type="datetime-local"
                id="class-end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="class-location"
                className="block text-sm font-bold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="class-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter class location"
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="class-type-id"
                className="block text-sm font-bold mb-2"
              >
                Class Type ID
              </label>
              <input
                type="number"
                id="class-type-id"
                value={classTypeId}
                onChange={(e) => setClassTypeId(parseInt(e.target.value))}
                className="bg-white text-gray-900 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-white hover:bg-gray-300 text-[#2E1A47] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Class
            </button>
            {successMessage && (
              <span className="ml-3 text-sm text-green-500">
                {successMessage}
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
