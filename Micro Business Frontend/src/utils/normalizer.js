export const normalizeData = (item, module) => {
  if (!item) return item;
  switch (module) {
    case 'produk':
      return {
        ...item,
        id: item.id_produk,
        name: item.nama_produk,
        category: item.kategori || 'General',
        status: 'Aktif',
        description: item.deskripsi,
        createdAt: '-',
      };
    case 'pelanggan':
      return {
        ...item,
        id: item.id_pelanggan,
        name: item.nama,
        category: item.email || '-',
        status: 'Aktif',
        description: `No HP: ${item.nomor_hp || '-'} | Alamat: ${item.alamat || '-'}`,
        createdAt: '-',
      };
    case 'pembayaran':
      return {
        ...item,
        id: item.id_pembayaran,
        name: `Customer ID: ${item.id_pelanggan}`,
        category: item.metode_pembayaran,
        status: item.status_pembayaran === 'lunas' ? 'Selesai' : 'Pending',
        description: `Total: Rp${item.total_bayar}`,
        createdAt: item.tanggal_pembayaran,
      };
    case 'laporan':
      return {
        ...item,
        id: item.id_laporan,
        name: `Laporan Transaksi`,
        category: 'Keuangan',
        status: 'Selesai',
        description: `Jumlah Transaksi: ${item.jumlah_transaksi} | Total Pendapatan: Rp${item.total_pendapatan}`,
        createdAt: item.tanggal_laporan,
      };
    default:
      return item;
  }
};
