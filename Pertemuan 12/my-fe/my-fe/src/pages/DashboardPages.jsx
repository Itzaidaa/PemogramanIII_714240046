const stats = [
  { label: "Total Mahasiswa", value: "17" },
  { label: "Total Pertemuan", value: "7" },
  { label: "Mahasiswa Hadir", value: "16" },
];


export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-lg border bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">{item.value}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
