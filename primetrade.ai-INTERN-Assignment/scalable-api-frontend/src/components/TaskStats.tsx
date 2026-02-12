import React from 'react';

interface TaskStatsProps {
  stats: {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
  };
}

const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Pending',
      value: stats.pending,
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'In Progress',
      value: stats.in_progress,
      bgColor: 'bg-indigo-500',
    },
    {
      title: 'Completed',
      value: stats.completed,
      bgColor: 'bg-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <div
          key={stat.title}
          className={`${stat.bgColor} rounded-lg shadow-md p-6 text-white`}
        >
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm opacity-90 mt-1">{stat.title}</div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
