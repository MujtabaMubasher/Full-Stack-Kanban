import React from 'react';
import ActivityLogCard from '../component/activityLogCard';
import { useTodo } from '../context/todoContext';

const ActivityLogs = () => {
    const { activityLogs } = useTodo();
    //console.log(activityLogs);
    
  
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Activity Logs</h2>
                {activityLogs.length > 0 ? (
                    <div className="space-y-4">
                        {activityLogs.map((log) => (
                            <ActivityLogCard key={log._id}  action = {log.action} taskName ={log.taskName} timestamp = {log.timestamp} user = {log.user} newStatus={log.newStatus} prevStatus = {log.prevStatus}  />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center">No activity logs available.</p>
                )}
            </div>
        </div>
    );
};

export default ActivityLogs;
