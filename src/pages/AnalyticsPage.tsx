import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { useRealtimeEmployees } from "@/hooks/useRealtimeEmployees";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Globe, Users, Shield } from "lucide-react";

const AnalyticsPage = () => {
  const { employees } = useRealtimeEmployees(250);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reports</h2>
          <p className="text-muted-foreground">
            Insights and trends from workforce data
          </p>
        </div>

        {/* Market Position */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Market Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Market
                  </span>
                  <span className="font-bold text-purple-900">
                    1.2M employees
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Target Enterprises
                  </span>
                  <span className="font-bold text-purple-900">25,000</span>
                </div>
                <Badge className="bg-purple-600 mt-2">Algeria 🇩🇿</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Expansion Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-green-700 mb-3">
                  North Africa Markets
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="bg-white">
                    Morocco 🇲🇦
                  </Badge>
                  <Badge variant="outline" className="bg-white">
                    Tunisia 🇹🇳
                  </Badge>
                  <Badge variant="outline" className="bg-white">
                    Egypt 🇪🇬
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Platform ready for regional deployment
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Competitive Edge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>No hardware costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>Local compliance built-in</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>Arabic & French UI</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AnalyticsCharts employees={employees} />
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
