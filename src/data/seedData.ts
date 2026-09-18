import { Passage, Question } from '../types';

export const SEED_PASSAGES: Passage[] = [
  {
    id: 'passage-1',
    title: 'Ancaman Sampah Plastik terhadap Ekosistem Laut',
    content: `Lautan mengalami ancaman pemanasan dan menjadi semakin asam karena kita terus memompa lebih banyak CO2 ke atmosfer. Selain itu, lautan juga menghadapi ancaman lain dari manusia, yakni penggunaan plastik. Kehidupan modern saat ini didominasi oleh kemasan makanan berbahan plastik yang diolah dengan teknologi tinggi dan digunakan setiap hari oleh masyarakat. Dalam sebuah laporan telah disebutkan bahwa pada tahun 2050 sampah plastik di laut akan lebih banyak daripada jumlah ikan apabila kecenderungan ini terus berlanjut. Hal tersebut merupakan sebuah ancaman besar.

Dibutuhkan tindakan skala besar untuk berpindah dari kecenderungan tersebut mengingat banyak pihak yang terlibat dalam bidang pekerjaan ini. Masyarakat sektor swasta dan masyarakat sipil perlu mobilisasi untuk menangkap peluang ekonomi lain di luar dari pengelolaan plastik.

Solusi tersebut tidak mudah. Fakta bahwa harga minyak yang rendah mengakibatkan biaya yang dibutuhkan untuk daur ulang plastik jauh lebih mahal daripada memproduksi yang baru. Kondisi lain yang menunjukkan ekonomi di negara berkembang tumbuh lebih besar menjadikan penggunaan plastik juga meningkat. Solusi yang dibutuhkan adalah cara kita menggunakan plastik. Misalnya dengan mengurangi penggunaan plastik dalam kemasan atau menggunakannya kembali sebanyak yang kita bisa.

Produsen plastik juga dapat membantu dalam pengelolaan plastik, seperti memproduksi barang-barang plastik yang dapat digunakan kembali atau beralih ke plastik yang dapat dijadikan kompos. Solusi apa pun akan membawa perubahan besar dalam cara menggunakan produk yang terbuat dari plastik.`,
    category: 'Pemahaman Tekstual',
    source: 'Modul TKA SMA Bahasa Indonesia 2026',
    status: 'published',
    createdAt: new Date('2026-01-15T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:00:00Z').toISOString(),
  },
  {
    id: 'passage-2',
    title: 'Perkembangan Kecerdasan Buatan dan Transformasi Literasi Siswa',
    content: `Perkembangan teknologi kecerdasan buatan (artificial intelligence/AI) telah membawa transformasi signifikan pada berbagai aspek kehidupan, termasuk dunia pendidikan. Dalam bidang kebahasaan dan literasi, kehadiran alat bantu berbasis bahasa alami memudahkan siswa dalam menyusun draf, menganalisis struktur kalimat, hingga menerjemahkan teks antarbangsa dalam hitungan detik.

Kendati demikian, kemudahan tersebut menghadirkan tantangan baru terhadap daya kritis dan orisinalitas berpikir para pelajar. Ketergantungan berlebih terhadap sistem otomatis dikhawatirkan dapat mengikis kemampuan bernalar analitis secara mandiri. Membaca kritis bukan sekadar menyerap ringkasan simpulan yang disajikan mesin, melainkan menguji argumen, memeriksa sumber rujukan, dan mengidentifikasi bias yang tersirat dalam wacana.

Oleh sebab itu, kurikulum pendidikan bahasa masa kini dituntut tidak melarang penggunaan AI, melainkan membekali siswa dengan etika digital dan keterampilan kurasi informasi. Pelajar masa depan adalah mereka yang mampu berkolaborasi dengan teknologi tanpa kehilangan ketajaman rasa bahasa dan kedalaman daya kritis personal.`,
    category: 'Teknologi & Pendidikan',
    source: 'Jurnal Literasi Bahasa & Kebudayaan 2026',
    status: 'published',
    createdAt: new Date('2026-02-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-02-01T10:00:00Z').toISOString(),
  },
];

export const SEED_QUESTIONS: Question[] = [
  {
    id: 'soal-1',
    passageId: 'passage-1',
    question: 'Makna istilah mobilisasi pada paragraf kedua teks tersebut adalah ....',
    options: {
      A: 'bergerak bersama',
      B: 'melangkah cepat',
      C: 'beradu cepat',
      D: 'mengatur bersama',
      E: 'berpikir bersama',
    },
    correctAnswer: 'A',
    explanation: 'Dalam konteks paragraf kedua, istilah mobilisasi bermakna pengerahan atau tindakan bergerak bersama oleh seluruh elemen masyarakat sektor swasta dan masyarakat sipil demi menciptakan peluang ekonomi baru.',
    category: 'Pemahaman Tekstual',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T08:30:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:30:00Z').toISOString(),
  },
  {
    id: 'soal-2',
    passageId: 'passage-1',
    question: 'Berdasarkan teks tersebut, penyebab utama biaya daur ulang plastik jauh lebih mahal daripada memproduksi plastik baru adalah ....',
    options: {
      A: 'rendahnya harga minyak bumi di pasar dunia',
      B: 'kurangnya minat masyarakat terhadap produk daur ulang',
      C: 'sulitnya mengumpulkan sampah plastik dari lautan',
      D: 'belum tersedianya teknologi mesin pencacah plastik modern',
      E: 'regulasi pemerintah yang melarang industri daur ulang',
    },
    correctAnswer: 'A',
    explanation: 'Paragraf ketiga menjelaskan secara eksplisit: "Fakta bahwa harga minyak yang rendah mengakibatkan biaya yang dibutuhkan untuk daur ulang plastik jauh lebih mahal daripada memproduksi yang baru."',
    category: 'Pemahaman Tekstual',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T08:45:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:45:00Z').toISOString(),
  },
  {
    id: 'soal-3',
    passageId: 'passage-1',
    question: 'Pernyataan berikut yang TIDAK SESUAI dengan isi wacana mengenai sampah plastik adalah ....',
    options: {
      A: 'Lautan terancam pemanasan dan peningkatan keasaman akibat pelepasan CO2 ke atmosfer.',
      B: 'Pada tahun 2050 sampah plastik di laut diprediksi bisa melampaui jumlah ikan jika tren dibiarkan.',
      C: 'Pertumbuhan ekonomi di negara berkembang berkontribusi terhadap naiknya konsumsi kemasan plastik.',
      D: 'Produsen plastik sama sekali tidak mempunyai kapasitas atau peran dalam pengelolaan sampah plastik.',
      E: 'Mengurangi kemasan plastik sekali pakai atau mendaur ulangnya adalah salah satu bentuk solusi nyata.',
    },
    correctAnswer: 'D',
    explanation: 'Paragraf keempat menegaskan bahwa produsen plastik juga dapat membantu dalam pengelolaan plastik, misalnya dengan memproduksi barang reusable atau plastik kompos. Maka opsi D salah/tidak sesuai teks.',
    category: 'Pemahaman Tekstual',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T09:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:00:00Z').toISOString(),
  },
  {
    id: 'soal-4',
    passageId: 'passage-2',
    question: 'Berdasarkan wacana kedua, kekhawatiran utama akibat ketergantungan berlebih terhadap kecerdasan buatan dalam pendidikan bahasa adalah ....',
    options: {
      A: 'meningkatnya biaya operasional perangkat lunak di sekolah',
      B: 'terkikisnya kemampuan bernalar analitis dan daya kritis siswa secara mandiri',
      C: 'lambatnya durasi pengetikan tugas bagi siswa sekolah menengah',
      D: 'hilangnya seluruh buku cetak dan perpustakaan fisik',
      E: 'penurunan drastis terhadap kecepatan koneksi jaringan internet sekolah',
    },
    correctAnswer: 'B',
    explanation: 'Paragraf kedua menyebutkan: "Ketergantungan berlebih terhadap sistem otomatis dikhawatirkan dapat mengikis kemampuan bernalar analitis secara mandiri."',
    category: 'Teknologi & Pendidikan',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-02-01T10:30:00Z').toISOString(),
    updatedAt: new Date('2026-02-01T10:30:00Z').toISOString(),
  },
  {
    id: 'soal-5',
    passageId: 'passage-2',
    question: 'Sikap ideal yang direkomendasikan teks kedua dalam menyikapi kehadiran AI di ranah pendidikan adalah ....',
    options: {
      A: 'melarang total setiap bentuk integrasi teknologi AI dalam penyusunan tugas',
      B: 'menyerahkan seluruh proses evaluasi dan penulisan karya tulis kepada mesin',
      C: 'membekali siswa dengan etika digital dan keterampilan kurasi informasi yang kritis',
      D: 'mengganti mata pelajaran Bahasa Indonesia dengan bahasa pemrograman komputer',
      E: 'menghindari rujukan ilmiah dan hanya mempercayai keluaran otomatis mesin cerdas',
    },
    correctAnswer: 'C',
    explanation: 'Paragraf ketiga menyimpulkan bahwa kurikulum dituntut tidak melarang penggunaan AI, melainkan membekali siswa dengan etika digital dan keterampilan kurasi informasi.',
    category: 'Teknologi & Pendidikan',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-02-01T10:45:00Z').toISOString(),
    updatedAt: new Date('2026-02-01T10:45:00Z').toISOString(),
  },
];
