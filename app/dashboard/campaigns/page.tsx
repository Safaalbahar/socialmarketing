const workflow = [
  ["Draft", "Marketing prepares post captions, media, and target channels."],
  ["Approval", "Manager approves content before publishing."],
  ["Publishing", "Server publishes with encrypted social tokens."],
  ["Tracking", "Webhooks and sync jobs update status and reports."]
];

export default function CampaignsPage() {
  return (
    <section>
      <h1>Campaign Workflow</h1>
      <p>The first version keeps campaign control simple and auditable.</p>

      <table className="table">
        <thead>
          <tr>
            <th>Step</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {workflow.map(([step, purpose]) => (
            <tr key={step}>
              <td>{step}</td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
