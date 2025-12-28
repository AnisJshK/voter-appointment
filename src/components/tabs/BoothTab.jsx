import { useState } from "react";

export default function BoothTab({ constituencies, rows, setRows }) {
  const [name, setName] = useState("");
  const [constituencyId, setConstituencyId] = useState("");

  const addBooth = () => {
    if (!name.trim() || !constituencyId) {
      alert("Select constituency and enter booth name");
      return;
    }

    setRows([
      ...rows,
      {
        id: rows.length + 1, // stable incremental id
        name,
        constituencyId: Number(constituencyId),
      },
    ]);

    setName("");
    setConstituencyId("");
  };

  const deleteBooth = (id) => {
    setRows(rows.filter((b) => b.id !== id));
  };

  const editBooth = (id) => {
    const newName = prompt("Edit Booth Name");
    if (!newName) return;

    setRows(
      rows.map((b) =>
        b.id === id ? { ...b, name: newName } : b
      )
    );
  };

  const getConstituencyName = (id) => {
    return constituencies.find((c) => c.id === id)?.constituency || "-";
  };

  return (
    <div className="card">
      <h2>Booth</h2>

      {/* FORM */}
      <div className="form-row">
        <select
          value={constituencyId}
          onChange={(e) => setConstituencyId(e.target.value)}
        >
          <option value="">Select Constituency</option>
          {constituencies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.constituency}
            </option>
          ))}
        </select>

        <input
          value={name}
          placeholder="Booth Name"
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={addBooth}>Add</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Constituency</th>
            <th>Booth Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{getConstituencyName(row.constituencyId)}</td>
              <td>{row.name}</td>
              <td>
                <button onClick={() => editBooth(row.id)}>Edit</button>
                <button onClick={() => deleteBooth(row.id)}>Delete</button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan="4">No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
