import { useState } from "react";

export default function ConstituencyTab({ rows, setRows }) {
  const [name, setName] = useState("");

  const addConstituency = () => {
    if (!name.trim()) return;

    // prevent duplicate constituency names
    const exists = rows.find(
      (r) => r.constituency.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert("Constituency already exists");
      return;
    }

    // stable incremental ID (safe, API-ready)
    const newId =
      rows.length === 0
        ? 1
        : Math.max(...rows.map((r) => r.id)) + 1;

    setRows([
      ...rows,
      {
        id: newId,
        constituency: name,
      },
    ]);

    setName("");
  };

  const deleteRow = (id) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  const editRow = (id) => {
    const current = rows.find((r) => r.id === id);
    const newName = prompt("Edit Constituency", current?.constituency);

    if (!newName || !newName.trim()) return;

    // prevent rename to existing constituency
    const exists = rows.find(
      (r) =>
        r.constituency.toLowerCase() === newName.toLowerCase() &&
        r.id !== id
    );

    if (exists) {
      alert("Constituency already exists");
      return;
    }

    setRows(
      rows.map((r) =>
        r.id === id ? { ...r, constituency: newName } : r
      )
    );
  };

  return (
    <div className="card">
      <h2>Constituency</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="Constituency Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addConstituency}>Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Constituency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.constituency}</td>
              <td>
                <button onClick={() => editRow(row.id)}>Edit</button>
                <button onClick={() => deleteRow(row.id)}>Delete</button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan="3">No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
