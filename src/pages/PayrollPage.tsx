import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Download,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

const PayrollPage = () => {
  // Mock data for payroll
  const employees = [
    {
      id: 1,
      name: "Ahmed Benali",
      hours: 168,
      rate: 800,
      verified: true,
      status: "processed",
    },
    {
      id: 2,
      name: "Fatima Zerhouni",
      hours: 160,
      rate: 950,
      verified: true,
      status: "processed",
    },
    {
      id: 3,
      name: "Karim Meziane",
      hours: 172,
      rate: 750,
      verified: true,
      status: "pending",
    },
    {
      id: 4,
      name: "Sarah Amrani",
      hours: 165,
      rate: 900,
      verified: true,
      status: "processed",
    },
    {
      id: 5,
      name: "Youcef Toumi",
      hours: 158,
      rate: 850,
      verified: true,
      status: "pending",
    },
  ];

  const totalPayroll = employees.reduce(
    (acc, emp) => acc + emp.hours * emp.rate,
    0,
  );
  const processedCount = employees.filter(
    (e) => e.status === "processed",
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Payroll Management</h1>
            <p className="text-muted-foreground">
              Automatic salary calculation based on AI-verified work hours
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Current Period
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Payroll
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalPayroll.toLocaleString()} DA
              </div>
              <p className="text-xs text-muted-foreground">
                For {employees.length} employees
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {processedCount}/{employees.length}
              </div>
              <p className="text-xs text-muted-foreground">Payments ready</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  employees.reduce((acc, e) => acc + e.hours, 0) /
                  employees.length
                ).toFixed(1)}
                h
              </div>
              <p className="text-xs text-muted-foreground">Per employee</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Verified</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">
                All hours verified
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payroll Table */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Payroll</CardTitle>
            <CardDescription>
              Automated salary calculation based on verified attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted">
                  <tr>
                    <th className="px-6 py-3">Employee</th>
                    <th className="px-6 py-3">Hours Worked</th>
                    <th className="px-6 py-3">Hourly Rate</th>
                    <th className="px-6 py-3">Total Salary</th>
                    <th className="px-6 py-3">Verification</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b hover:bg-muted/50"
                    >
                      <td className="px-6 py-4 font-medium">{employee.name}</td>
                      <td className="px-6 py-4">{employee.hours}h</td>
                      <td className="px-6 py-4">{employee.rate} DA/h</td>
                      <td className="px-6 py-4 font-semibold">
                        {(employee.hours * employee.rate).toLocaleString()} DA
                      </td>
                      <td className="px-6 py-4">
                        {employee.verified ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            AI Verified
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Pending</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {employee.status === "processed" ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            Processed
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-700"
                          >
                            Pending
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  100% AI-Verified Hours
                </h3>
                <p className="text-sm text-blue-700">
                  All work hours have been automatically verified through our AI
                  facial recognition system. No manual verification needed.
                  Every hour is validated against workplace cameras, ensuring
                  accurate and tamper-proof payroll calculations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PayrollPage;
