import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Input from "../components/Input";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_id")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const fetchTasks = () => {
    const userId = localStorage.getItem("user_id"); 
    fetch(`http://localhost:3000/backend/api/get_tasks.php?user_id=${userId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks || []); 
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (taskData) => {
    fetch("http://localhost:3000/backend/api/add_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        user_id: localStorage.getItem("user_id"), 
        task: taskData.task,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchTasks();
        }
      });
  };

  const updateTaskStatus = (taskId, newStatus) => {
    fetch("http://localhost:3000/backend/api/update_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        task_id: taskId,
        status: newStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchTasks(); 
        }
      });
  };

  const deleteTask = (taskId) => {
    fetch("http://localhost:3000/backend/api/delete_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ task_id: taskId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchTasks(); 
        }
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  // **Favorite Task**
  const toggleFavorite = (taskId, isFavorite) => {
    const newFavoriteStatus = isFavorite ? 0 : 1;
    
    fetch("http://localhost:3000/backend/api/update_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        task_id: taskId,
        favorite: newFavoriteStatus, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchTasks(); // Refresh tasks after update
        }
      })
      .catch((err) => console.error("Error updating favorite:", err));
  };
  

  // **Edit Task**
  const editTask = (taskId, newTaskText) => {
    fetch("http://localhost:3000/backend/api/edit_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        task_id: taskId,
        task: newTaskText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchTasks();  // Refresh tasks after update
        }
      })
      .catch((err) => console.error("Error editing task:", err));
  };
  
  

  return (
    <div>
      <Header />
      <div className="flex mt-9 mr-10 justify-end">
        <div className="bg-[#3E3F5B] h-10 w-70 rounded-tl-[50px] rounded-bl-[50px] rounded-tr-[50px] flex justify-center items-center">
          <h1 className="text-[#FDFAF6] font-medium">Welcome back, {username}!</h1>
        </div>
      </div>

      <div className="ml-4">
        <button className="h-10 w-50 flex justify-center items-center gap-2 cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <Plus color="#3E3F5B" size={16} className="mt-[-3px]" />
          <h4 className="text-[#3E3F5B]">Add New Task</h4>
        </button>
      </div>

      <Tabs
      tasks={tasks}
      updateTaskStatus={updateTaskStatus}
      deleteTask={deleteTask}
      toggleFavorite={toggleFavorite}
      editTask={editTask} // Pass editTask here
    />

      <Input isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTask={addTask} />
    </div>
  );
};

export default Dashboard;
