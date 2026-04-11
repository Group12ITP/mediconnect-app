import { useState } from "react";
import PharmacistSidebar from "./PharmacistSidebar";
import PharmacistDashboard from "../../Pages/Pharmacists/PharmacistDashboard";
import PharmacyProfile from "../../Pages/Pharmacists/PharmacyProfile";
import InventoryManagement from "../../Pages/Pharmacists/InventoryManagement";

const PharmacistMainLayout = ({ onLogout }) => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <PharmacistSidebar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4">
          {activePage === "dashboard" && <PharmacistDashboard />}
          {activePage === "pharmacy-profile" && <PharmacyProfile />}
          {activePage === "inventory" && <InventoryManagement />}
        </div>
      </div>
    </div>
  );
};

export default PharmacistMainLayout;
