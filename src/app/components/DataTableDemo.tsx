import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { 
  ChevronUp, 
  ChevronDown, 
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type SortDirection = 'asc' | 'desc' | null;

interface DataItem {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  revenue: number;
  date: string;
}

const mockData: DataItem[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', revenue: 12500, date: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'pending', revenue: 8300, date: '2024-01-18' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'active', revenue: 15700, date: '2024-01-20' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', status: 'inactive', revenue: 4200, date: '2024-01-12' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', status: 'active', revenue: 19800, date: '2024-01-22' },
  { id: '6', name: 'Diana Prince', email: 'diana@example.com', status: 'pending', revenue: 11200, date: '2024-01-19' },
  { id: '7', name: 'Evan Davis', email: 'evan@example.com', status: 'active', revenue: 16900, date: '2024-01-21' },
  { id: '8', name: 'Fiona Green', email: 'fiona@example.com', status: 'inactive', revenue: 3500, date: '2024-01-10' },
];

export function DataTableDemo() {
  const [data, setData] = useState<DataItem[]>(mockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof DataItem | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (column: keyof DataItem) => {
    let direction: SortDirection = 'asc';
    
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        direction = 'desc';
      } else if (sortDirection === 'desc') {
        direction = null;
      }
    }

    setSortColumn(direction ? column : null);
    setSortDirection(direction);

    if (direction) {
      const sorted = [...data].sort((a, b) => {
        if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
        if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
        return 0;
      });
      setData(sorted);
    } else {
      setData([...mockData]);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20">Active</Badge>;
      case 'pending':
        return <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20">Pending</Badge>;
      case 'inactive':
        return <Badge className="bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const SortIcon = ({ column }: { column: keyof DataItem }) => {
    if (sortColumn !== column) {
      return <ChevronUp className="ml-2 h-4 w-4 opacity-30" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
        <CardTitle className="text-[20px] leading-[28px]">Advanced Data Table</CardTitle>
        <CardDescription>Sortable, filterable, and interactive data display</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2 focus:border-[#0066CC] transition-colors"
            />
          </div>
        </div>

        <div className="rounded-xl border-2 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-slate-50">
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('name')}
                    className="hover:bg-transparent px-0"
                  >
                    Name
                    <SortIcon column="name" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('email')}
                    className="hover:bg-transparent px-0"
                  >
                    Email
                    <SortIcon column="email" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('status')}
                    className="hover:bg-transparent px-0"
                  >
                    Status
                    <SortIcon column="status" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('revenue')}
                    className="hover:bg-transparent px-0"
                  >
                    Revenue
                    <SortIcon column="revenue" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('date')}
                    className="hover:bg-transparent px-0"
                  >
                    Date
                    <SortIcon column="date" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    <Search className="mx-auto h-12 w-12 mb-4 opacity-20" />
                    <div>No results found</div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50">
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">{item.email}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <span className="font-mono">${item.revenue.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:bg-slate-100">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[#EF4444]">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[14px] text-muted-foreground">
            Showing <span className="font-medium">{filteredData.length}</span> of <span className="font-medium">{mockData.length}</span> results
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-2">Previous</Button>
            <Button variant="outline" size="sm" className="border-2">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}