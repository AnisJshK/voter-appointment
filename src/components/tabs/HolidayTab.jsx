import { useState } from "react";

export default function HolidayTab({
  booths = [],
  centers = [],
  slotTimes = [],
  rows,
  setRows,
}) {
  const [boothId, setBoothId] = useState("");
  const [centerId, setCenterId] = useState("");
  const [slotTimeId, setSlotTimeId] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [fullDay, setFullDay] = useState(false);

  const filteredCenters = centers.filter(
    (c) => c.boothId === Number(boothId)
  );

  const filteredSlotTimes = slotTimes.filter(
    (s) => s.centerId === Number(centerId)
  );

  const addHoliday = () => {
    if (!boothId || !centerId || !date) return;
    if (!fullDay && !slotTimeId) return;

    setRows([
      ...rows,
      {
        id: rows.length + 1,
        boothId: Number(boothId),
        centerId: Number(centerId),
        slotTimeId: fullDay ? null : Number(slotTimeId),
        date,
        description,
        fullDay,
      },
    ]);

    // reset
    setSlotTimeId("");
    setDate("");
    setDescription("");
    setFullDay(false);
  };

  return (
    <div className="card">
      <h2>Holiday</h2>

      <select
        value={boothId}
        onChange={(e) => {
          setBoothId(e.target.value);
          setCenterId("");
          setSlotTimeId("");
        }}
      >
        <option value="">Select Booth</option>
        {booths.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <select
        value={centerId}
        disabled={!boothId}
        onChange={(e) => {
          setCenterId(e.target.value);
          setSlotTimeId("");
        }}
      >
        <option value="">Select Center</option>
        {filteredCenters.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={fullDay}
          onChange={(e) => setFullDay(e.target.checked)}
        />
        Full Day Holiday
      </label>

      {!fullDay && (
        <select
          value={slotTimeId}
          disabled={!centerId}
          onChange={(e) => setSlotTimeId(e.target.value)}
        >
          <option value="">Select Slot</option>
          {filteredSlotTimes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.startTime} - {s.endTime}
            </option>
          ))}
        </select>
      )}

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addHoliday}>Save Holiday</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Center</th>
            <th>Slot</th>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan="6">No holidays</td>
            </tr>
          )}

          {rows.map((h) => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>
                {centers.find((c) => c.id === h.centerId)?.name}
              </td>
              <td>
                {h.fullDay
                  ? "Full Day"
                  : slotTimes.find((s) => s.id === h.slotTimeId)
                      ?.startTime +
                    " - " +
                    slotTimes.find((s) => s.id === h.slotTimeId)?.endTime}
              </td>
              <td>{h.date}</td>
              <td>{h.description || "-"}</td>
              <td>{h.fullDay ? "Full Day" : "Partial"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
