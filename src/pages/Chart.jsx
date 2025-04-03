import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Calendar, Star, CheckCircle } from "lucide-react";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", 
  "#8884D8", "#82CA9D", "#FFC658", "#8DD1E1",
  "#A4DE6C", "#D0ED57", "#FFB6C1", "#FFA07A",
  "#20B2AA", "#778899", "#B0C4DE", "#9370DB"
];

const Chart = () => {
  const [taskStats, setTaskStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [activeTab, setActiveTab] = useState("favorites");

  useEffect(() => {
    const fetchTaskStatistics = async () => {
      try {
        const response = await fetch("http://localhost:3000/backend/api/tasks/get_tasks_statistics.php", {
          method: "GET",
          credentials: "include",
        });
        
        const data = await response.json();
        
        if (data.success) {
          setTaskStats(data.task_stats);
        } else {
          console.error("Error fetching task statistics:", data.message);
        }
      } catch (error) {
        console.error("Error fetching task statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTaskStatistics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Process data for category distribution
  const categoryData = taskStats.reduce((acc, stat) => {
    const existingCategory = acc.find(item => item.category_name === stat.category_name);
    
    if (existingCategory) {
      existingCategory[stat.status] = (existingCategory[stat.status] || 0) + stat.task_count;
      existingCategory.total += stat.task_count;
    } else {
      const newCategory = {
        category_name: stat.category_name, 
        [stat.status]: stat.task_count,
        total: stat.task_count
      };
      acc.push(newCategory);
    }
    
    return acc;
  }, []);

  // Process data for status distribution
  const statusData = taskStats.reduce((acc, stat) => {
    const existingStatus = acc.find(item => item.status === stat.status);
    
    if (existingStatus) {
      existingStatus.value += stat.task_count;
    } else {
      acc.push({
        status: stat.status,
        value: stat.task_count
      });
    }
    
    return acc;
  }, []);

  // Process data for time-based completion
  const timeData = [
    { name: "Mon", completed: Math.floor(Math.random() * 10), pending: Math.floor(Math.random() * 10) },
    { name: "Tue", completed: Math.floor(Math.random() * 10), pending: Math.floor(Math.random() * 10) },
    { name: "Wed", completed: Math.floor(Math.random() * 10), pending: Math.floor(Math.random() * 10) },
    { name: "Thu", completed: Math.floor(Math.random() * 10), pending: Math.floor(Math.random() * 10) },
    { name: "Fri", completed: Math.floor(Math.random() * 10), pending: Math.floor(Math.random() * 10) },
    { name: "Sat", completed: Math.floor(Math.random() * 10), pending: Math.floor(Math.random() * 10) },
    { name: "Sun", completed: Math.floor(Math.random() * 10), pending: Math.floor(Math.random() * 10) },
  ];

  // Process data for favorite tasks
  const favoriteData = [
    { name: "Favorites", value: Math.floor(Math.random() * 10) },
    { name: "Regular", value: Math.floor(Math.random() * 20) },
  ];

  // Fix completion percentage calculation
  const completionPercentage = Math.round(
    ((statusData.find(s => s.status === "completed")?.value || 0) /
    (statusData.reduce((sum, item) => sum + item.value, 0) || 1)) * 100
  );

  return (
    <div className="grid gap-4 p-4">
    {/* Category Distribution Chart */}
    <div className="grid grid-cols-1 gap-4">
      <Card className="border rounded-lg overflow-hidden">
        <CardHeader className="border-b p-4">
          <CardTitle className="text-lg font-semibold">Tasks by Category</CardTitle>
        </CardHeader>
        <CardContent className="p-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
                nameKey="category_name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  
    {/* Status Distribution Chart */}
    <div className="grid grid-cols-1 gap-4">
      <Card className="border rounded-lg overflow-hidden">
        <CardHeader className="border-b p-4">
          <CardTitle className="text-lg font-semibold">Tasks by Status</CardTitle>
        </CardHeader>
        <CardContent className="p-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="status"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  
    {/* Time-based Completion Chart */}
    <div className="grid grid-cols-1 gap-4">
      <Card className="border rounded-lg overflow-hidden">
        <CardHeader className="border-b p-4 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Weekly Completion</CardTitle>
          <Tabs
            defaultValue="week"
            className="w-[180px]"
            onValueChange={(value) => setTimeRange(value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#00C49F"
                activeDot={{ r: 8 }}
                name="Completed"
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#FF8042"
                name="Pending"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  
    {/* Favorites and Other Metrics */}
    <div className="grid grid-cols-1 gap-4">
      <Card className="border rounded-lg overflow-hidden">
        <CardHeader className="border-b p-4">
          <CardTitle className="text-lg font-semibold">Task Metrics</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center justify-center">Overview</TabsTrigger>
              <TabsTrigger value="category-progress" className="flex items-center justify-center">Category Progress</TabsTrigger>
              <TabsTrigger value="task-distribution" className="flex items-center justify-center">Task Distribution</TabsTrigger>
            </TabsList>
  
            <TabsContent value="overview" className="h-[220px] mt-4">
              {/* Overall Completion */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  {completionPercentage}% Completed
                </div>
                <div className="text-lg text-gray-500">Overall Task Completion</div>
              </div>
            </TabsContent>
  
            <TabsContent value="category-progress" className="h-[220px] mt-4">
              {/* Task Progress by Category */}
              <div className="grid grid-cols-2 gap-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="font-medium text-gray-800">{category.category_name}</div>
                    <div className="text-sm text-gray-500">
                      {Math.round((category.completed / category.total) * 100)}% Completed
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
  
            <TabsContent value="task-distribution" className="h-[220px] mt-4">
              {/* Task Distribution by Category (Pie Chart) */}
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="total"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </div>
  


  );
};

export default Chart;
