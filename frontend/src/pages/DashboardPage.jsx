import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        taskService.getDashboardStats(),
        taskService.getUserTasks()
      ]);
      setStats(statsRes.data.stats);
      setTasks(tasksRes.data.tasks);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(taskId, { status: newStatus });
      loadDashboard();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <div className="value">{stats.totalTasks}</div>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <div className="value" style={{ color: 'var(--secondary-color)' }}>
              {stats.completedTasks}
            </div>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <div className="value" style={{ color: 'var(--warning-color)' }}>
              {stats.inProgressTasks}
            </div>
          </div>
          <div className="stat-card">
            <h3>Overdue</h3>
            <div className="value" style={{ color: 'var(--danger-color)' }}>
              {stats.overdueTasks}
            </div>
          </div>
        </div>
      )}

      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks assigned to you yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Project</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.project?.name}</td>
                <td>
                  <select 
                    value={task.status} 
                    onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      border: '1px solid #ccc',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
                <td>
                  <span className={`badge badge-${task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'primary'}`}>
                    {task.priority}
                  </span>
                </td>
                <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashboardPage;
