export default function DataDiriPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Data Diri</h2>

      <div className="rounded-lg border p-6 bg-white shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-500 shrink-0">
          FA
        </div>
        
        <div className="space-y-3 w-full text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Fatimah Azzahra Nur Faidah</h3>
            <p className="text-slate-500 font-medium">Mahasiswa Teknik Informatika</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
              <p className="text-xs text-slate-400 uppercase font-semibold">NPM</p>
              <p className="font-medium text-slate-700">714240046</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
              <p className="text-xs text-slate-400 uppercase font-semibold">Email</p>
              <p className="font-medium text-slate-700">itzaidaa@gmail.com</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
              <p className="text-xs text-slate-400 uppercase font-semibold">Kelas</p>
              <p className="font-medium text-slate-700">D4 TI 2C</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
              <p className="text-xs text-slate-400 uppercase font-semibold">Alamat</p>
              <p className="font-medium text-slate-700">Bandung, Indonesia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
