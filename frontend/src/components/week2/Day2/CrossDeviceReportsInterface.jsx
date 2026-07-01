import SalesReportSummaryCards from "./SalesReportSummaryCards";
import AlertNotifications from "./AlertNotifications";
import ReportDataPresentation from "./ReportDataPresentation";

export default function CrossDeviceReportsInterface() {
  
  const reportSummaries = [
    {
      title: "Weekly Sales",
      amount: "98,500",
    },
    {
      title: "Monthly Sales",
      amount: "420,000",
    },
    {
      title: "Annual Sales",
      amount: "5,240,000",
    },
  ];

  const alertNotifications = [
    {
      message: "Low LPG Stock",
      level: "Warning",
    },
    {
      message: "Branch Synchronization Successful",
      level: "Success",
    },
    {
      message: "Offline Branch Device",
      level: "Critical",
    },
  ];

 
  const reportData = [
    {
      branch: "Balayan",
      totalSales: "98,500",
      transactions: 120,
    },
    {
      branch: "Calatagan",
      totalSales: "85,000",
      transactions: 102,
    },
    {
      branch: "Cuenca",
      totalSales: "74,300",
      transactions: 89,
    },
  ];

  return (
    <>
      <h1>Cross-Device Reports and Alert Notification Interface</h1>

      <SalesReportSummaryCards
        reportSummaries={reportSummaries}
      />

      <AlertNotifications
        alertNotifications={alertNotifications}
      />

      <ReportDataPresentation
        reportData={reportData}
      />
    </>
  );
}