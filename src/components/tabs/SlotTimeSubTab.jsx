import { useState } from "react";

export default function SlotTimeSubTab({
  centers = [],
  slotTypes = [],
  slotTimes,
  setSlotTimes,
}) {
  const [centerId, setCenterId] = useState("");
  const [slotTypeId, setSlotTypeId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [active, setActive] = useState(true);

  const filteredSlotTypes = slotTypes.filter(
    (s) => s.centerId === Number(centerId)
  );

  const addSlotTime = () => {
    if (!slotTypeId || !startTime || !endTime) return;

    setSlotTimes([
      ...slotTimes,
      {
        id: slotTimes.length + 1,
        slotTypeId: Number(slotTypeId),
        startTime,
        endTime,
        capacity,
        active,
      },
    ]);

    setStartTime("");
    setEndTime("");
    setCapacity("");
    setActive(true);
  };

  return (
    <>
      <h3>Slot Time</h3>

      <select
        value={centerId}
        onChange={(e) => {
          setCenterId(e.target.value);
          setSlotTypeId("");
        }}
      >
        <option value="">Select Center</option>
        {centers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={slotTypeId}
        disabled={!centerId}
        onChange={(e) => setSlotTypeId(e.target.value)}
      >
        <option value="">Select Slot Type</option>
        {filteredSlotTypes.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

      <input
        placeholder="Max Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        Active
      </label>

      <button onClick={addSlotTime}>Add Slot Time</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Center</th>
            <th>Slot Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {slotTimes.length === 0 && (
            <tr>
              <td colSpan="7">No slot times</td>
            </tr>
          )}

          {slotTimes.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>
                {centers.find(c =>
                  c.id === slotTypes.find(s => s.id === t.slotTypeId)?.centerId
                )?.name}
              </td>
              <td>{slotTypes.find(s => s.id === t.slotTypeId)?.name}</td>
              <td>{t.startTime}</td>
              <td>{t.endTime}</td>
              <td>{t.capacity || "-"}</td>
              <td>{t.active ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
