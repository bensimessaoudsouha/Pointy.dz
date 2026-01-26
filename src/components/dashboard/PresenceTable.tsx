import { useState, useMemo } from "react";
import { Employee } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ArrowUpDown,
  ShieldCheck,
  ShieldAlert,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface PresenceTableProps {
  employees: Employee[];
}

export function PresenceTable({ employees }: PresenceTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Employee>("lastDetected");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const departments = useMemo(
    () => [...new Set(employees.map((e) => e.department))].sort(),
    [employees],
  );

  const filtered = useMemo(() => {
    return employees
      .filter((e) => {
        const matchesSearch =
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.id.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || e.status === statusFilter;
        const matchesDept =
          departmentFilter === "all" || e.department === departmentFilter;
        return matchesSearch && matchesStatus && matchesDept;
      })
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (aVal instanceof Date && bVal instanceof Date) {
          return sortDir === "asc"
            ? aVal.getTime() - bVal.getTime()
            : bVal.getTime() - aVal.getTime();
        }
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDir === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        return 0;
      });
  }, [employees, search, statusFilter, departmentFilter, sortField, sortDir]);

  const toggleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="IN">On-site</SelectItem>
              <SelectItem value="OUT">Off-site</SelectItem>
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-striped">
          <thead>
            <tr className="border-b bg-muted/50">
              <th
                className="text-left p-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => toggleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Employee
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                className="text-left p-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => toggleSort("department")}
              >
                <div className="flex items-center gap-1">
                  Department
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                AI Verification
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Location
              </th>
              <th
                className="text-left p-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => toggleSort("lastDetected")}
              >
                <div className="flex items-center gap-1">
                  Last Detected
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 20).map((employee) => (
              <tr
                key={employee.id}
                className="border-b last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {employee.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">
                  {employee.department}
                </td>
                <td className="p-4">
                  <Badge
                    variant={employee.status === "IN" ? "default" : "secondary"}
                    className={cn(
                      employee.status === "IN"
                        ? "bg-success/10 text-success hover:bg-success/20"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full mr-1.5",
                        employee.status === "IN"
                          ? "bg-success"
                          : "bg-muted-foreground",
                      )}
                    />
                    {employee.status === "IN" ? "On-site" : "Off-site"}
                  </Badge>
                </td>
                <td className="p-4">
                  {employee.status === "IN" ? (
                    Math.random() > 0.05 ? (
                      <Badge
                        variant="default"
                        className="gap-1 bg-green-50 text-green-700 border-green-200"
                      >
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </Badge>
                    ) : Math.random() > 0.5 ? (
                      <Badge
                        variant="default"
                        className="gap-1 bg-yellow-50 text-yellow-700 border-yellow-200"
                      >
                        <Clock className="h-3 w-3" />
                        Pending
                      </Badge>
                    ) : (
                      <Badge
                        variant="default"
                        className="gap-1 bg-orange-50 text-orange-700 border-orange-200"
                      >
                        <ShieldAlert className="h-3 w-3" />
                        Suspicious
                      </Badge>
                    )
                  ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                  )}
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-sm">{employee.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {employee.zone}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {formatDistanceToNow(employee.lastDetected, {
                    addSuffix: true,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t text-sm text-muted-foreground">
        Showing {Math.min(20, filtered.length)} of {filtered.length} employees
      </div>
    </div>
  );
}
