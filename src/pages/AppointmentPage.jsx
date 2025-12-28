import { useState } from "react";
import "../styles/appointment.css";

import TabsContainer from "../components/tabs/TabsContainer";
import ConstituencyTab from "../components/tabs/ConstituencyTab";
import BoothTab from "../components/tabs/BoothTab";
import CenterTab from "../components/tabs/CenterTab";
import SlotTypeTab from "../components/tabs/SlotTypeTab";
import HolidayTab from "../components/tabs/HolidayTab";
import AppointmentTab from "../components/tabs/AppointmentTab";

export default function AppointmentPage() {
  const [activeTab, setActiveTab] = useState("constituency");

  // MASTER DATA (shared across tabs)
  const [constituencies, setConstituencies] = useState([]);
  const [booths, setBooths] = useState([]);
  const [centers, setCenters] = useState([]);
  const [slotTypes, setSlotTypes] = useState([]);
  const [slotTimes, setSlotTimes] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [appointments, setAppointments] = useState([]);

  return (
    <div className="page">
      <TabsContainer activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="content">
        {activeTab === "constituency" && (
          <ConstituencyTab rows={constituencies} setRows={setConstituencies} />
        )}

        {activeTab === "booth" && (
          <BoothTab
            constituencies={constituencies}
            rows={booths}
            setRows={setBooths}
          />
        )}

        {activeTab === "center" && (
          <CenterTab
            constituencies={constituencies}
            booths={booths}
            rows={centers}
            setRows={setCenters}
          />
        )}

        {activeTab === "slot" && (
          <SlotTypeTab
            centers={centers}
            slotTypes={slotTypes}
            setSlotTypes={setSlotTypes}
            slotTimes={slotTimes}
            setSlotTimes={setSlotTimes}
          />
        )}

        {activeTab === "holiday" && (
          <HolidayTab
           constituencies={constituencies}
           booths={booths}
           centers={centers}
           slotTimes={slotTimes}
           rows={holidays}
            setRows={setHolidays}
          />
        )}


        {activeTab === "appointment" && (
          <AppointmentTab
            constituencies={constituencies}
            booths={booths}
            centers={centers}
            slotTypes={slotTypes}
            slotTimes={slotTimes}
            holidays={holidays}
            rows={appointments}
            setRows={setAppointments}
          />
        )}
      </div>
    </div>
  );
}
