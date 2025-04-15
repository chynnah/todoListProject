import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  BarChart,
  Bar,
  Area,
  AreaChart
} from "recharts";

// Enhanced color palette with better contrast and visual appeal
const COLORS = [
  "#2563eb", "#16a34a", "#ea580c", "#9333ea", 
  "#0891b2", "#be123c", "#84cc16", "#6366f1",
  "#d946ef", "#f59e0b", "#0ea5e9", "#4f46e5",
  "#14b8a6", "#f43f5e", "#10b981", "#8b5cf6"
];

const Chart = () => {
  const [taskStats, setTaskStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [activeTab, setActiveTab] = useState("overview");
  const [chartType, setChartType] = useState("pie");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [chartView, setChartView] = useState("default");

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
    
    // Mock data for demo purposes
    const mockData = [
      { category_name: "Work", status: "completed", task_count: 12 },
      { category_name: "Work", status: "pending", task_count: 5 },
      { category_name: "Work", status: "in-progress", task_count: 7 },
      { category_name: "Personal", status: "completed", task_count: 8 },
      { category_name: "Personal", status: "pending", task_count: 3 },
      { category_name: "Personal", status: "in-progress", task_count: 2 },
      { category_name: "Study", status: "completed", task_count: 15 },
      { category_name: "Study", status: "pending", task_count: 4 },
      { category_name: "Study", status: "in-progress", task_count: 1 },
      { category_name: "Health", status: "completed", task_count: 6 },
      { category_name: "Health", status: "pending", task_count: 2 },
      { category_name: "Health", status: "in-progress", task_count: 3 },
      { category_name: "Finance", status: "completed", task_count: 4 },
      { category_name: "Finance", status: "pending", task_count: 6 },
      { category_name: "Finance", status: "in-progress", task_count: 2 }
    ];
    
    setTaskStats(mockData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

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

  const statusData = taskStats.reduce((acc, stat) => {
    const existingStatus = acc.find(item => item.status === stat.status);
    if (existingStatus) {
      existingStatus.value += stat.task_count;
    } else {
      acc.push({ status: stat.status, value: stat.task_count });
    }
    return acc;
  }, []);

  // Enhanced time data with realistic trends
  const generateTimeData = (range) => {
    const days = range === "week" 
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : Array.from({ length: 30 }, (_, i) => `Day ${i+1}`);
    
    let completed = 3;
    let pending = 8;
    
    return days.map(day => {
      // Create realistic fluctuations
      completed += Math.floor(Math.random() * 5) - 1;
      pending += Math.floor(Math.random() * 4) - 2;
      
      // Keep values in reasonable range
      completed = Math.max(1, Math.min(completed, 15));
      pending = Math.max(1, Math.min(pending, 15));
      
      return {
        name: day,
        completed,
        pending,
        total: completed + pending
      };
    });
  };

  const timeData = generateTimeData(timeRange);

  // Calculate detailed stats for overview tab
  const totalTasks = statusData.reduce((sum, item) => sum + item.value, 0);
  const completedTasks = statusData.find(s => s.status === "completed")?.value || 0;
  const pendingTasks = statusData.find(s => s.status === "pending")?.value || 0;
  const inProgressTasks = statusData.find(s => s.status === "in-progress")?.value || 0;
  const completionPercentage = Math.round((completedTasks / (totalTasks || 1)) * 100);

  // Data for category progress tab with more detailed information
  const categoryProgressData = categoryData.map(category => {
    const completed = category.completed || 0;
    const pending = category.pending || 0;
    const inProgress = category["in-progress"] || 0;
    const total = category.total || 1;
    
    return {
      ...category,
      completionPercentage: Math.round((completed / total) * 100),
      pendingPercentage: Math.round((pending / total) * 100),
      inProgressPercentage: Math.round((inProgress / total) * 100),
    };
  });

  // Time trend data for detailed view
  const trendData = generateTimeData(timeRange).map(day => ({
    name: day.name,
    value: day.completed,
  }));

  // Custom tooltip for better data visualization
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Animated progress bar component
  const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-in-out"
        style={{
          width: `${percentage}%`,
          backgroundColor: color
        }}
      ></div>
    </div>
  );

  // Status badge component with appropriate colors
  const StatusBadge = ({ status, count }) => {
    const getStatusColor = (status) => {
      switch(status) {
        case "completed": return "bg-green-100 text-green-800 border-green-200";
        case "pending": return "bg-amber-100 text-amber-800 border-amber-200";
        case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
        default: return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };
    
    return (
      <Badge className={`${getStatusColor(status)} py-1 px-2 font-medium`}>
        {status}: {count}
      </Badge>
    );
  };

  return (
    <div className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 bg-white dark:bg-gray-900 text-[#053C5E] dark:text-gray-200 font-sans transition-colors ">
      {/* Overview Cards */}
      <Card className="lg:col-span-3 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-white flex items-center justify-between">
            <span className="text-xl font-bold">Task Dashboard</span>
            <div className="flex space-x-2">
              <Badge variant="outline" className="bg-white dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700">
                Total: {totalTasks}
              </Badge>
              <StatusBadge status="completed" count={completedTasks} />
              <StatusBadge status="pending" count={pendingTasks} />
              <StatusBadge status="in-progress" count={inProgressTasks} />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{completionPercentage}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Task Completion</div>
            <div className="w-full mt-2">
              <ProgressBar percentage={completionPercentage} color="#2563eb" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">{categoryData.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Categories</div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{totalTasks}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
          </div>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card className="lg:col-span-2 overflow-hidden transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
            Tasks by Category
          </CardTitle>
          <div className="flex space-x-1">
            <button
              onClick={() => setChartType("pie")}
              className={`p-1 rounded transition-colors ${
                chartType === "pie"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`p-1 rounded transition-colors ${
                chartType === "bar"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>
        </CardHeader>

        <CardContent className="h-[350px] p-0">
          <div className="flex h-full items-center">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "pie" ? (
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      innerRadius="40%"
                      fill="#8884d8"
                      dataKey="total"
                      nameKey="category_name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      paddingAngle={2}
                      animationDuration={1000}
                      animationEasing="ease-out"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="#fff"
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                ) : (
                  <BarChart
                    data={categoryData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="currentColor" />
                    <YAxis dataKey="category_name" type="category" stroke="currentColor" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="total"
                      fill="#3b82f6"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                      animationDuration={1000}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            {chartType === "pie" && (
              <div className="w-[140px] sm:w-[160px] pr-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Legend</div>
                <ul className="space-y-2">
                  {categoryData.map((entry, index) => (
                    <li key={index} className="flex items-center space-x-2 text-xs md:text-sm">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></span>
                      <span className="truncate text-gray-600 dark:text-gray-400">
                        {entry.category_name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>


      {/* Status Distribution */}
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md bg-white dark:bg-[#1f2937]">
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-white text-lg font-bold">Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] p-0">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    innerRadius="50%"
                    dataKey="value"
                    nameKey="status"
                    paddingAngle={5}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {statusData.map((entry, index) => {
                      let color;
                      switch(entry.status) {
                        case "completed": color = "#16a34a"; break;
                        case "pending": color = "#f59e0b"; break;
                        case "in-progress": color = "#3b82f6"; break;
                        default: color = COLORS[index % COLORS.length];
                      }
                      return (
                        <Cell 
                          key={`cell-status-${index}`} 
                          fill={color}
                          stroke="#fff"
                          strokeWidth={1}
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-around pt-2 px-4">
              {statusData.map((status, index) => {
                let color, bgColorLight, bgColorDark;
                switch(status.status) {
                  case "completed": 
                    color = "#16a34a"; 
                    bgColorLight = "#dcfce7"; 
                    bgColorDark = "#14532d"; 
                    break;
                  case "pending": 
                    color = "#f59e0b"; 
                    bgColorLight = "#fef3c7"; 
                    bgColorDark = "#78350f"; 
                    break;
                  case "in-progress": 
                    color = "#3b82f6"; 
                    bgColorLight = "#dbeafe"; 
                    bgColorDark = "#1e3a8a"; 
                    break;
                  default: 
                    color = COLORS[index % COLORS.length]; 
                    bgColorLight = "#f3f4f6"; 
                    bgColorDark = "#374151";
                }
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center justify-center p-2 rounded-lg"
                    style={{
                      backgroundColor: `var(--bg-${status.status})`,
                      background: `linear-gradient(to bottom, ${bgColorLight}, ${bgColorLight})`,
                      color: color
                    }}
                  >
                    <div className="text-lg font-bold" style={{ color }}>
                      {status.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                      {status.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Series Chart */}
      <Card className="lg:col-span-3 overflow-hidden transition-all duration-300 hover:shadow-md bg-white dark:bg-[#1f2937]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-gray-800 dark:text-white text-lg font-bold">Task Completion Trends</CardTitle>
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
            <TabsList className="grid grid-cols-2 w-[180px]">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="h-[350px] p-0">
          <div className="flex h-full items-center">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={timeData} 
                  margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#16a34a" 
                    fillOpacity={1} 
                    fill="url(#colorCompleted)" 
                    activeDot={{ r: 8 }}
                    animationDuration={1000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pending" 
                    stroke="#f59e0b" 
                    fillOpacity={1} 
                    fill="url(#colorPending)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Metrics Tabs */}
      <Card className="lg:col-span-3 overflow-hidden transition-all duration-300 hover:shadow-md dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-white text-lg font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Detailed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview" className="text-gray-800 dark:text-white">Performance</TabsTrigger>
              <TabsTrigger value="category-progress" className="text-gray-800 dark:text-white">Category Progress</TabsTrigger>
              <TabsTrigger value="task-distribution" className="text-gray-800 dark:text-white">Task Distribution</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="h-[350px] mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-2">Completion Stats</h3>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-white">Overall Completion</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-white">{completionPercentage}%</span>
                      </div>
                      <ProgressBar percentage={completionPercentage} color="#2563eb" />

                      <div className="mt-6 space-y-3">
                        {statusData.map((status, index) => {
                          let color;
                          switch(status.status) {
                            case "completed": color = "#16a34a"; break;
                            case "pending": color = "#f59e0b"; break;
                            case "in-progress": color = "#3b82f6"; break;
                            default: color = "#9ca3af";
                          }
                          const percentage = Math.round((status.value / totalTasks) * 100);
                          return (
                            <div key={index}>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs font-medium text-gray-500 dark:text-white capitalize">{status.status}</span>
                                <span className="text-xs font-medium text-gray-500 dark:text-white">{percentage}%</span>
                              </div>
                              <ProgressBar percentage={percentage} color={color} />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      {statusData.map((status, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold" style={{ color: COLORS[index % COLORS.length] }}>
                            {status.value}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-white capitalize">
                            {status.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-2">Productivity Trend</h3>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip content={<CustomTooltip />} />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          animationDuration={1000}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Category Progress Tab */}
            <TabsContent value="category-progress" className="h-[350px] mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-y-auto pr-2">
                {categoryProgressData.map((category, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-800 dark:text-white">{category.category_name}</h3>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:border-blue-700">
                        {category.total} Tasks
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-green-700 dark:text-green-400">Completed</span>
                          <span className="text-xs font-medium text-gray-500 dark:text-white">{category.completionPercentage}%</span>
                        </div>
                        <ProgressBar percentage={category.completionPercentage} color="#16a34a" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Pending</span>
                          <span className="text-xs font-medium text-gray-500 dark:text-white">{category.pendingPercentage}%</span>
                        </div>
                        <ProgressBar percentage={category.pendingPercentage} color="#f59e0b" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-blue-700 dark:text-blue-400">In Progress</span>
                          <span className="text-xs font-medium text-gray-500 dark:text-white">{category.inProgressPercentage}%</span>
                        </div>
                        <ProgressBar percentage={category.inProgressPercentage} color="#3b82f6" />
                      </div>
                    </div>

                    <div className="flex justify-between mt-4 pt-2 border-t border-gray-100 dark:border-gray-600">
                      <StatusBadge status="completed" count={category.completed || 0} />
                      <StatusBadge status="pending" count={category.pending || 0} />
                      <StatusBadge status="in-progress" count={category["in-progress"] || 0} />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Task Distribution Tab */}
            <TabsContent value="task-distribution" className="h-[350px] mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={categoryData} 
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      barGap={4}
                      barSize={16}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="category_name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar 
                        dataKey="completed" 
                        name="Completed" 
                        fill="#16a34a" 
                        radius={[4, 4, 0, 0]} 
                        animationDuration={800}
                      />
                      <Bar 
                        dataKey="pending" 
                        name="Pending" 
                        fill="#f59e0b" 
                        radius={[4, 4, 0, 0]} 
                        animationDuration={1200}
                      />
                      <Bar 
                        dataKey="in-progress" 
                        name="In Progress" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]} 
                        animationDuration={1600}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-full flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-white mb-2">Distribution Summary</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <p className="text-sm text-gray-600 dark:text-white">
                        {categoryData.length} categories with a total of {totalTasks} tasks.
                        The highest concentration of tasks is in the 
                        <span className="font-medium"> {
                          categoryData.reduce((max, category) => 
                            category.total > max.total ? category : max, 
                            { total: 0, category_name: "" }
                          ).category_name
                        }</span> category.
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto pr-2">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                            Completed
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                            Pending
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                            In Progress
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
                        {categoryData.map((category, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{category.category_name}</td>
                            <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{category.total}</td>
                            <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{category.completed}</td>
                            <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{category.pending}</td>
                            <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{category["in-progress"]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>



      {/* Category Details */}
      <Card className="lg:col-span-3 overflow-hidden transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-gray-800 dark:text-white text-lg font-bold">Detailed Task View</CardTitle>
          <div className="flex space-x-2">
            <select 
              className="px-2 py-1 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={selectedCategory ? selectedCategory : "all"}
              onChange={(e) => setSelectedCategory(e.target.value === "all" ? null : e.target.value)}
            >
              <option value="all">All Categories</option>
              {categoryData.map((category, index) => (
                <option key={index} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
            <div className="flex space-x-1">
              <button 
                onClick={() => setChartView("default")}
                className={`p-1 rounded ${chartView === "default" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-white"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button 
                onClick={() => setChartView("chart")}
                className={`p-1 rounded ${chartView === "chart" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-white"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[400px] overflow-y-auto">
          {chartView === "default" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categoryData
                .filter(category => !selectedCategory || category.category_name === selectedCategory)
                .map((category, index) => {
                  const categoryColor = COLORS[categoryData.findIndex(c => c.category_name === category.category_name) % COLORS.length];
                  return (
                    <div 
                      key={index} 
                      className="bg-white border-l-4 rounded-md shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-600"
                      style={{ borderLeftColor: categoryColor }}
                    >
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 dark:text-white mb-2">{category.category_name}</h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <StatusBadge status="completed" count={category.completed || 0} />
                          <StatusBadge status="pending" count={category.pending || 0} />
                          <StatusBadge status="in-progress" count={category["in-progress"] || 0} />
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-300">Completion</span>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-300">
                              {Math.round(((category.completed || 0) / (category.total || 1)) * 100)}%
                            </span>
                          </div>
                          <ProgressBar 
                            percentage={Math.round(((category.completed || 0) / (category.total || 1)) * 100)} 
                            color={categoryColor} 
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={categoryData.filter(category => !selectedCategory || category.category_name === selectedCategory)} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category_name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="completed" 
                    stackId="a" 
                    fill="#16a34a" 
                    name="Completed"
                    animationDuration={800}
                  />
                  <Bar 
                    dataKey="pending" 
                    stackId="a" 
                    fill="#f59e0b" 
                    name="Pending"
                    animationDuration={1200}
                  />
                  <Bar 
                    dataKey="in-progress" 
                    stackId="a" 
                    fill="#3b82f6" 
                    name="In Progress"
                    animationDuration={1600}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default Chart;