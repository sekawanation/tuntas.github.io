// Code.gs

// 1. ROUTER HALAMAN
function doGet(e) {
  // Jika URL diakhiri ?page=admin, buka halaman Admin
  if (e.parameter.page == 'admin') {
    return HtmlService.createTemplateFromFile('Admin')
      .evaluate()
      .setTitle('Admin Dashboard - Buku Kas')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  // Jika tidak, buka halaman Publik (Index)
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Laporan Kas Publik')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// 2. AMBIL DATA (Untuk Publik & Admin)
function getDataKas() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return []; // Jika hanya header
  
  data.shift(); // Hapus header
  
  // Map data menjadi object
  return data.map(row => ({
    tanggal: row[0],
    keterangan: row[1],
    jenis: row[2],
    nominal: row[3]
  }));
}

// 3. SIMPAN DATA (Khusus Admin)
function tambahTransaksi(formObject) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  
  // Validasi sederhana
  if(!sheet) throw new Error("Sheet 'Data' tidak ditemukan");
  
  // Append Row: Tanggal, Keterangan, Jenis, Nominal
  // Kita konversi tanggal string html ke object date agar format di Sheet rapi
  sheet.appendRow([
    new Date(formObject.tgl),
    formObject.ket,
    formObject.jenis,
    formObject.nom
  ]);
  
  return "Sukses";
}
