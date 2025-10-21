export default function DeployView() {
  return (
    <div className="card">
      <h2>Deploy</h2>
      <p>Use <code>npm run export</code> to update checksums and <code>npm run deploy</code> to copy the bundle to the mobile app.</p>
      <p>For cloud distribution, configure Supabase credentials in environment variables and wire the <code>uploadModel</code> helper.</p>
    </div>
  );
}
