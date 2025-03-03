import React from "react";

const ActivityLogCard = ({ action, taskName, timestamp, user, newStatus, prevStatus }) => {
    //console.log(taskName);
    
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700 w-full max-w-md transition-all hover:shadow-lg">
      
     
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {taskName &&(
            taskName || "Untitled Text"
          )}
        </h3>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-lg ${
            action === "Deleted"
              ? "bg-red-100 text-red-700"
              : action === "Created"
              ? "bg-green-100 text-green-700"
              : action === "Updated"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {action}
        </span>
      </div>

      {/* User & Timestamp */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium text-gray-800 dark:text-gray-200">Performed by:</span> {user || "Unknown User"}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {timestamp ? new Date(timestamp).toLocaleString() : "Unknown Date"}
      </p>

      {/* Status Change (Only if available) */}
      {prevStatus && newStatus && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          <span className="font-medium text-gray-900 dark:text-white">Status Changed:</span>  
          <span className="ml-1 px-2 py-1 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-700">
            {prevStatus} → {newStatus}
          </span>
        </p>
      )}
    </div>
  );
};

export default ActivityLogCard;
