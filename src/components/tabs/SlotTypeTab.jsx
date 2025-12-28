import { useState } from "react";
import SlotTypeSubTab from "./SlotTypeSubTab";
import SlotTimeSubTab from "./SlotTimeSubTab";

export default function SlotTypeTab({
  centers = [],
  slotTypes,
  setSlotTypes,
  slotTimes,
  setSlotTimes,
}) {
  const [activeSubTab, setActiveSubTab] = useState("type");

  return (
    <div className="card">
      <h2>Slot Configuration</h2>

      <div className="sub-tabs">
        <button
          className={activeSubTab === "type" ? "active" : ""}
          onClick={() => setActiveSubTab("type")}
        >
          Slot Type
        </button>

        <button
          className={activeSubTab === "time" ? "active" : ""}
          onClick={() => setActiveSubTab("time")}
        >
          Slot Time
        </button>
      </div>

      {activeSubTab === "type" && (
        <SlotTypeSubTab
          centers={centers}
          slotTypes={slotTypes}
          setSlotTypes={setSlotTypes}
        />
      )}

      {activeSubTab === "time" && (
        <SlotTimeSubTab
          centers={centers}
          slotTypes={slotTypes}
          slotTimes={slotTimes}
          setSlotTimes={setSlotTimes}
        />
      )}
    </div>
  );
}
