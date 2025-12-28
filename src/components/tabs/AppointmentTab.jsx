import { useState } from "react";

export default function AppointmentTab({
  constituencies = [],
  booths = [],
  centers = [],
  slotTypes = [],
  slotTimes = [],
  holidays = [],
  rows = [],
  setRows = () => {},
}) {
  const [editId, setEditId] = useState(null);

  const [voterId, setVoterId] = useState("");
  const [voterName, setVoterName] = useState("");
  const [constituencyId, setConstituencyId] = useState("");
  const [boothId, setBoothId] = useState("");
  const [centerId, setCenterId] = useState("");
  const [slotTypeId, setSlotTypeId] = useState("");
  const [slotTimeId, setSlotTimeId] = useState("");
  const [date, setDate] = useState("");

  /* ---------- FILTERS ---------- */
  const filteredBooths = booths.filter(
    (b) => b.constituencyId === Number(constituencyId)
  );
  const filteredCenters = centers.filter(
    (c) => c.boothId === Number(boothId)
  );
  const filteredSlotTypes = slotTypes.filter(
    (s) => s.centerId === Number(centerId)
  );
  const filteredSlotTimes = slotTimes.filter(
    (s) => s.slotTypeId === Number(slotTypeId)
  );

  /* ---------- SAVE / UPDATE ---------- */
  const saveAppointment = () => {
    if (!voterId || !voterName || !slotTimeId || !date) {
      alert("Fill all fields");
      return;
    }

    // Holiday block
    const isHoliday = holidays.some(
      (h) =>
        h.centerId === Number(centerId) &&
        h.date === date &&
        (h.fullDay || h.slotTimeId === Number(slotTimeId))
    );

    if (isHoliday) {
      alert("Holiday! Appointment not allowed.");
      return;
    }

    // Capacity block (ignore self when editing)
    const slot = slotTimes.find(
      (s) => s.id === Number(slotTimeId)
    );

    const used = rows.filter(
      (a) =>
        a.slotTimeId === Number(slotTimeId) &&
        a.date === date &&
        a.id !== editId
    ).length;

    if (
      slot &&
      slot.capacity &&
      used >= Number(slot.capacity)
    ) {
      alert("Slot capacity full");
      return;
    }

    if (editId) {
      // UPDATE
      setRows(
        rows.map((a) =>
          a.id === editId
            ? {
                ...a,
                voterId,
                voterName,
                constituencyId: Number(constituencyId),
                boothId: Number(boothId),
                centerId: Number(centerId),
                slotTypeId: Number(slotTypeId),
                slotTimeId: Number(slotTimeId),
                date,
              }
            : a
        )
      );
    } else {
      // CREATE
      setRows([
        ...rows,
        {
          id: rows.length + 1,
          voterId,
          voterName,
          constituencyId: Number(constituencyId),
          boothId: Number(boothId),
          centerId: Number(centerId),
          slotTypeId: Number(slotTypeId),
          slotTimeId: Number(slotTimeId),
          date,
        },
      ]);
    }

    resetForm();
  };

  /* ---------- EDIT ---------- */
  const editAppointment = (a) => {
    setEditId(a.id);
    setVoterId(a.voterId);
    setVoterName(a.voterName);
    setConstituencyId(a.constituencyId);
    setBoothId(a.boothId);
    setCenterId(a.centerId);
    setSlotTypeId(a.slotTypeId);
    setSlotTimeId(a.slotTimeId);
    setDate(a.date);
  };

  /* ---------- DELETE ---------- */
  const deleteAppointment = (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    setRows(rows.filter((a) => a.id !== id));
    if (editId === id) resetForm();
  };

  const resetForm = () => {
    setEditId(null);
    setVoterId("");
    setVoterName("");
    setConstituencyId("");
    setBoothId("");
    setCenterId("");
    setSlotTypeId("");
    setSlotTimeId("");
    setDate("");
  };

  return (
    <div className="card">
      <h2>Appointment</h2>

      <input placeholder="Voter ID" value={voterId} onChange={(e) => setVoterId(e.target.value)} />
      <input placeholder="Voter Name" value={voterName} onChange={(e) => setVoterName(e.target.value)} />

      <select value={constituencyId} onChange={(e) => {
        setConstituencyId(e.target.value);
        setBoothId("");
        setCenterId("");
        setSlotTypeId("");
        setSlotTimeId("");
      }}>
        <option value="">Select Constituency</option>
        {constituencies.map((c) => (
          <option key={c.id} value={c.id}>{c.constituency}</option>
        ))}
      </select>

      <select value={boothId} disabled={!constituencyId} onChange={(e) => {
        setBoothId(e.target.value);
        setCenterId("");
        setSlotTypeId("");
        setSlotTimeId("");
      }}>
        <option value="">Select Booth</option>
        {filteredBooths.map((b) => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>

      <select value={centerId} disabled={!boothId} onChange={(e) => {
        setCenterId(e.target.value);
        setSlotTypeId("");
        setSlotTimeId("");
      }}>
        <option value="">Select Center</option>
        {filteredCenters.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select value={slotTypeId} disabled={!centerId} onChange={(e) => {
        setSlotTypeId(e.target.value);
        setSlotTimeId("");
      }}>
        <option value="">Select Slot Type</option>
        {filteredSlotTypes.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <select value={slotTimeId} disabled={!slotTypeId} onChange={(e) => setSlotTimeId(e.target.value)}>
        <option value="">Select Slot Time</option>
        {filteredSlotTimes.map((s) => (
          <option key={s.id} value={s.id}>
            {s.startTime} - {s.endTime}
          </option>
        ))}
      </select>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <button onClick={saveAppointment}>
        {editId ? "Update Appointment" : "Save Appointment"}
      </button>

      {/* ---------- TABLE ---------- */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Voter</th>
            <th>Center</th>
            <th>Slot</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan="6">No appointments</td>
            </tr>
          )}

          {rows.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.voterName}</td>
              <td>{centers.find(c => c.id === a.centerId)?.name}</td>
              <td>
                {slotTimes.find(s => s.id === a.slotTimeId)?.startTime} -{" "}
                {slotTimes.find(s => s.id === a.slotTimeId)?.endTime}
              </td>
              <td>{a.date}</td>
              <td>
                <button onClick={() => editAppointment(a)}>Edit</button>
                <button onClick={() => deleteAppointment(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
