export default function AppointmentGrid({ rows, onEdit, onDelete }) {
  if (rows.length === 0) {
    return <p>No appointments</p>;
  }

  return (
    <table className="grid">
      <thead>
        <tr>
          <th>ID</th>
          <th>Voter</th>
          <th>Constituency</th>
          <th>Booth</th>
          <th>Center</th>
          <th>Slot Type</th>
          <th>Slot Time</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            <td>{row.voterId}</td>
            <td>{row.name}</td>
            <td>{row.constituency}</td>
            <td>{row.booth}</td>
            <td>{row.center}</td>
            <td>{row.slotType}</td>
            <td>{row.slotTime}</td>
            <td>{row.date}</td>
            <td>
              <button onClick={() => onEdit(row)}>Edit</button>
              <button onClick={() => onDelete(row.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
