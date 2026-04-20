import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  LineChart, 
  Line, 
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
  ResponsiveContainer 
} from "recharts";

const lineData = [
  { month: 'Jan', revenue: 12000, expenses: 8000, profit: 4000 },
  { month: 'Feb', revenue: 15000, expenses: 9500, profit: 5500 },
  { month: 'Mar', revenue: 18000, expenses: 10500, profit: 7500 },
  { month: 'Apr', revenue: 22000, expenses: 12000, profit: 10000 },
  { month: 'May', revenue: 25000, expenses: 13500, profit: 11500 },
  { month: 'Jun', revenue: 28000, expenses: 14000, profit: 14000 },
];

const barData = [
  { category: 'Product A', sales: 4500 },
  { category: 'Product B', sales: 3200 },
  { category: 'Product C', sales: 5800 },
  { category: 'Product D', sales: 2900 },
  { category: 'Product E', sales: 6200 },
];

const pieData = [
  { name: 'Direct', value: 35, color: '#0066CC' },
  { name: 'Social', value: 25, color: '#10B981' },
  { name: 'Email', value: 20, color: '#F59E0B' },
  { name: 'Referral', value: 15, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#9CA3AF' },
];

export function ChartsDemo() {
  return (
    <div className="space-y-6">
      {/* Line Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
          <CardTitle className="text-[20px] leading-[28px]">Line Chart</CardTitle>
          <CardDescription>Revenue, expenses, and profit trends over time</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 14, fill: '#64748B' }}
                stroke="#CBD5E1"
              />
              <YAxis 
                tick={{ fontSize: 14, fill: '#64748B' }}
                stroke="#CBD5E1"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #E2E8F0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#0066CC" 
                strokeWidth={3}
                dot={{ fill: '#0066CC', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
          <CardTitle className="text-[20px] leading-[28px]">Bar Chart</CardTitle>
          <CardDescription>Product sales comparison across categories</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 14, fill: '#64748B' }}
                stroke="#CBD5E1"
              />
              <YAxis 
                tick={{ fontSize: 14, fill: '#64748B' }}
                stroke="#CBD5E1"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #E2E8F0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
              />
              <Bar 
                dataKey="sales" 
                fill="#0066CC" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
            <CardTitle className="text-[20px] leading-[28px]">Pie Chart</CardTitle>
            <CardDescription>Traffic source distribution</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #E2E8F0',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
            <CardTitle className="text-[20px] leading-[28px]">Data Breakdown</CardTitle>
            <CardDescription>Detailed traffic source metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-5">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[14px]">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] font-medium">{item.value}%</span>
                    <div className="w-32 bg-slate-100 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full shadow-sm transition-all" 
                        style={{ 
                          width: `${item.value * 2}%`,
                          backgroundColor: item.color 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t-2">
                <div className="flex justify-between">
                  <span className="text-[14px]">Total Traffic</span>
                  <span className="text-[14px]">100%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Multi-Bar Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
          <CardTitle className="text-[20px] leading-[28px]">Grouped Bar Chart</CardTitle>
          <CardDescription>Monthly performance comparison across metrics</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 14, fill: '#64748B' }}
                stroke="#CBD5E1"
              />
              <YAxis 
                tick={{ fontSize: 14, fill: '#64748B' }}
                stroke="#CBD5E1"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #E2E8F0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#0066CC" 
                radius={[8, 8, 0, 0]}
              />
              <Bar 
                dataKey="expenses" 
                fill="#EF4444" 
                radius={[8, 8, 0, 0]}
              />
              <Bar 
                dataKey="profit" 
                fill="#10B981" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}