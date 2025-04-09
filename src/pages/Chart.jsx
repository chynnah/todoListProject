import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FaRegChartBar, FaTasks, FaClipboardList } from "react-icons/fa";
import {
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

const COLORS = [
  "#FF1654", "#00C49F", "#FFBB28", "#FF8042",
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

  const categoryData = taskStats.reduce((acc, stat) => {
    const existingCategory = acc.find(item => item.category_name === stat.category_name);
    if (existingCategory) {
      existingCategory[stat.status] = (existingCategory[stat.status] || 0) + stat.task_count;
      existingCategory.total += stat.task_count;
    } else {
      acc.push({
        category_name: stat.category_name,
        [stat.status]: stat.task_count,
        total: stat.task_count
      });
    }
    return acc;
  }, []);

  const statusData = taskStats.reduce((acc, stat) => {
    const existingStatus = acc.find(item => item.status === stat.status);
    if (existingStatus) {
      existingStatus.value += stat.task_count;
    } else {
      acc.push({ status: stat.status, value: stat.task_count });
    }
    return acc;
  }, []);

  const timeData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => ({
    name: day,
    completed: Math.floor(Math.random() * 10),
    pending: Math.floor(Math.random() * 10),
  }));

  const completionPercentage = Math.round(
    ((statusData.find(s => s.status === "completed")?.value || 0) /
      (statusData.reduce((sum, item) => sum + item.value, 0) || 1)) * 100
  );

  return (
    <div className="grid gap-4 p-4">

      {/* Category Distribution */}
      <Card>
        <CardHeader><CardTitle className="text-[#283D3B]">Tasks by Category</CardTitle></CardHeader>
        <CardContent className="h-[300px] sm:h-[400px] md:h-[500px] p-0">
          <div className="flex h-full items-center">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
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
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-[160px] sm:w-[180px] pr-4">
              <ul className="space-y-2">
                {categoryData.map((entry, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="text-sm text-muted-foreground">{entry.category_name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader><CardTitle className="text-[#283D3B]">Tasks by Status</CardTitle></CardHeader>
        <CardContent className="h-[300px] sm:h-[400px] md:h-[500px] p-0">
          <div className="flex h-full items-center">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    fill="#82CA9D"
                    dataKey="value"
                    nameKey="status"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-status-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-[160px] sm:w-[180px] pr-4">
              <ul className="space-y-2">
                {statusData.map((entry, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="text-sm text-muted-foreground">{entry.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Completion */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-[#283D3B]">Weekly Completion</CardTitle>
          <Tabs defaultValue="week" onValueChange={setTimeRange}>
            <TabsList className="grid grid-cols-2 w-[180px]">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="h-[300px] sm:h-[400px] p-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#00C49F" name="Completed" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="pending" stroke="#FF8042" name="Pending" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Metrics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#283D3B] flex items-center gap-2">
            <FaClipboardList className="text-lg" />
            Task Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="category-progress">Category Progress</TabsTrigger>
              <TabsTrigger value="task-distribution">Task Distribution</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="h-[220px] mt-4">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl font-bold text-[#00C49F] mb-1">
                  {completionPercentage}% Completed
                </div>
                <div className="text-md text-muted-foreground">Overall Task Completion</div>
              </div>
            </TabsContent>

            {/* Category Progress Tab */}
            <TabsContent value="category-progress" className="h-[220px] mt-4 overflow-y-auto fade-mask">
              <div className="space-y-4 pr-2">
                {categoryData.map((category, index) => {
                  const completed = category.completed || 0;
                  const total = category.total || 1;
                  const percent = Math.round((completed / total) * 100);
                  return (
                    <div key={index}>
                      <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                        <span>{category.category_name}</span>
                        <span className="text-xs text-muted-foreground">{percent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                            transition: "width 0.4s ease-in-out"
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Task Distribution Tab */}
            <TabsContent value="task-distribution" className="h-[220px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="total"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`dist-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>


    </div>
  );
};

export default Chart;
