import { listDatasetEntries } from "../lib/dataset";

export default function LabelView() {
  const entries = listDatasetEntries();

  return (
    <div className="card">
      <h2>Label Editor</h2>
      <table>
        <thead>
          <tr>
            <th>Family</th>
            <th>Brand</th>
            <th>Pitch (mm)</th>
            <th>OD (mm)</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.family}</td>
              <td>{entry.brand}</td>
              <td>{entry.pitch_mm.toFixed(3)}</td>
              <td>{entry.od_mm.toFixed(1)}</td>
              <td>{entry.file}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
