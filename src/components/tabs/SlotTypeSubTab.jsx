import { useState } from "react";

export default function SlotTypeSubTab({
  centers = [],
  slotTypes,
  setSlotTypes,
}) {
  const [centerId, setCenterId] = useState("");
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);

  const addSlotType = () => {
    if (!centerId || !name.trim()) return;

    setSlotTypes([
      ...slotTypes,
      {
        id: slotTypes.length + 1,
        centerId: Number(centerId),
        name,
        active,
      },
    ]);

    setName("");
    setActive(true);
  };

  return (
    <>
      <h3>Slot Type</h3>

      <select value={centerId} onChange={(e) => setCenterId(e.target.value)}>
        <option value="">Select Center</option>
        {centers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Slot Type Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        Active
      </label>

      <button onClick={addSlotType}>Add Slot Type</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Center</th>
            <th>Slot Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {slotTypes.length === 0 && (
            <tr>
              <td colSpan="4">No slot types</td>
            </tr>
          )}

          {slotTypes.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{centers.find(c => c.id === s.centerId)?.name}</td>
              <td>{s.name}</td>
              <td>{s.active ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
