import { getDatasetSummary } from "../lib/dataset";
import { listThreadFamilies } from "../lib/catalog";

export default function Dashboard() {
  const summary = getDatasetSummary();
  const catalog = listThreadFamilies();

  return (
    <div className="card">
      <h2>Dataset Overview</h2>
      <p>Total scans: {summary.totalScans}</p>
      <p>Families tracked in dataset: {Object.keys(summary.families).length}</p>
      <div>
        <h3>Dataset Breakdown</h3>
        <ul>
          {Object.entries(summary.families).map(([family, count]) => (
            <li key={family}>
              {family}: {count}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Catalog Coverage</h3>
        <ul>
          {catalog.map((item) => (
            <li key={item.family}>
              {item.family} ({item.count} specs)
            </li>
          ))}
        </ul>
      </div>
      <p>Last import: {summary.lastImported}</p>
    </div>
  );
}
