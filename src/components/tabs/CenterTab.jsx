import { useState } from "react";

export default function CenterTab({
  constituencies,
  booths,
  rows,
  setRows,
}) {
  const [centerName, setCenterName] = useState("");
  const [constituencyId, setConstituencyId] = useState("");
  const [boothId, setBoothId] = useState("");

  const addCenter = () => {
    if (!centerName || !constituencyId || !boothId) {
      alert("Fill all fields");
      return;
    }

    setRows([
      ...rows,
      {
        id: rows.length + 1,
        name: centerName,
        constituencyId: Number(constituencyId),
        boothId: Number(boothId),
      },
    ]);

    setCenterName("");
    setConstituencyId("");
    setBoothId("");
  };

  const deleteCenter = (id) => {
    setRows(rows.filter((c) => c.id !== id));
  };

  const editCenter = (id) => {
    const newName = prompt("Edit Center Name");
    if (!newName) return;

    setRows(
      rows.map((c) =>
        c.id === id ? { ...c, name: newName } : c
      )
    );
  };

  const filteredBooths = booths.filter(
    (b) => b.constituencyId === Number(constituencyId)
  );

  const getConstituencyName = (id) =>
    constituencies.find((c) => c.id === id)?.constituency || "-";

  const getBoothName = (id) =>
    booths.find((b) => b.id === id)?.name || "-";

  return (
    <div className="card">
      <h2>Center</h2>

      {/* FORM */}
      <div className="form-row">
        <select
          value={constituencyId}
          onChange={(e) => {
            setConstituencyId(e.target.value);
            setBoothId(""); // reset booth
          }}
        >
          <option value="">Select Constituency</option>
          {constituencies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.constituency}
            </option>
          ))}
        </select>

        <select
          value={boothId}
          onChange={(e) => setBoothId(e.target.value)}
          disabled={!constituencyId}
        >
          <option value="">Select Booth</option>
          {filteredBooths.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Center Name"
          value={centerName}
          onChange={(e) => setCenterName(e.target.value)}
        />

        <button onClick={addCenter}>Add</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Constituency</th>
            <th>Booth</th>
            <th>Center</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{getConstituencyName(row.constituencyId)}</td>
              <td>{getBoothName(row.boothId)}</td>
              <td>{row.name}</td>
              <td>
                <button onClick={() => editCenter(row.id)}>Edit</button>
                <button onClick={() => deleteCenter(row.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan="5">No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
