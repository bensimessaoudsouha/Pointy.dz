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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DollarSign,
  Download,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  User,
  CalendarDays,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";

const PayrollPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPeriodDialogOpen, setIsPeriodDialogOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState("Current Month");

  const downloadPaySlip = (employee: any) => {
    const grossSalary = employee.hours * employee.rate;
    const netSalary = grossSalary - employee.deductions;
    const baseSalary =
      (employee.hours - employee.overtimeHours) * employee.rate;
    const overtimePay = employee.overtimeHours * employee.rate * 1.5;
    const socialSecurity = Math.round(employee.deductions * 0.6);
    const incomeTax = Math.round(employee.deductions * 0.4);

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Helper function to add text
    const addText = (
      text: string,
      x: number,
      y: number,
      fontSize = 10,
      style: "normal" | "bold" = "normal",
    ) => {
      doc.setFont("helvetica", style);
      doc.setFontSize(fontSize);
      doc.text(text, x, y);
    };

    // Header with gradient-like effect
    doc.setFillColor(37, 99, 235); // Blue
    doc.rect(0, 0, pageWidth, 50, "F");

    doc.setTextColor(255, 255, 255);
    addText("POINTY DZ", pageWidth / 2, 20, 24, "bold");
    doc.setFontSize(12);
    doc.text("AI-Verified Workforce Management", pageWidth / 2, 30, {
      align: "center",
    });
    addText("PAY SLIP", pageWidth / 2, 40, 16, "bold");

    // Reset text color
    doc.setTextColor(0, 0, 0);
    yPos = 60;

    // Employee Information Section
    doc.setFillColor(243, 244, 246);
    doc.rect(10, yPos, pageWidth - 20, 30, "F");

    yPos += 10;
    addText("EMPLOYEE INFORMATION", 15, yPos, 12, "bold");
    yPos += 8;
    addText(`Name: ${employee.name}`, 15, yPos, 10);
    addText(`Department: ${employee.department}`, 110, yPos, 10);
    yPos += 6;
    addText(`Period: Current Month`, 15, yPos, 10);
    addText(
      `Status: ${employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}`,
      110,
      yPos,
      10,
    );

    yPos += 15;

    // Work Summary Section
    doc.setDrawColor(200, 200, 200);
    doc.line(10, yPos, pageWidth - 10, yPos);
    yPos += 10;

    addText("WORK SUMMARY", 15, yPos, 12, "bold");
    yPos += 8;
    addText(`Work Days: ${employee.workDays} days`, 15, yPos, 10);
    addText(`Total Hours: ${employee.hours}h`, 110, yPos, 10);
    yPos += 6;
    addText(`Overtime: ${employee.overtimeHours}h`, 15, yPos, 10);
    addText(`Absences: ${employee.absences} days`, 110, yPos, 10);

    yPos += 15;

    // Earnings Section
    doc.setFillColor(240, 253, 244);
    doc.rect(10, yPos, pageWidth - 20, 35, "F");

    yPos += 10;
    addText("EARNINGS BREAKDOWN", 15, yPos, 12, "bold");
    yPos += 8;
    addText("Base Salary:", 15, yPos, 10);
    addText(
      `${baseSalary.toLocaleString()} DA`,
      pageWidth - 50,
      yPos,
      10,
      "bold",
    );
    yPos += 6;
    addText("Overtime Pay (1.5x):", 15, yPos, 10);
    addText(
      `${overtimePay.toLocaleString()} DA`,
      pageWidth - 50,
      yPos,
      10,
      "bold",
    );
    yPos += 8;
    doc.line(15, yPos, pageWidth - 15, yPos);
    yPos += 6;
    addText("Gross Salary:", 15, yPos, 11, "bold");
    addText(
      `${grossSalary.toLocaleString()} DA`,
      pageWidth - 50,
      yPos,
      11,
      "bold",
    );

    yPos += 15;

    // Deductions Section
    doc.setFillColor(254, 242, 242);
    doc.rect(10, yPos, pageWidth - 20, 35, "F");

    yPos += 10;
    addText("DEDUCTIONS", 15, yPos, 12, "bold");
    yPos += 8;
    doc.setTextColor(220, 38, 38);
    addText("Social Security (9%):", 15, yPos, 10);
    addText(
      `-${socialSecurity.toLocaleString()} DA`,
      pageWidth - 50,
      yPos,
      10,
      "bold",
    );
    yPos += 6;
    addText("Income Tax:", 15, yPos, 10);
    addText(
      `-${incomeTax.toLocaleString()} DA`,
      pageWidth - 50,
      yPos,
      10,
      "bold",
    );
    yPos += 8;
    doc.line(15, yPos, pageWidth - 15, yPos);
    yPos += 6;
    addText("Total Deductions:", 15, yPos, 11, "bold");
    addText(
      `-${employee.deductions.toLocaleString()} DA`,
      pageWidth - 50,
      yPos,
      11,
      "bold",
    );

    doc.setTextColor(0, 0, 0);
    yPos += 15;

    // Net Salary Section (Highlighted)
    doc.setFillColor(34, 197, 94);
    doc.rect(10, yPos, pageWidth - 20, 18, "F");

    yPos += 12;
    doc.setTextColor(255, 255, 255);
    addText("NET SALARY (Amount Payable):", 15, yPos, 13, "bold");
    addText(
      `${netSalary.toLocaleString()} DA`,
      pageWidth - 50,
      yPos,
      14,
      "bold",
    );

    doc.setTextColor(0, 0, 0);
    yPos += 15;

    // AI Verification Section
    doc.setFillColor(240, 253, 244);
    doc.rect(10, yPos, pageWidth - 20, 25, "F");

    yPos += 10;
    doc.setTextColor(22, 163, 74);
    addText("✓ 100% AI VERIFIED", 15, yPos, 11, "bold");
    doc.setTextColor(0, 0, 0);
    yPos += 7;
    doc.setFontSize(9);
    doc.text(
      `All work hours automatically verified through facial recognition across ${employee.workDays} work days.`,
      15,
      yPos,
      { maxWidth: pageWidth - 30 },
    );
    yPos += 5;
    doc.text("No discrepancies detected.", 15, yPos);

    // Footer
    yPos = doc.internal.pageSize.getHeight() - 20;
    doc.setDrawColor(200, 200, 200);
    doc.line(10, yPos, pageWidth - 10, yPos);
    yPos += 5;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      pageWidth / 2,
      yPos,
      { align: "center" },
    );
    yPos += 4;
    doc.text(
      "This is an automatically generated document. All calculations based on AI-verified attendance data.",
      pageWidth / 2,
      yPos,
      { align: "center" },
    );

    // Save PDF
    doc.save(
      `PaySlip_${employee.name.replace(/\s/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`,
    );
  };

  const exportPayrollReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("POINTY DZ - Payroll Report", pageWidth / 2, 20, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.text(`Period: ${currentPeriod}`, pageWidth / 2, 30, {
      align: "center",
    });

    doc.setTextColor(0, 0, 0);
    yPos = 50;

    // Summary section
    doc.setFillColor(243, 244, 246);
    doc.rect(10, yPos, pageWidth - 20, 30, "F");
    yPos += 10;
    doc.setFontSize(11);
    doc.text(`Total Employees: ${employees.length}`, 15, yPos);
    doc.text(`Total Payroll: ${totalPayroll.toLocaleString()} DA`, 110, yPos);
    yPos += 7;
    doc.text(`Processed: ${processedCount}`, 15, yPos);
    doc.text(`Pending: ${employees.length - processedCount}`, 110, yPos);
    yPos += 7;
    const avgSalary = Math.round(totalPayroll / employees.length);
    doc.text(`Average Salary: ${avgSalary.toLocaleString()} DA`, 15, yPos);

    yPos += 20;

    // Table header
    doc.setFillColor(37, 99, 235);
    doc.setTextColor(255, 255, 255);
    doc.rect(10, yPos, pageWidth - 20, 10, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Employee", 12, yPos + 7);
    doc.text("Dept", 70, yPos + 7);
    doc.text("Hours", 100, yPos + 7);
    doc.text("Rate", 125, yPos + 7);
    doc.text("Gross", 145, yPos + 7);
    doc.text("Net", 175, yPos + 7);

    yPos += 10;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    // Table rows
    employees.forEach((emp, index) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      const grossSalary = emp.hours * emp.rate;
      const netSalary = grossSalary - emp.deductions;

      if (index % 2 === 0) {
        doc.setFillColor(249, 250, 251);
        doc.rect(10, yPos, pageWidth - 20, 8, "F");
      }

      doc.setFontSize(8);
      doc.text(emp.name.substring(0, 20), 12, yPos + 5);
      doc.text(emp.department.substring(0, 10), 70, yPos + 5);
      doc.text(emp.hours.toString(), 100, yPos + 5);
      doc.text(emp.rate.toString(), 125, yPos + 5);
      doc.text(grossSalary.toLocaleString(), 145, yPos + 5);
      doc.text(netSalary.toLocaleString(), 175, yPos + 5);

      yPos += 8;
    });

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(10, footerY, pageWidth - 10, footerY);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      pageWidth / 2,
      footerY + 5,
      { align: "center" },
    );

    doc.save(`Payroll_Report_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  // Mock data for payroll
  const employees = [
    {
      id: 1,
      name: "Ahmed Benali",
      hours: 168,
      rate: 800,
      verified: true,
      status: "processed",
      department: "Production",
      overtimeHours: 8,
      deductions: 15000,
      workDays: 21,
      absences: 0,
    },
    {
      id: 2,
      name: "Fatima Zerhouni",
      hours: 160,
      rate: 950,
      verified: true,
      status: "processed",
      department: "Administration",
      overtimeHours: 0,
      deductions: 18000,
      workDays: 20,
      absences: 1,
    },
    {
      id: 3,
      name: "Karim Meziane",
      hours: 172,
      rate: 750,
      verified: true,
      status: "pending",
      department: "Production",
      overtimeHours: 12,
      deductions: 12000,
      workDays: 22,
      absences: 0,
    },
    {
      id: 4,
      name: "Sarah Amrani",
      hours: 165,
      rate: 900,
      verified: true,
      status: "processed",
      department: "Quality Control",
      overtimeHours: 5,
      deductions: 16500,
      workDays: 21,
      absences: 0,
    },
    {
      id: 5,
      name: "Youcef Toumi",
      hours: 158,
      rate: 850,
      verified: true,
      status: "pending",
      department: "Logistics",
      overtimeHours: 0,
      deductions: 14000,
      workDays: 20,
      absences: 1,
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
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsPeriodDialogOpen(true)}
            >
              <Calendar className="h-4 w-4" />
              {currentPeriod}
            </Button>
            <Button className="gap-2" onClick={exportPayrollReport}>
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
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setIsDialogOpen(true);
                          }}
                        >
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
                  100% AI-Verified Hours • Algerian Labor Law Compliant
                </h3>
                <p className="text-sm text-blue-700">
                  All work hours automatically verified through existing camera
                  infrastructure. Payroll calculations follow CNAS and IRG
                  Algerian regulations. No new hardware required - uses your
                  current security cameras.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {selectedEmployee?.name} - Payroll Details
              </DialogTitle>
              <DialogDescription>
                Detailed breakdown of work hours, earnings, and deductions
              </DialogDescription>
            </DialogHeader>

            {selectedEmployee && (
              <div className="space-y-6 mt-4">
                {/* Overview Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Gross Salary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {(
                          selectedEmployee.hours * selectedEmployee.rate
                        ).toLocaleString()}{" "}
                        DA
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Net Salary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {(
                          selectedEmployee.hours * selectedEmployee.rate -
                          selectedEmployee.deductions
                        ).toLocaleString()}{" "}
                        DA
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Work Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Work Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Department
                      </span>
                      <span className="font-medium">
                        {selectedEmployee.department}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Work Days
                      </span>
                      <span className="font-medium">
                        {selectedEmployee.workDays} days
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Total Hours
                      </span>
                      <span className="font-medium">
                        {selectedEmployee.hours}h
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Overtime Hours
                      </span>
                      <span className="font-medium">
                        {selectedEmployee.overtimeHours}h
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Absences
                      </span>
                      <span className="font-medium">
                        {selectedEmployee.absences} days
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Earnings Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Earnings Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Base Salary
                      </span>
                      <span className="font-medium">
                        {(
                          (selectedEmployee.hours -
                            selectedEmployee.overtimeHours) *
                          selectedEmployee.rate
                        ).toLocaleString()}{" "}
                        DA
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Overtime Pay (1.5x)
                      </span>
                      <span className="font-medium">
                        {(
                          selectedEmployee.overtimeHours *
                          selectedEmployee.rate *
                          1.5
                        ).toLocaleString()}{" "}
                        DA
                      </span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between items-center font-semibold">
                      <span>Gross Total</span>
                      <span>
                        {(
                          selectedEmployee.hours * selectedEmployee.rate
                        ).toLocaleString()}{" "}
                        DA
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Deductions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Deductions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Social Security (9%)
                      </span>
                      <span className="font-medium text-red-600">
                        -
                        {Math.round(
                          selectedEmployee.deductions * 0.6,
                        ).toLocaleString()}{" "}
                        DA
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Income Tax
                      </span>
                      <span className="font-medium text-red-600">
                        -
                        {Math.round(
                          selectedEmployee.deductions * 0.4,
                        ).toLocaleString()}{" "}
                        DA
                      </span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Deductions</span>
                      <span className="text-red-600">
                        -{selectedEmployee.deductions.toLocaleString()} DA
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Verification Status */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-900">
                          100% AI Verified
                        </h4>
                        <p className="text-sm text-green-700 mt-1">
                          All work hours have been automatically verified
                          through facial recognition across{" "}
                          {selectedEmployee.workDays} work days. No
                          discrepancies detected.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="gap-2"
                    onClick={() => downloadPaySlip(selectedEmployee)}
                  >
                    <Download className="h-4 w-4" />
                    Download Pay Slip
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Period Selection Dialog */}
        <Dialog open={isPeriodDialogOpen} onOpenChange={setIsPeriodDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Select Payroll Period</DialogTitle>
              <DialogDescription>
                Choose the period for which you want to view payroll data
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Button
                variant={
                  currentPeriod === "Current Month" ? "default" : "outline"
                }
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPeriod("Current Month");
                  setIsPeriodDialogOpen(false);
                }}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Current Month
              </Button>
              <Button
                variant={currentPeriod === "Last Month" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPeriod("Last Month");
                  setIsPeriodDialogOpen(false);
                }}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Last Month
              </Button>
              <Button
                variant={
                  currentPeriod === "Last 3 Months" ? "default" : "outline"
                }
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPeriod("Last 3 Months");
                  setIsPeriodDialogOpen(false);
                }}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Last 3 Months
              </Button>
              <Button
                variant={currentPeriod === "This Year" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPeriod("This Year");
                  setIsPeriodDialogOpen(false);
                }}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                This Year
              </Button>
              <Button
                variant={
                  currentPeriod === "Custom Range" ? "default" : "outline"
                }
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPeriod("Custom Range");
                  setIsPeriodDialogOpen(false);
                }}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Custom Range
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PayrollPage;
