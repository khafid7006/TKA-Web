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
  // SOAL 1 (PG - Pemahaman Tekstual)
  {
    id: 'soal-1',
    type: 'pg',
    metadata: {
      noSoal: 1,
      kompetensi: 'Pemahaman Tekstual',
      subKompetensi: 'Mengidentifikasi penggunaan kata serapan dari bahasa daerah/asing dalam berbagai bidang',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: 'Dalam upaya meningkatkan daya saing, banyak perusahaan rintisan (startup) di Indonesia mengikuti program inkubasi bisnis yang diselenggarakan oleh perguruan tinggi atau lembaga swasta. Program ini memberikan pendampingan intensif, mulai dari penyusunan model bisnis, pengembangan produk minimum yang layak (MVP), hingga pencarian investor awal. Tahap inkubasi ini sangat krusial karena menjadi fondasi agar ide bisnis yang masih mentah dapat berubah menjadi entitas yang berkelanjutan dan siap menghadapi pasar yang kompetitif. Tanpa pendampingan yang tepat, banyak startup gagal di tahun pertama operasionalnya.',
    question: 'Makna istilah inkubasi pada paragraf tersebut adalah ....',
    options: {
      A: 'proses penilaian akhir terhadap kelayakan sebuah produk di pasar',
      B: 'proses pembinaan dan pengembangan awal suatu ide atau usaha',
      C: 'kegiatan promosi secara masif untuk menarik minat konsumen',
      D: 'mekanisme penggabungan dua perusahaan menjadi satu entitas baru',
      E: 'strategi penurunan harga untuk memenangkan persaingan pasar',
    },
    correctAnswer: 'B',
    explanation: 'Kata inkubasi merupakan kata serapan dari bahasa Inggris incubation (berakar dari bahasa Latin incubare). Dalam konteks bisnis dan teknologi, istilah ini digunakan secara metaforis untuk merujuk pada proses pembinaan, pengeraman, atau pendampingan intensif pada tahap awal pengembangan suatu ide atau usaha agar dapat tumbuh, matang, dan siap beroperasi. Opsi A merujuk pada evaluasi akhir, opsi C pada pemasaran, opsi D pada merger, dan opsi E pada strategi harga, sehingga tidak tepat secara kontekstual.',
    category: 'Pemahaman Tekstual',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:00:00Z').toISOString(),
  },

  // SOAL 2 (PG - Pemahaman Tekstual)
  {
    id: 'soal-2',
    type: 'pg',
    metadata: {
      noSoal: 2,
      kompetensi: 'Pemahaman Tekstual',
      subKompetensi: 'Mengidentifikasi penggunaan kata serapan dari bahasa daerah/asing dalam berbagai bidang',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: 'Hutan mangrove di pesisir utara Jawa terus mengalami degradasi akibat alih fungsi lahan menjadi tambak udang dan pemukiman penduduk. Padahal, ekosistem mangrove memegang peranan vital sebagai pelindung alami dari abrasi laut dan tempat berkembang biak berbagai spesies ikan. Penurunan kualitas dan luas hutan ini secara langsung mengancam ketahanan pangan masyarakat pesisir serta meningkatkan kerentanan terhadap bencana banjir rob. Oleh karena itu, program rehabilitasi mangrove harus segera dipercepat dengan melibatkan partisipasi aktif masyarakat setempat dan penegakan hukum yang tegas.',
    question: 'Makna istilah degradasi pada paragraf tersebut adalah ....',
    options: {
      A: 'peningkatan kualitas lingkungan secara bertahap dan alami',
      B: 'proses pemulihan kondisi ekosistem yang telah rusak',
      C: 'penurunan kualitas atau kemerosotan suatu kondisi',
      D: 'pengalihan fungsi lahan untuk kepentingan ekonomi semata',
      E: 'penambahan luas area hutan secara spontan',
    },
    correctAnswer: 'C',
    explanation: 'Kata degradasi diserap dari bahasa Inggris degradation (berasal dari bahasa Latin degradatio). Dalam konteks lingkungan dan sains, istilah ini bermakna penurunan kualitas, kemerosotan, atau kerusakan suatu kondisi (dalam hal ini, kondisi hutan mangrove). Opsi B merujuk pada rehabilitasi (yang justru menjadi solusi di teks), sedangkan opsi D adalah penyebab degradasi, bukan makna dari istilah itu sendiri.',
    category: 'Pemahaman Tekstual',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T08:05:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:05:00Z').toISOString(),
  },

  // SOAL 3 (PG - Pemahaman Tekstual)
  {
    id: 'soal-3',
    type: 'pg',
    metadata: {
      noSoal: 3,
      kompetensi: 'Pemahaman Tekstual',
      subKompetensi: 'Mengidentifikasi penggunaan kata serapan dari bahasa daerah/asing dalam berbagai bidang',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: 'Perusahaan teknologi raksasa baru-baru ini mengumumkan akuisisi terhadap sebuah platform fintech lokal yang memiliki basis pengguna muda yang sangat besar. Langkah strategis ini diambil untuk memperluas ekosistem pembayaran digital dan mengintegrasikan layanan keuangan ke dalam aplikasi utama mereka. Dengan mengambil alih kepemilikan dan kontrol operasional atas platform tersebut, perusahaan induk berharap dapat mempercepat pertumbuhan pendapatan dan memperkuat posisinya di pasar keuangan digital Asia Tenggara tanpa harus membangun sistem dari nol.',
    question: 'Makna istilah akuisisi pada paragraf tersebut adalah ....',
    options: {
      A: 'proses likuidasi atau penutupan total sebuah perusahaan',
      B: 'kegiatan pinjaman modal lunak dari lembaga keuangan bank',
      C: 'proses pengambilalihan atau pembelian aset dan perusahaan',
      D: 'strategi pembagian keuntungan kepada para pemegang saham',
      E: 'mekanisme penggabungan dua perusahaan yang setara posisinya',
    },
    correctAnswer: 'C',
    explanation: 'Kata akuisisi diserap dari bahasa Inggris acquisition. Dalam bidang ekonomi dan bisnis, istilah ini secara spesifik berarti proses pengambilalihan, pembelian, atau penguasaan aset, saham, atau suatu perusahaan oleh pihak lain (perusahaan induk). Opsi E menggambarkan merger (penggabungan setara), sedangkan opsi A, B, dan D merujuk pada konsep keuangan yang sama sekali berbeda (likuidasi, kredit, dan dividen).',
    category: 'Pemahaman Tekstual',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T08:10:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:10:00Z').toISOString(),
  },

  // SOAL 4 (PG - Pemahaman Tekstual)
  {
    id: 'soal-4',
    type: 'pg',
    metadata: {
      noSoal: 4,
      kompetensi: 'Pemahaman Tekstual',
      subKompetensi: 'Mengidentifikasi latar, karakter, dan/atau fenomena berdasarkan kosakata yang digunakan dalam teks fiksi atau nonfiksi.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: 'Rara menata ulang tumpukan berkas di mejanya untuk kelima kalinya pagi itu. Matanya menyapu setiap helai kertas, memastikan tidak ada satu pun yang terlipat atau bernoda. Napasnya tertahan sejenak saat ia mendengar derap langkah kaki di lorong, lalu menghembuskan napas panjang ketika suara itu menjauh. Ia membetulkan letak vas bunga hingga hitungan milimeter, seolah ketidaksempurnaan sekecil apa pun akan meruntuhkan seluruh kredibilitasnya di hadapan klien nanti.',
    question: 'Penggunaan kosakata "menata ulang... kelima kalinya", "hingga hitungan milimeter", dan "meruntuhkan seluruh kredibilitas" dalam teks tersebut secara kuat mengindikasikan bahwa karakter Rara adalah sosok yang ....',
    options: {
      A: 'ceroboh namun cepat menyadari dan memperbaiki kesalahannya',
      B: 'perfeksionis yang diliputi kecemasan berlebihan akan kegagalan',
      C: 'ambisius dan tidak peduli pada penilaian atau pendapat orang lain',
      D: 'teliti dalam bekerja namun mudah marah jika konsentrasinya terganggu',
      E: 'santai dalam menghadapi tekanan namun tetap mengutamakan kerapian',
    },
    correctAnswer: 'B',
    explanation: 'Subkompetensi ini menuntut peserta mengaitkan diksi dengan karakter. Kata "kelima kalinya" dan "hingga hitungan milimeter" menunjukkan standar yang sangat tinggi dan berulang (perfeksionisme). Frasa "napasnya tertahan" dan "meruntuhkan seluruh kredibilitas" mengindikasikan adanya tekanan psikologis atau kecemasan (anxiety) yang mendasari tindakan tersebut, bukan sekadar ketelitian biasa. Opsi A bertolak belakang dengan teks. Opsi C salah karena Rara sangat peduli pada kredibilitas (penilaian orang). Opsi D salah karena tidak ada indikasi kemarahan. Opsi E bertentangan dengan kata "napas tertahan".',
    category: 'Pemahaman Tekstual',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T08:15:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:15:00Z').toISOString(),
  },

  // SOAL 5 (PG - Pemahaman Tekstual)
  {
    id: 'soal-5',
    type: 'pg',
    metadata: {
      noSoal: 5,
      kompetensi: 'Pemahaman Tekstual',
      subKompetensi: 'Mengidentifikasi latar, karakter, dan/atau fenomena berdasarkan kosakata yang digunakan dalam teks fiksi atau nonfiksi.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: 'Kabut tebal merayap di antara celah-celah rumah panggung yang kayunya telah dimakan rayap. Tidak ada suara mesin atau deru kendaraan, hanya desau angin yang membawa aroma tanah basah dan sisa kemenyan yang baru saja dibakar di persimpangan desa. Lampu minyak di beranda berkedip lemah, berjuang melawan kegelapan yang seolah menelan seluruh pemukiman. Sesekali, lolongan anjing dari kejauhan memecah keheningan, membuat bulu kuduk siapa pun yang mendengarnya ikut berdiri.',
    question: 'Pilihan kata sensorik seperti "kabut tebal merayap", "aroma tanah basah dan sisa kemenyan", serta "lampu minyak berkedip lemah" dalam paragraf tersebut berfungsi utama untuk membangun latar suasana yang ....',
    options: {
      A: 'modern dan futuristik dengan penataan lingkungan yang minimalis',
      B: 'ramai dan penuh dengan dinamika aktivitas perdagangan malam hari',
      C: 'tradisional, terisolasi, dan bernuansa mistis atau mencekam',
      D: 'ceria dan penuh dengan kehangatan interaksi keluarga besar',
      E: 'mewah dan terawat dengan fasilitas penerangan yang lengkap',
    },
    correctAnswer: 'C',
    explanation: 'Soal ini menguji kemampuan peserta mengidentifikasi latar suasana melalui kosakata sensorik (penglihatan, penciuman, pendengaran). Diksi "kayu dimakan rayap" dan "lampu minyak" menandakan latar tempat tradisional/tertinggal. "Aroma kemenyan" dan "lolongan anjing" yang "membuat bulu kuduk berdiri" adalah konvensi sastra yang kuat untuk membangun nuansa mistis, sepi, dan mencekam. Opsi A, B, D, dan E secara langsung bertentangan dengan bukti kosakata yang ada di dalam teks.',
    category: 'Pemahaman Tekstual',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T08:20:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:20:00Z').toISOString(),
  },

  // SOAL 6 (PG - Pemahaman Tekstual)
  {
    id: 'soal-6',
    type: 'pg',
    metadata: {
      noSoal: 6,
      kompetensi: 'Pemahaman Tekstual',
      subKompetensi: 'Mengidentifikasi latar, karakter, dan/atau fenomena berdasarkan kosakata yang digunakan dalam teks fiksi atau nonfiksi.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: 'Fenomena hustle culture atau budaya sibuk yang diagungkan di media sosial perlahan menunjukkan sisi gelapnya. Banyak pekerja muda yang melaporkan gejala kelelahan kronis, sulit tidur (insomnia), dan hilangnya minat pada hobi yang dulu mereka sukai. Istilah burnout kini sering muncul dalam diskusi kesehatan mental, menandakan bahwa produktivitas yang dipaksakan tanpa jeda istirahat yang memadai justru menggerogoti kesejahteraan psikologis individu dalam jangka panjang, alih-alih membawa kesuksesan yang dijanjikan.',
    question: 'Kosakata "kelelahan kronis", "hilangnya minat", "burnout", dan "menggerogoti kesejahteraan psikologis" dalam teks nonfiksi tersebut secara spesifik mengidentifikasi fenomena ....',
    options: {
      A: 'peningkatan motivasi kerja yang sehat akibat persaingan global yang ketat',
      B: 'dampak negatif dari tekanan produktivitas berlebihan terhadap kesehatan mental',
      C: 'tren gaya hidup sehat dan manajemen waktu yang diadopsi pekerja kantoran',
      D: 'keberhasilan individu dalam menyeimbangkan tuntutan pekerjaan dan hobi pribadi',
      E: 'peran positif platform media sosial dalam menyebarkan literasi kesehatan mental',
    },
    correctAnswer: 'B',
    explanation: 'Soal ini menguji kemampuan mengidentifikasi fenomena sosial berdasarkan istilah/kosakata spesifik. Kata-kata klinis dan negatif seperti "kelelahan kronis", "hilangnya minat" (gejala depresi/anhedonia), dan "burnout" secara langsung merujuk pada dampak merusak dari tekanan kerja. Frasa "menggerogoti kesejahteraan psikologis" adalah kunci yang menegaskan bahwa fenomena yang dibahas adalah dampak negatif terhadap kesehatan mental. Opsi A, C, dan D bertolak belakang dengan makna kosakata tersebut. Opsi E salah karena teks justru menyoroti media sosial sebagai sumber awal tekanan (hustle culture yang diagungkan), bukan sebagai penyebar literasi yang positif dalam konteks ini.',
    category: 'Pemahaman Tekstual',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T08:25:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:25:00Z').toISOString(),
  },

  // SOAL 7 (PG - Pemahaman Tekstual)
  {
    id: 'soal-7',
    type: 'pg',
    metadata: {
      noSoal: 7,
      kompetensi: 'Pemahaman Tekstual',
      subKompetensi: 'Menyusun kerangka atau bagan berdasarkan bagian-bagian penting dalam teks.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `Transisi menuju energi terbarukan menjadi agenda mendesak global untuk menekan laju perubahan iklim. Indonesia, dengan potensi matahari, angin, dan air yang melimpah, memiliki peluang besar untuk mengurangi ketergantungan pada bahan bakar fosil. Pembangkit listrik tenaga surya (PLTS), misalnya, menawarkan energi bersih yang tidak menghasilkan emisi karbon, sekaligus dapat diinstal secara modular di atap rumah maupun skala industri.
Namun, transisi ini tidak lepas dari tantangan signifikan. Biaya investasi awal untuk infrastruktur energi terbarukan masih tergolong tinggi dibandingkan pembangkit konvensional. Selain itu, keterbatasan teknologi penyimpanan energi (baterai) dan belum meratanya jaringan transmisi di daerah terpencil menjadi hambatan teknis yang harus diatasi.
Untuk menjembatani kesenjangan tersebut, diperlukan sinergi multipihak. Pemerintah perlu menyediakan insentif fiskal dan regulasi yang mendukung, sementara sektor swasta dapat berinovasi dalam teknologi penyimpanan energi. Di tingkat masyarakat, peningkatan literasi mengenai efisiensi energi juga menjadi kunci agar transisi ini berjalan berkelanjutan dan inklusif.`,
    question: 'Bagan yang tepat untuk menggambarkan bagian-bagian penting dalam teks tersebut adalah ….',
    options: {
      A: '[Tantangan Transisi Energi]\n   ├─ [Potensi Energi Terbarukan]\n   ├─ [Solusi: Sinergi Multipihak]\n   └─ [Dampak Perubahan Iklim]',
      B: '[Urgensi Transisi Energi Terbarukan]\n   ├─ [Peluang & Manfaat: Energi bersih, instalasi modular]\n   ├─ [Tantangan: Biaya tinggi, teknologi penyimpanan, jaringan transmisi]\n   └─ [Solusi: Insentif pemerintah, inovasi swasta, literasi masyarakat]',
      C: '[Potensi Energi Surya di Indonesia]\n   ├─ [Penyebab: Perubahan iklim global]\n   ├─ [Akibat: Biaya investasi meningkat]\n   └─ [Solusi: Pemasangan panel surya di atap rumah]',
      D: '[Transisi Energi] → [Biaya Investasi Tinggi] → [Pemerintah Memberi Insentif] → [Masyarakat Hemat Energi]',
      E: '[Kegagalan Energi Fosil]\n   ├─ [Dampak: Emisi karbon tinggi]\n   ├─ [Solusi: Beralih ke PLTS]\n   └─ [Hambatan: Kurangnya minat masyarakat]',
    },
    correctAnswer: 'B',
    explanation: 'Teks tersebut memiliki struktur yang jelas: Paragraf 1 membahas urgensi dan peluang/manfaat energi terbarukan. Paragraf 2 membahas tantangan/hambatan (biaya, teknologi, jaringan). Paragraf 3 menawarkan solusi yang melibatkan tiga aktor (pemerintah, swasta, masyarakat). Opsi B secara akurat merefleksikan hierarki dan urutan logis dari ide pokok dan ide penjelas tersebut. Opsi A mengacak hierarki (menjadikan tantangan sebagai topik utama). Opsi C terlalu spesifik hanya pada energi surya. Opsi D adalah alur linear yang menghilangkan kompleksitas teks. Opsi E menambahkan informasi "kegagalan" dan "kurangnya minat" yang tidak dominan dalam teks.',
    category: 'Pemahaman Tekstual',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T08:30:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:30:00Z').toISOString(),
  },

  // SOAL 8 (PG - Pemahaman Tekstual)
  {
    id: 'soal-8',
    type: 'pg',
    metadata: {
      noSoal: 8,
      kompetensi: 'Pemahaman Tekstual',
      subKompetensi: 'Menyusun kerangka atau bagan berdasarkan bagian-bagian penting dalam teks.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `Gaya hidup sedenter atau kurang gerak telah menjadi epidemi tersembunyi di kalangan remaja dan pekerja kantoran. Aktivitas yang didominasi oleh duduk berjam-jam di depan layar, baik untuk bekerja maupun hiburan, memicu berbagai masalah kesehatan serius. Secara fisik, kebiasaan ini meningkatkan risiko obesitas, penyakit kardiovaskular, dan gangguan muskuloskeletal seperti nyeri punggung kronis.
Dampak negatifnya tidak hanya berhenti pada aspek fisik. Studi terbaru menunjukkan korelasi kuat antara gaya hidup sedenter dengan penurunan kesehatan mental, termasuk peningkatan tingkat kecemasan, stres, dan gangguan tidur akibat paparan cahaya biru yang berlebihan serta kurangnya aktivitas fisik yang melepaskan endorfin.
Mengatasi masalah ini memerlukan pendekatan holistik. Penerapan aturan ergonomi di tempat kerja, seperti penggunaan meja berdiri (standing desk), adalah langkah awal yang baik. Selain itu, membiasakan "digital detox" dan mengalokasikan waktu minimal 30 menit per hari untuk aktivitas fisik moderat, seperti berjalan kaki atau peregangan, dapat secara signifikan membalikkan efek negatif dari gaya hidup minim gerak ini.`,
    question: 'Kerangka teks yang paling tepat untuk menggambarkan struktur informasi dalam bacaan di atas adalah ….',
    options: {
      A: '1. Definisi gaya hidup sedenter\n2. Dampak fisik (obesitas, nyeri punggung)\n3. Dampak mental (cemas, stres)\n4. Solusi holistik (ergonomi, digital detox, aktivitas fisik)',
      B: '1. Penyebab gaya hidup sedenter (layar, pekerjaan)\n2. Solusi fisik (obat-obatan, operasi)\n3. Solusi mental (terapi, konseling)\n4. Kesimpulan tentang pentingnya kesehatan',
      C: '[Gaya Hidup Sedenter]\n   ├─ [Penyebab: Paparan cahaya biru]\n   ├─ [Dampak: Gangguan tidur]\n   └─ [Solusi: Menggunakan meja berdiri]',
      D: '[Kesehatan Remaja] → [Risiko Obesitas] → [Penerapan Ergonomi] → [Digital Detox]',
      E: '1. Fenomena epidemi tersembunyi\n2. Keuntungan bekerja di depan layar\n3. Kerugian kurang endorfin\n4. Anjuran berjalan kaki 30 menit',
    },
    correctAnswer: 'A',
    explanation: 'Opsi A menyajikan kerangka yang lengkap dan sistematis sesuai urutan paragraf: (1) Pengenalan fenomena, (2) Dampak fisik (Paragraf 1), (3) Dampak mental (Paragraf 2), dan (4) Solusi holistik (Paragraf 3). Opsi B salah karena menyebutkan solusi medis (obat/operasi) yang tidak ada di teks. Opsi C terlalu sempit, hanya mengambil sebagian kecil detail. Opsi D mengubah struktur deskriptif-analitis menjadi alur sebab-akibat linear yang tidak akurat. Opsi E memasukkan "keuntungan bekerja di depan layar" yang bertentangan dengan isi teks.',
    category: 'Pemahaman Tekstual',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T08:35:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:35:00Z').toISOString(),
  },

  // SOAL 9 (PG - Pemahaman Tekstual)
  {
    id: 'soal-9',
    type: 'pg',
    metadata: {
      noSoal: 9,
      kompetensi: 'Pemahaman Tekstual',
      subKompetensi: 'Menyusun kerangka atau bagan berdasarkan bagian-bagian penting dalam teks.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `Pascapandemi, model pembelajaran hibrida (hybrid learning) tetap dipertahankan sebagai salah satu alternatif strategis dalam sistem pendidikan. Model ini menggabungkan dua moda pembelajaran untuk memaksimalkan hasil belajar siswa. Pertama, pembelajaran sinkronus (tatap muka) yang difokuskan pada diskusi interaktif, praktikum, dan pembangunan karakter sosial siswa. Interaksi langsung ini sulit digantikan sepenuhnya oleh teknologi.
Kedua, pembelajaran asinkronus (daring) yang memberikan fleksibilitas waktu dan tempat. Melalui platform digital, siswa dapat mengakses materi rekaman, mengerjakan kuis mandiri, dan berdiskusi melalui forum pada waktu yang mereka anggap paling produktif. Hal ini melatih kemandirian dan manajemen waktu siswa.
Keberhasilan implementasi pembelajaran hibrida sangat bergantung pada integrasi yang mulus antara kedua moda tersebut. Guru tidak hanya dituntut menguasai teknologi, tetapi juga mampu mendesain kurikulum yang memadukan keunggulan tatap muka dan daring secara proporsional, didukung oleh infrastruktur sekolah yang memadai.`,
    question: 'Bagan yang paling tepat untuk menggambarkan bagian-bagian penting dalam teks tersebut adalah ….',
    options: {
      A: '[Pembelajaran Hibrida]\n   ├─ [Pembelajaran Sinkronus: Fleksibilitas waktu, kuis mandiri]\n   ├─ [Pembelajaran Asinkronus: Diskusi interaktif, praktikum]\n   └─ [Kunci Sukses: Penguasaan teknologi guru]',
      B: '[Pascapandemi] → [Pembelajaran Daring Penuh] → [Pembelajaran Tatap Muka Penuh] → [Integrasi Kurikulum]',
      C: '[Model Pembelajaran Hibrida]\n   ├─ [Komponen 1: Sinkronus (Tatap Muka) → Interaksi, praktikum, karakter]\n   ├─ [Komponen 2: Asinkronus (Daring) → Fleksibilitas, kemandirian, akses materi]\n   └─ [Faktor Keberhasilan: Integrasi mulus, kompetensi guru, infrastruktur]',
      D: '[Kurikulum Sekolah]\n   ├─ [Masalah: Pandemi]\n   ├─ [Solusi: Pembelajaran Daring]\n   └─ [Hasil: Siswa lebih mandiri]',
      E: '[Pembelajaran Hibrida]\n   ├─ [Keunggulan: Menggabungkan dua moda]\n   ├─ [Kelemahan: Membutuhkan infrastruktur mahal]\n   └─ [Solusi: Pemerintah menyediakan dana]',
    },
    correctAnswer: 'C',
    explanation: 'Teks tersebut secara eksplisit membagi pembelajaran hibrida menjadi dua komponen utama (sinkronus dan asinkronus) beserta karakteristik masing-masing, diakhiri dengan faktor penentu keberhasilannya. Opsi C memetakan struktur ini dengan sangat akurat dan tidak tertukar. Opsi A adalah distraktor yang sangat baik karena menukar definisi/contoh antara sinkronus dan asinkronus (kesalahan atribusi). Opsi B mengabaikan konsep "hibrida" (gabungan) dan menjadikannya urutan waktu. Opsi D terlalu umum dan menghilangkan inti pembahasan tentang dua moda pembelajaran. Opsi E memasukkan "kelemahan" dan "solusi dana" yang tidak menjadi fokus utama paragraf dalam teks.',
    category: 'Pemahaman Tekstual',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T08:40:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:40:00Z').toISOString(),
  },

  // SOAL 10 (PG - Pemahaman Inferensial)
  {
    id: 'soal-10',
    type: 'pg',
    metadata: {
      noSoal: 10,
      kompetensi: 'Pemahaman Inferensial',
      subKompetensi: 'Menyimpulkan ide pokok, gagasan pendukung, tokoh, peristiwa, latar, konflik, atau nilai-nilai dalam teks.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `Mikroplastik, partikel plastik berukuran kurang dari 5 milimeter, kini telah menyusup ke dalam rantai makanan manusia, mulai dari air minum dalam kemasan hingga seafood. Studi terbaru menunjukkan bahwa rata-rata manusia menelan sekitar satu kartu kredit beratnya dalam bentuk mikroplastik setiap minggu. Bahaya utamanya tidak hanya terletak pada fisik partikelnya, tetapi pada zat aditif kimia yang dibawanya, seperti ftalat dan bisphenol-A (BPA), yang dikenal sebagai pengganggu endokrin.
Banyak kampanye lingkungan yang berfokus pada ajakan mendaur ulang sampah plastik di tingkat konsumen. Namun, pendekatan ini dinilai tidak lagi memadai. Selama industri terus memproduksi plastik sekali pakai dengan volume masif dan murah, siklus pencemaran ini tidak akan pernah terputus. Solusi yang bersifat tambal sulam di tingkat hilir (konsumen) tidak akan pernah bisa mengimbangi kerusakan yang diciptakan di tingkat hulu (produksi).`,
    question: 'Berdasarkan teks tersebut, simpulan yang paling tepat mengenai pandangan penulis terhadap solusi masalah mikroplastik adalah ....',
    options: {
      A: 'Konsumen harus berhenti total mengonsumsi air minum dalam kemasan dan seafood untuk menghindari mikroplastik.',
      B: 'Kampanye daur ulang di tingkat masyarakat sudah sangat efektif dan perlu terus digalakkan sebagai solusi utama.',
      C: 'Masalah mikroplastik hanya dapat diselesaikan jika industri mengubah model produksi dan mengurangi plastik sekali pakai secara sistemik.',
      D: 'Zat aditif kimia dalam plastik sebenarnya aman asalkan tidak dikonsumsi dalam jumlah yang melebihi batas normal setiap harinya.',
      E: 'Pemerintah perlu melarang seluruh penggunaan plastik di semua sektor industri tanpa terkecuali dalam waktu dekat.',
    },
    correctAnswer: 'C',
    explanation: 'Penulis secara eksplisit menyatakan bahwa pendekatan daur ulang di tingkat konsumen "tidak lagi memadai" dan solusi di tingkat hilir "tidak akan pernah bisa mengimbangi kerusakan yang diciptakan di tingkat hulu (produksi)". Dari sini, dapat disimpulkan (diinferensikan) bahwa penulis memandang solusi sistemik dari sisi produksi industri sebagai kunci utama. Opsi A terlalu ekstrem, B bertentangan, D tidak sesuai dengan istilah pengganggu endokrin, dan E adalah generalisasi berlebihan.',
    category: 'Pemahaman Inferensial',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T08:45:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:45:00Z').toISOString(),
  },

  // SOAL 11 (PG - Pemahaman Inferensial)
  {
    id: 'soal-11',
    type: 'pg',
    metadata: {
      noSoal: 11,
      kompetensi: 'Pemahaman Inferensial',
      subKompetensi: 'Menyimpulkan ide pokok, gagasan pendukung, tokoh, peristiwa, latar, konflik, atau nilai-nilai dalam teks.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `"Mas, pesanan dari butik di Jakarta itu butuh lima puluh lembar minggu depan. Kalau pakai pewarna sintetis, kita bisa selesai dalam tiga hari. Harganya juga bisa kita tekan," ujar Raka, sambil menunjuk tumpukan kain mori yang belum diwarnai. Pak Harjo tidak langsung menjawab. Tangannya yang kasar terus mengaduk adonan pewarna alami dari kulit soga dan daun indigo yang telah ia fermentasi selama berminggu-minggu. Aroma tanah dan dedaunan basah menguar di udara, aroma yang telah menjadi napas hidupnya selama empat puluh tahun. "Kalau kita pakai sintetis, warnanya memang akan seragam dan cepat kering, Ka. Tapi jiwanya hilang," gumam Pak Harjo pelan, matanya menatap cairan cokelat kemerahan itu. "Batik ini bukan sekadar kain dagangan. Ini warisan leluhur yang menghormati alam. Kita mungkin akan kehilangan pesanan itu, tapi kita tidak kehilangan harga diri kita sebagai pengrajin." Raka menghela napas, menyadari bahwa berdebat dengan ayahnya sama sia-sianya dengan menentang arus sungai Code. Ia akhirnya mengangguk pelan, lalu ikut mengambil canting.`,
    question: 'Berdasarkan kutipan cerpen tersebut, simpulan yang paling tepat mengenai konflik dan nilai yang terkandung adalah ....',
    options: {
      A: 'Konflik antargenerasi tentang teknologi, di mana Pak Harjo mewakili nilai ketertinggalan zaman dan Raka mewakili nilai kemajuan.',
      B: 'Konflik ekonomi versus integritas seni, di mana Pak Harjo menjunjung tinggi nilai keaslian, keberlanjutan alam, dan harga diri pengrajin.',
      C: 'Konflik dengan pihak butik yang menuntut kualitas rendah, sehingga Pak Harjo memilih untuk membatalkan pesanan tersebut secara sepihak.',
      D: 'Konflik batin Raka yang merasa terpaksa mengikuti kemauan ayahnya karena tidak memiliki keterampilan membatik yang memadai.',
      E: 'Konflik lingkungan akibat pencemaran limbah sintetis, yang menjadikan Raka sebagai tokoh yang tidak peduli terhadap ekosistem sungai.',
    },
    correctAnswer: 'B',
    explanation: 'Teks menunjukkan ketegangan antara tuntutan pasar/ekonomi (pesanan cepat, harga tekan, pewarna sintetis) yang dibawa Raka, dengan prinsip Pak Harjo yang mempertahankan pewarna alami demi "jiwa", "menghormati alam", dan "harga diri". Ini adalah inti dari konflik ekonomi vs. integritas seni/nilai. Opsi A salah karena Pak Harjo menjunjung kesadaran ekologis dan filosofis, bukan ketertinggalan.',
    category: 'Pemahaman Inferensial',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T08:50:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:50:00Z').toISOString(),
  },

  // SOAL 12 (PG - Pemahaman Inferensial)
  {
    id: 'soal-12',
    type: 'pg',
    metadata: {
      noSoal: 12,
      kompetensi: 'Pemahaman Inferensial',
      subKompetensi: 'Menyimpulkan ide pokok, gagasan pendukung, tokoh, peristiwa, latar, konflik, atau nilai-nilai dalam teks.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `Teks 1
Kecerdasan Buatan (AI) telah mendemokratisasi proses kreatif. Alat bantu berbasis AI memungkinkan penulis, desainer, dan musisi untuk melampaui hambatan teknis. Seorang penulis dapat menggunakan AI untuk mengatasi writer’s block atau menyusun kerangka dasar, sehingga ia dapat fokus pada pengembangan konsep tingkat tinggi dan penyuntingan nuansa emosional. Dalam pandangan ini, AI berfungsi sebagai mitra kolaboratif yang meningkatkan produktivitas tanpa menghilangkan sentuhan manusia sebagai pengambil keputusan akhir.

Teks 2
Euforia terhadap AI dalam industri kreatif patut diwaspadai. Model bahasa besar yang menjadi dasar AI dilatih menggunakan miliaran karya seni dan tulisan yang diambil dari internet tanpa izin atau kompensasi kepada pencipta aslinya. Hal ini bukan kolaborasi, melainkan eksploitasi data. Lebih jauh, ketergantungan pada AI berisiko menciptakan homogenisasi budaya, di mana output yang dihasilkan terasa datar, algoritmik, dan kehilangan keunikan serta kedalaman pengalaman manusiawi yang menjadi esensi sejati dari sebuah karya seni.`,
    question: 'Simpulan yang paling tepat mengenai hubungan gagasan antara Teks 1 dan Teks 2 adalah ....',
    options: {
      A: 'Kedua teks sepakat bahwa AI pada akhirnya akan menggantikan peran manusia sepenuhnya dalam semua bidang industri kreatif.',
      B: 'Teks 1 berfokus pada aspek teknis pengoperasian AI, sedangkan Teks 2 berfokus pada aspek hukum hak cipta di pengadilan.',
      C: 'Teks 1 memandang AI sebagai alat bantu yang memberdayakan kreativitas manusia, sementara Teks 2 memandang AI sebagai ancaman terhadap orisinalitas dan etika penciptaan karya.',
      D: 'Teks 2 memberikan solusi praktis untuk memperbaiki kelemahan sistem AI yang telah diidentifikasi oleh Teks 1.',
      E: 'Kedua teks menyimpulkan bahwa penggunaan AI dalam seni harus dilarang total demi menjaga kemurnian budaya manusia.',
    },
    correctAnswer: 'C',
    explanation: 'Soal ini menguji kemampuan sintesis inferensial. Teks 1 menggunakan frasa positif seperti "mendemokratisasi", "mitra kolaboratif", dan "meningkatkan produktivitas". Sebaliknya, Teks 2 menggunakan frasa kritis seperti "patut diwaspadai", "eksploitasi data", dan "homogenisasi budaya". Opsi C secara akurat merangkum perbedaan perspektif mendasar ini (pemberdayaan vs. ancaman etika/orisinalitas).',
    category: 'Pemahaman Inferensial',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T08:55:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T08:55:00Z').toISOString(),
  },

  // SOAL 13 (PG - Pemahaman Inferensial)
  {
    id: 'soal-13',
    type: 'pg',
    metadata: {
      noSoal: 13,
      kompetensi: 'Pemahaman Inferensial',
      subKompetensi: 'Menjelaskan hubungan makna antarkalimat dan/atau antar paragraf dalam teks.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: '(1) Limbah elektronik atau e-waste menjadi masalah global yang kian mengkhawatirkan seiring pesatnya perkembangan teknologi. (2) Banyak perangkat elektronik bekas, seperti ponsel dan laptop, dibuang begitu saja tanpa melalui proses daur ulang yang benar. (3) Komponen di dalamnya, seperti baterai dan papan sirkuit, mengandung logam berat berbahaya seperti timbal dan merkuri. (4) Ketika perangkat ini tertimbun di tempat pembuangan akhir, logam berat tersebut akan meresap dan mencemari tanah di sekitarnya. (5) Akibatnya, sumber air tanah di wilayah tersebut terkontaminasi dan berpotensi membahayakan kesehatan masyarakat yang mengonsumsinya.',
    question: 'Hubungan makna antarkalimat (4) dan (5) pada paragraf tersebut adalah ....',
    options: {
      A: 'Kalimat (4) menyatakan kondisi yang diharapkan, sedangkan kalimat (5) menyatakan tujuan dari kondisi tersebut.',
      B: 'Kalimat (4) menyatakan sebab atau pemicu, sedangkan kalimat (5) menyatakan akibat logis yang ditimbulkannya.',
      C: 'Kalimat (4) menyatakan gagasan utama, sedangkan kalimat (5) menyatakan contoh konkret untuk memperjelas gagasan.',
      D: 'Kalimat (4) menyatakan pertentangan terhadap fakta di kalimat (3), sedangkan kalimat (5) menyatakan kesimpulan.',
      E: 'Kalimat (4) menyatakan definisi suatu istilah, sedangkan kalimat (5) menyatakan proses terjadinya istilah tersebut.',
    },
    correctAnswer: 'B',
    explanation: 'Kalimat (4) menjelaskan suatu peristiwa atau kondisi ("logam berat tersebut akan meresap dan mencemari tanah"). Kalimat (5) diawali dengan kata penanda hubungan akibat ("Akibatnya") dan menjelaskan dampak langsung dari peristiwa di kalimat (4) ("sumber air tanah... terkontaminasi"). Oleh karena itu, hubungan maknanya adalah sebab-akibat.',
    category: 'Pemahaman Inferensial',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T09:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:00:00Z').toISOString(),
  },

  // SOAL 14 (PG - Pemahaman Inferensial)
  {
    id: 'soal-14',
    type: 'pg',
    metadata: {
      noSoal: 14,
      kompetensi: 'Pemahaman Inferensial',
      subKompetensi: 'Menjelaskan hubungan makna antarkalimat dan/atau antar paragraf dalam teks.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `Paragraf 1
Pekerjaan jarak jauh (remote work) telah mengubah lanskap ketenagakerjaan modern secara signifikan. Bagi banyak karyawan, sistem ini menawarkan fleksibilitas waktu yang luar biasa, menghilangkan waktu dan biaya perjalanan (commuting), serta memungkinkan keseimbangan kehidupan kerja yang lebih baik. Perusahaan juga diuntungkan dengan pengurangan biaya operasional kantor dan akses ke talenta global tanpa batas geografis.

Paragraf 2
Namun, di balik kemudahan tersebut, terdapat tantangan psikologis yang tidak bisa diabaikan. Isolasi sosial menjadi keluhan utama, di mana karyawan merasa terputus dari interaksi informal dengan rekan kerja. Selain itu, batas antara waktu kerja dan waktu pribadi menjadi kabur, yang justru dapat memicu kelelahan mental (burnout) dan penurunan produktivitas jangka panjang jika tidak dikelola dengan disiplin yang ketat.`,
    question: 'Hubungan makna antara paragraf pertama dan paragraf kedua dalam teks tersebut adalah ....',
    options: {
      A: 'Paragraf kedua memperkuat dan mengulangi argumen positif yang telah disampaikan pada paragraf pertama.',
      B: 'Paragraf kedua memberikan contoh konkret dan data statistik dari fenomena yang dijelaskan di paragraf pertama.',
      C: 'Paragraf kedua menyajikan sisi bertentangan atau kelemahan dari hal yang diuntungkan pada paragraf pertama.',
      D: 'Paragraf kedua merupakan simpulan umum yang merangkum seluruh uraian fakta di paragraf pertama.',
      E: 'Paragraf kedua menjelaskan kronologi peristiwa yang terjadi setelah kebijakan di paragraf pertama diterapkan.',
    },
    correctAnswer: 'C',
    explanation: 'Paragraf pertama berfokus pada keuntungan dan sisi positif dari remote work (fleksibilitas, efisiensi biaya). Paragraf kedua diawali dengan kata transisi pertentangan "Namun, di balik kemudahan tersebut..." dan membahas tantangan atau sisi negatif (isolasi sosial, burnout). Ini menunjukkan hubungan makna pertentangan (kontras) antara kedua paragraf.',
    category: 'Pemahaman Inferensial',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T09:05:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:05:00Z').toISOString(),
  },

  // SOAL 15 (PG - Pemahaman Inferensial)
  {
    id: 'soal-15',
    type: 'pg',
    metadata: {
      noSoal: 15,
      kompetensi: 'Pemahaman Inferensial',
      subKompetensi: 'Menjelaskan hubungan makna antarkalimat dan/atau antar paragraf dalam teks.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: '(1) Fenomena "gurun pangan" (food desert) mulai muncul dan menjadi perhatian di beberapa wilayah perkotaan padat penduduk. (2) Istilah ini merujuk pada area di mana masyarakat memiliki akses yang sangat terbatas terhadap makanan segar dan bergizi dengan harga terjangkau. (3) Sebagai gantinya, wilayah ini justru dipenuhi oleh minimarket atau warung yang hanya menjual makanan olahan tinggi garam, gula, dan lemak. (4) Misalnya, di suatu kelurahan, penduduk harus menempuh jarak lebih dari dua kilometer hanya untuk menemukan pasar tradisional yang menjual sayur dan buah segar.',
    question: 'Hubungan makna antarkalimat (2), (3), dan (4) dalam paragraf tersebut adalah ....',
    options: {
      A: 'Kalimat (2) menyatakan definisi, kalimat (3) menyatakan solusi, dan kalimat (4) menyatakan hasil dari solusi tersebut.',
      B: 'Kalimat (2) menyatakan sebab, kalimat (3) menyatakan akibat, dan kalimat (4) menyatakan kesimpulan umum.',
      C: 'Kalimat (2) menyatakan definisi, kalimat (3) menyatakan penjelasan kondisi yang terjadi, dan kalimat (4) menyatakan contoh konkret untuk memperjelas.',
      D: 'Kalimat (2) menyatakan pertentangan terhadap kalimat (1), kalimat (3) menyatakan alasan, dan kalimat (4) menyatakan tujuan.',
      E: 'Kalimat (2) menyatakan proses terjadinya fenomena, kalimat (3) menyatakan dampak jangka panjang, dan kalimat (4) menyatakan prediksi masa depan.',
    },
    correctAnswer: 'C',
    explanation: 'Kalimat (2) berfungsi menjelaskan arti atau definisi dari istilah "gurun pangan" yang disebut di kalimat (1). Kalimat (3) berfungsi sebagai elaborasi atau penjelasan kondisi nyata yang terjadi di area tersebut (hanya ada makanan olahan). Kalimat (4) diawali dengan kata "Misalnya", yang secara eksplisit berfungsi memberikan contoh konkret untuk memperjelas kondisi yang dijelaskan pada kalimat (2) dan (3). Oleh karena itu, urutan hubungan maknanya adalah Definisi → Penjelasan Kondisi → Contoh Konkret.',
    category: 'Pemahaman Inferensial',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T09:10:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:10:00Z').toISOString(),
  },

  // SOAL 16 (PGK Kategori - Tepat / Tidak Tepat)
  {
    id: 'soal-16',
    type: 'pgk_kategori',
    metadata: {
      noSoal: 16,
      kompetensi: 'Pemahaman Inferensial',
      subKompetensi: 'Memprediksi lanjutan atau akhir uraian/cerita berdasarkan bagian tertentu dalam teks.',
      bentukSoal: 'PGK Kategori',
    },
    stimulusText: `Hujan deras mengguyur kota sejak sore. Di halte bus yang sepi, Ardi duduk memeluk tas ranselnya yang basah. Ia menatap jam tangannya yang sudah menunjukkan pukul tujuh malam. Bus terakhir menuju kampung halamannya baru saja berangkat lima menit lalu. Ardi menghela napas panjang, menyadari bahwa ia harus menginap di kota ini semalam.
Ia merogoh saku celananya. Dompetnya nyaris kosong—hanya tersisa dua lembar uang dua puluh ribuan. Cukup untuk membeli sebungkus nasi dan minum, tapi tidak cukup untuk membayar penginapan. Ardi teringat pesan ibunya pagi tadi sebelum ia berangkat: "Nak, jagalah uangmu baik-baik. Ayah masih menunggu di rumah dengan obat-obatannya."
Tiba-tiba, ponselnya bergetar. Sebuah pesan masuk dari Rina, teman sekelasnya yang tinggal tidak jauh dari halte itu. "Di, aku lihat kamu di halte dari jendela kamarku. Hujan belum reda. Masuk dulu ke rumahku, makan malam sama keluargaku. Nanti bisa tidur di kamar adikku."
Ardi menatap layar ponselnya lama. Ia tahu keluarga Rina juga sedang berhemat karena ayahnya baru saja kehilangan pekerjaan. Namun, perutnya sudah berbunyi dan tubuhnya mulai menggigil kedinginan.`,
    question: 'Berdasarkan bagian akhir teks tersebut, prediksi manakah yang paling mungkin terjadi selanjutnya? Tentukan Tepat atau Tidak Tepat untuk setiap pernyataan berikut!',
    categoryColumns: ['Tepat', 'Tidak Tepat'],
    categoryStatements: [
      {
        id: 'A',
        statement: 'Ardi akan menolak tawaran Rina karena tidak ingin merepotkan keluarga yang juga sedang kesulitan ekonomi.',
        correctValue: 'Tidak Tepat',
      },
      {
        id: 'B',
        statement: 'Ardi akan menerima tawaran Rina karena kondisi fisik dan keuangannya mendesak, meskipun ia merasa tidak enak hati.',
        correctValue: 'Tepat',
      },
      {
        id: 'C',
        statement: 'Ardi akan menggunakan uang terakhirnya untuk membeli tiket bus malam menuju kampung halamannya.',
        correctValue: 'Tidak Tepat',
      },
    ],
    explanation: `• Pernyataan A (Tidak Tepat): Meskipun Ardi peduli pada kondisi keluarga Rina, teks menunjukkan bahwa ia berada dalam kondisi fisik yang mendesak (menggigil kedinginan, perut lapar). Dalam situasi seperti ini, naluri bertahan hidup biasanya mengalahkan rasa tidak enak hati. Selain itu, Rina sudah menawarkan dengan tulus, sehingga penolakan di kondisi seperti ini tidak logis secara naratif.
• Pernyataan B (Tepat): Ini adalah prediksi paling logis. Teks secara eksplisit menyebutkan perut Ardi sudah berbunyi dan tubuhnya menggigil—dua kondisi fisik yang memaksanya untuk mencari kehangatan dan makanan. Meskipun ia mempertimbangkan kondisi keluarga Rina, tawaran yang datang di saat kritis seperti ini hampir pasti akan diterima, terutama karena Rina adalah teman sekelas yang sudah menawarkan dengan sukarela.
• Pernyataan C (Tidak Tepat): Uang Ardi hanya cukup untuk makan dan minum, bukan untuk tiket bus. Selain itu, bus terakhir sudah berangkat, sehingga tidak ada bus malam yang bisa ia naiki. Prediksi ini bertentangan dengan fakta yang sudah disebutkan dalam teks.`,
    category: 'Pemahaman Inferensial',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T09:15:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:15:00Z').toISOString(),
  },

  // SOAL 17 (PGK Kategori - Tepat / Tidak Tepat)
  {
    id: 'soal-17',
    type: 'pgk_kategori',
    metadata: {
      noSoal: 17,
      kompetensi: 'Pemahaman Inferensial',
      subKompetensi: 'Memprediksi lanjutan atau akhir uraian/cerita berdasarkan bagian tertentu dalam teks.',
      bentukSoal: 'PGK Kategori',
    },
    stimulusText: `Terumbu karang di perairan Raja Ampat menghadapi ancaman serius akibat fenomena pemutihan karang (coral bleaching) yang semakin sering terjadi. Kenaikan suhu air laut akibat perubahan iklim menyebabkan karang mengusir alga simbiotik (zooxanthellae) yang hidup di dalam jaringannya. Alga ini berfungsi memberikan warna dan nutrisi bagi karang melalui proses fotosintesis. Tanpa alga, karang akan memutih dan kelaparan.
Para peneliti dari Lembaga Oseanografi telah memasang alat pemantau suhu air di lima titik kritis. Data yang dikumpulkan menunjukkan bahwa suhu air di wilayah tersebut telah meningkat rata-rata 1,5°C dalam lima tahun terakhir. Jika tren ini terus berlanjut tanpa intervensi, para ilmuwan memprediksi bahwa 60% terumbu karang di wilayah tersebut akan mati permanen dalam dekade berikutnya.
Namun, tim peneliti tidak tinggal diam. Mereka sedang menguji coba teknik coral gardening—metode transplantasi karang yang telah dikembangkan di laboratorium untuk menghasilkan karang yang lebih tahan terhadap suhu tinggi. Ribuan fragmen karang telah ditanam di dasar laut, dan dalam enam bulan terakhir, tingkat kelangsungan hidup karang hasil transplantasi mencapai 85%.`,
    question: 'Berdasarkan bagian akhir teks tersebut, prediksi apa yang paling mungkin terjadi terkait upaya penyelamatan terumbu karang? Tentukan Tepat atau Tidak Tepat untuk setiap pernyataan berikut!',
    categoryColumns: ['Tepat', 'Tidak Tepat'],
    categoryStatements: [
      {
        id: 'A',
        statement: 'Teknik coral gardening akan menjadi solusi tunggal yang mampu menghentikan seluruh penyebab pemutihan karang tanpa perlu upaya lain.',
        correctValue: 'Tidak Tepat',
      },
      {
        id: 'B',
        statement: 'Jika teknik coral gardening terus dikembangkan dan diperluas, sebagian ekosistem terumbu karang di Raja Ampat masih memiliki peluang untuk pulih.',
        correctValue: 'Tepat',
      },
      {
        id: 'C',
        statement: 'Para peneliti akan menghentikan program transplantasi karena tingkat kelangsungan hidup karang yang rendah.',
        correctValue: 'Tidak Tepat',
      },
    ],
    explanation: `• Pernyataan A (Tidak Tepat): Teknik coral gardening hanya mengatasi gejala (karang yang sudah rusak), bukan penyebab utama (kenaikan suhu air laut akibat perubahan iklim). Teks tidak menyebutkan bahwa teknik ini adalah solusi tunggal. Prediksi ini merupakan overgeneralization yang tidak didukung oleh informasi dalam teks.
• Pernyataan B (Tepat): Teks menyebutkan bahwa tingkat kelangsungan hidup karang hasil transplantasi mencapai 85%—angka yang sangat tinggi. Ini menunjukkan bahwa teknik tersebut efektif. Jika terus dikembangkan dan diperluas, logis untuk memprediksi bahwa sebagian ekosistem masih memiliki peluang pulih. Ini adalah prediksi yang sejalan dengan data yang disajikan.
• Pernyataan C (Tidak Tepat): Tingkat kelangsungan hidup 85% adalah angka yang sangat baik, bukan rendah. Tidak ada indikasi dalam teks bahwa peneliti akan menghentikan program. Justru, angka ini menjadi dasar optimisme untuk melanjutkan dan memperluas program.`,
    category: 'Pemahaman Inferensial',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T09:20:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:20:00Z').toISOString(),
  },

  // SOAL 18 (PGK Kategori - Tepat / Tidak Tepat)
  {
    id: 'soal-18',
    type: 'pgk_kategori',
    metadata: {
      noSoal: 18,
      kompetensi: 'Pemahaman Inferensial',
      subKompetensi: 'Memprediksi lanjutan atau akhir uraian/cerita berdasarkan bagian tertentu dalam teks.',
      bentukSoal: 'PGK Kategori',
    },
    stimulusText: `Tahun 1945, suasana kota penuh ketegangan. Pasukan sekutu mulai memasuki wilayah, dan rakyat bersiap untuk mempertahankan kemerdekaan yang baru saja diproklamasikan. Di sebuah desa kecil di Jawa Timur, Sukarno muda—bukan presiden, melainkan seorang pemuda berusia sembilan belas tahun—duduk di beranda rumah kayu ayahnya. Di tangannya, ia menggenggam bambu runcing yang baru saja diasah oleh ayahnya semalam.
"Kau yakin ingin ikut, Ndro?" tanya ayahnya sambil menghisap rokok kretek. "Ini bukan permainan. Peluru mereka nyata, dan darahmu juga nyata."
Sukarno muda menatap mata ayahnya lekat-lekat. Ia teringat pada teman-temannya yang sudah lebih dulu bergabung dengan barisan pemuda di kota. Ia teringat pada pidato-pidato yang didengarnya dari radio tua di balai desa, tentang bagaimana kemerdekaan bukan hadiah, melainkan hak yang harus direbut.
"Ayah," jawabnya pelan namun tegas, "kalau bukan kita yang berdiri sekarang, siapa lagi? Kalau bukan sekarang, kapan lagi?"
Ayahnya terdiam lama. Asap rokok mengepul ke udara, bercampur dengan embun pagi yang mulai turun. Akhirnya, sang ayah mengangguk pelan, lalu merogoh saku celananya dan mengeluarkan sebuah benda kecil—sebuah kalung dengan liontin kayu berbentuk burung garuda.
"Ini milik kakekmu," kata ayahnya. "Dia memakainya saat melawan Belanda dulu. Bawa ini, supaya kau ingat untuk siapa kau berjuang."`,
    question: 'Berdasarkan bagian akhir teks tersebut, prediksi apa yang paling mungkin terjadi selanjutnya? Tentukan Tepat atau Tidak Tepat untuk setiap pernyataan berikut!',
    categoryColumns: ['Tepat', 'Tidak Tepat'],
    categoryStatements: [
      {
        id: 'A',
        statement: 'Sukarno muda akan menolak kalung tersebut karena ia ingin berjuang dengan kekuatannya sendiri tanpa bantuan benda pusaka.',
        correctValue: 'Tidak Tepat',
      },
      {
        id: 'B',
        statement: 'Sukarno muda akan menerima kalung tersebut dan berangkat bergabung dengan barisan pemuda untuk mempertahankan kemerdekaan.',
        correctValue: 'Tepat',
      },
      {
        id: 'C',
        statement: 'Sukarno muda akan menjual kalung tersebut untuk membeli senjata api yang lebih modern.',
        correctValue: 'Tidak Tepat',
      },
    ],
    explanation: `• Pernyataan A (Tidak Tepat): Kalung tersebut diberikan oleh ayahnya dengan makna simbolis yang sangat kuat—sebagai pengingat akan perjuangan kakeknya dan tujuan perjuangannya. Dalam konteks budaya Jawa dan semangat perjuangan 1945, menolak pemberian bermakna seperti ini dari ayah, terutama setelah sang ayah akhirnya mengizinkan, adalah hal yang tidak logis secara naratif dan kultural.
• Pernyataan B (Tepat): Ini adalah prediksi yang paling logis. Sukarno muda sudah menunjukkan tekad yang kuat untuk berjuang ("kalau bukan kita yang berdiri sekarang, siapa lagi?"). Ayahnya telah memberikan restu dan simbol pengingat. Kalung tersebut akan diterimanya sebagai bekal moral, dan ia akan berangkat bergabung dengan barisan pemuda sesuai dengan niatnya sejak awal.
• Pernyataan C (Tidak Tepat): Kalung tersebut memiliki nilai sentimental dan simbolis yang sangat tinggi—bukan sekadar benda material. Menjualnya untuk membeli senjata adalah tindakan yang bertentangan dengan karakter Sukarno muda yang digambarkan menghargai perjuangan dan warisan leluhur. Selain itu, dalam konteks 1945 di desa kecil, menjual kalung kayu untuk membeli senjata api adalah hal yang tidak realistis.`,
    category: 'Pemahaman Inferensial',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T09:25:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:25:00Z').toISOString(),
  },

  // SOAL 19 (PG - Evaluasi dan Apresiasi)
  {
    id: 'soal-19',
    type: 'pg',
    metadata: {
      noSoal: 19,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai relevansi peristiwa dalam teks dengan kehidupan sehari-hari.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `Makan malam di rumah itu hening, bukan karena tidak ada yang hendak berbicara, melainkan karena jari-jari lebih sibuk menari di atas layar gawai. Dika, seorang siswa kelas sebelas, menatap nasi di piringnya tanpa selera. Di tangannya, ia menggenggam secarik kertas pengumuman bahwa ia lolos ke babak final lomba robotik tingkat nasional. Ia ingin sekali berteriak bangga, menatap mata Ayah dan Ibu, dan berbagi kebahagiaan itu.
Namun, Ayah masih sibuk membalas email pekerjaan di ponselnya, sementara Ibu asyik menelusuri feed media sosial, sesekali tertawa kecil menanggapi video lucu. Dika mencoba membuka suara, "Ayah, Ibu, ada yang ingin Dika sampaikan." Ayah hanya mengangguk tanpa mengangkat pandangan, "Iya, Nak, nanti saja ya, Ayah sedang deadline." Dika kembali terdiam. Ia menyadari bahwa kehadiran fisik di satu ruangan tidak serta-merta menjamin kehadiran hati dan perhatian. Malam itu, Dika belajar bahwa kesepian bisa terasa paling menyakitkan justru ketika ia sedang dikelilingi oleh orang-orang yang paling dicintainya.`,
    question: 'Keterkaitan peristiwa dalam kutipan cerpen tersebut dengan fenomena kehidupan sehari-hari saat ini adalah ....',
    options: {
      A: 'Perkembangan teknologi robotik membuat anak-anak lebih memilih berinteraksi dengan mesin daripada dengan orang tua mereka.',
      B: 'Kesibukan bekerja dan aktivitas digital orang tua sering kali menciptakan jarak emosional, meskipun secara fisik mereka berada bersama anak.',
      C: 'Anak-anak zaman sekarang cenderung tidak peduli pada pencapaian akademik dan lebih mementingkan validasi dari media sosial.',
      D: 'Orang tua modern harus melarang penggunaan gawai di rumah agar anak-anak tidak merasa kesepian dan terabaikan.',
      E: 'Lomba tingkat nasional tidak lagi dianggap penting oleh keluarga dibandingkan dengan urusan pekerjaan dan hiburan digital.',
    },
    correctAnswer: 'B',
    explanation: 'Soal ini menguji kemampuan evaluasi terhadap relevansi sosial. Teks menggambarkan ironi "kesepian di tengah keramaian" akibat distraksi gawai. Opsi B secara tepat menangkap esensi relevansi tersebut, yaitu bahwa kehadiran fisik tidak menjamin koneksi emosional jika terhalang oleh kesibukan digital. Opsi A salah karena membalikkan fakta; C bertentangan dengan teks; D solusi ekstrem preskriptif; E generalisasi tidak berdasar.',
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T09:30:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:30:00Z').toISOString(),
  },

  // SOAL 20 (PG - Evaluasi dan Apresiasi)
  {
    id: 'soal-20',
    type: 'pg',
    metadata: {
      noSoal: 20,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai relevansi peristiwa dalam teks dengan kehidupan sehari-hari.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `Tren fast fashion telah menjamur di kalangan teman-teman Maya. Setiap minggu, selalu ada saja model baju baru yang murah dan hits di marketplace. Teman-temannya kerap membeli, memakainya sekali hanya untuk difoto dan diunggah ke media sosial, lalu menyingkirkannya ke tumpukan pakaian yang tak lagi terpakai. Maya merasa tidak nyaman melihat gunungan limbah tekstil yang mulai menumpuk di sudut kamarnya sendiri.
Dengan tekad yang bulat, Maya menginisiasi acara clothing swap (tukar baju) di sekolah. Awalnya, ia mendapat cibiran. "Ah, Maya kuno banget, siapa mau pakai baju bekas orang?" ejek seorang teman. Namun, Maya tidak patah arang. Ia menjelaskan dampak lingkungan dari industri fast fashion dengan data yang ia riset sendiri. Perlahan, beberapa teman mulai tertarik. Pada hari pelaksanaan, meski pesertanya tidak sebanyak yang ia bayangkan, ada sepuluh teman yang datang dengan antusias, menyadari bahwa gaya hidup berkelanjutan bisa dimulai dari langkah kecil yang keren.`,
    question: 'Berdasarkan teks tersebut, penilaian yang paling tepat mengenai relevansi tindakan Maya dengan kondisi masyarakat saat ini adalah ....',
    options: {
      A: 'Upaya mempromosikan gaya hidup ramah lingkungan sering kali menghadapi resistensi sosial di awal, namun memiliki potensi untuk menginspirasi perubahan perilaku secara bertahap.',
      B: 'Remaja saat ini secara umum tidak memiliki kepedulian terhadap lingkungan karena lebih mementingkan eksistensi di media sosial.',
      C: 'Kegiatan tukar-menukar pakaian adalah satu-satunya solusi efektif dan mutlak untuk menghentikan laju kerusakan industri tekstil global.',
      D: 'Membeli pakaian murah adalah pilihan ekonomi yang paling rasional bagi pelajar, sehingga kritik terhadap fast fashion tidak relevan.',
      E: 'Peran individu seperti Maya tidak akan pernah berdampak signifikan dibandingkan dengan regulasi pemerintah yang ketat.',
    },
    correctAnswer: 'A',
    explanation: 'Opsi A mengevaluasi peristiwa secara komprehensif: mengakui adanya tantangan (cibiran/resistensi) dan hasil positif (perubahan bertahap), yang sangat relevan dengan realita gerakan sosial atau lingkungan di kehidupan nyata. Opsi B overgeneralization, C menggunakan klaim absolut berlebihan, D mengabaikan evaluasi lingkungan, dan E bernada pesimistis merendahkan agensi individu.',
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T09:35:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:35:00Z').toISOString(),
  },

  // SOAL 21 (PG - Evaluasi dan Apresiasi)
  {
    id: 'soal-21',
    type: 'pg',
    metadata: {
      noSoal: 21,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai relevansi peristiwa dalam teks dengan kehidupan sehari-hari.',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `Bima menatap nilai 98 di rapor matematikanya dengan perasaan hampa. Di meja makan, Ayah dan Ibu memujinya setinggi langit, membayangkan Bima akan menjadi dokter bedah terkemuka seperti paman mereka. "Lihat, Nak, kerja kerasmu tidak sia-sia. Tahun depan kita fokus persiapan kedokteran, ya," ujar Ayah sambil menepuk bahunya. Bima hanya tersenyum tipis, sambil menyembunyikan rasa sesak di dadanya.
Di laci meja belajarnya, tersimpan rapi sebuah sketsbook berisi gambar-gambar desain arsitektur yang ia buat diam-diam sejak kelas sepuluh. Setiap kali ia mencoba membicarakannya, respons orang tuanya selalu sama: "Seni itu hobi, Nak, bukan masa depan." Tekanan ekspektasi itu kini berubah menjadi kecemasan yang mengganggu tidurnya. Hingga suatu hari, guru BK-nya menyadari mata Bima yang selalu lelah dan kerapahannya yang menurun. Alih-alih menasihati tentang belajar, guru tersebut justru meminta Bima menunjukkan portofolio gambarnya, lalu berkata, "Bakatmu luar biasa, Bima. Mari kita cari cara terbaik untuk membicarakannya dengan orang tuamu. Sukses itu punya banyak jalan, bukan hanya satu."`,
    question: 'Relevansi konflik yang dialami tokoh Bima dalam teks tersebut dengan realitas kehidupan pelajar saat ini adalah ....',
    options: {
      A: 'Pelajar sebaiknya memberontak secara terbuka terhadap keinginan orang tua demi mencapai kebahagiaan pribadi yang sejati.',
      B: 'Tekanan untuk memenuhi ekspektasi orang tua dapat memicu konflik batin dan masalah kesehatan mental, yang membutuhkan pendampingan empatik dari pihak sekolah.',
      C: 'Pelajaran eksakta seperti matematika secara inheren lebih menyebabkan stres dan kecemasan dibandingkan dengan pelajaran seni dan desain.',
      D: 'Guru bimbingan konseling memiliki tanggung jawab penuh untuk menyelesaikan seluruh masalah dinamika keluarga yang dialami oleh siswanya.',
      E: 'Memiliki minat di bidang seni secara otomatis akan menyebabkan penurunan prestasi akademik di bidang sains dan teknologi.',
    },
    correctAnswer: 'B',
    explanation: 'Opsi B secara tepat menilai relevansi peristiwa: mengidentifikasi akar masalah (tekanan ekspektasi orang tua), dampaknya (konflik batin/kesehatan mental), dan solusi yang digambarkan dalam teks (pendampingan empatik guru BK). Ini sangat relevan dengan isu kesehatan mental pelajar saat ini.',
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T09:40:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:40:00Z').toISOString(),
  },

  // SOAL 22 (PGK MCMA - Krisis Plastik)
  {
    id: 'soal-22',
    type: 'pgk_mcma',
    metadata: {
      noSoal: 22,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai keakuratan, kesesuaian, kecukupan, atau ketepatan informasi dalam teks.',
      bentukSoal: 'PGK MCMA',
    },
    stimulusText: `Teks 1
Sampah plastik sekali pakai telah menjadi krisis global yang tidak lagi bisa diselesaikan hanya dengan daur ulang. Data menunjukkan bahwa kurang dari 10% plastik yang pernah diproduksi benar-benar didaur ulang. Sisanya tertimbun di tempat pembuangan akhir, dibakar, atau mencemari lautan. Fokus yang berlebihan pada tanggung jawab konsumen untuk memilah sampah telah mengalihkan perhatian dari akar masalahnya, yaitu model produksi linier "ambil, buat, buang" yang diterapkan oleh industri. Selama keran produksi plastik virgin (baru) terus dibuka, upaya pembersihan di hilir hanyalah solusi tambal sulam yang tidak akan pernah mengejar ketertinggalan.

Teks 2
Solusi jangka panjang untuk krisis plastik terletak pada transisi menuju ekonomi sirkular. Dalam model ini, limbah dirancang untuk tidak ada sejak awal. Produk dibuat agar tahan lama, dapat diperbaiki, dan pada akhir masa pakainya, materialnya dapat dipulihkan sepenuhnya untuk dijadikan produk baru tanpa kehilangan kualitas. Ekonomi sirkular tidak hanya menuntut inovasi dalam desain produk, tetapi juga perubahan kebijakan, seperti penerapan Extended Producer Responsibility (EPR), di mana produsen bertanggung jawab penuh atas siklus hidup produk mereka, termasuk tahap pasca-konsumen.`,
    question: 'Mengapa kedua teks tersebut menyajikan informasi mengenai perlunya perubahan sistemik (dari produksi hingga kebijakan) dalam menangani krisis plastik? (Pilihlah jawaban yang benar! Jawaban benar lebih dari satu.)',
    mcmaOptions: {
      A: 'Untuk menyalahkan konsumen sepenuhnya atas kegagalan program daur ulang yang selama ini digalakkan.',
      B: 'Untuk menunjukkan bahwa informasi mengenai daur ulang saja tidak cukup (kurang memadai) tanpa adanya perubahan pada model produksi.',
      C: 'Untuk memberikan pandangan yang akurat bahwa solusi krisis plastik memerlukan pendekatan holistik, mulai dari desain produk hingga tanggung jawab produsen.',
      D: 'Untuk membuktikan bahwa industri plastik harus ditutup total secara paksa oleh pemerintah dalam waktu satu tahun ke depan.',
      E: 'Untuk menegaskan bahwa informasi mengenai tanggung jawab produsen (EPR) sangat relevan dan diperlukan untuk melengkapi kegagalan pendekatan yang hanya berfokus pada konsumen.',
    },
    mcmaCorrectAnswers: ['B', 'C', 'E'],
    explanation: `• Opsi B (Benar): Teks 1 secara eksplisit menyatakan bahwa daur ulang gagal (<10%) dan fokus pada konsumen adalah pengalihan isu. Ini menilai kecukupan informasi bahwa daur ulang saja tidak memadai.
• Opsi C (Benar): Ini adalah penilaian ketepatan dan kesesuaian sintesis kedua teks. Teks 1 menyoroti masalah produksi, Teks 2 menawarkan solusi sirkular dan EPR. Gabungannya membentuk pandangan holistik yang akurat.
• Opsi E (Benar): Menilai relevansi informasi Teks 2 (EPR) sebagai jawaban yang tepat atas masalah yang diangkat di Teks 1 (beban yang salah tempat pada konsumen).
• Opsi A (Salah): Bertentangan dengan teks. Teks 1 justru menyatakan bahwa menyalahkan konsumen adalah pengalihan dari akar masalah (produksi).
• Opsi D (Salah): Merupakan overgeneralization dan informasi yang tidak akurat. Teks 2 menawarkan transisi dan inovasi (ekonomi sirkular), bukan penutupan paksa secara ekstrem yang tidak disebutkan dalam teks.`,
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T09:45:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:45:00Z').toISOString(),
  },

  // SOAL 23 (PGK MCMA - Telemedicine)
  {
    id: 'soal-23',
    type: 'pgk_mcma',
    metadata: {
      noSoal: 23,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai keakuratan, kesesuaian, kecukupan, atau ketepatan informasi dalam teks.',
      bentukSoal: 'PGK MCMA',
    },
    stimulusText: `Telemedicine telah merevolusi akses layanan kesehatan, terutama bagi masyarakat di daerah terpencil. Melalui konsultasi video, pasien dapat memperoleh resep obat dan saran medis dasar tanpa harus menempuh perjalanan jauh. Namun, informasi mengenai keampuhan telemedicine harus dinilai secara kritis. Platform ini memiliki keterbatasan inheren: dokter tidak dapat melakukan pemeriksaan fisik menyeluruh, seperti mendengarkan detak jantung dengan stetoskop atau meraba pembengkakan. Oleh karena itu, algoritma diagnosis berbasis gejala saja berisiko menyebabkan misdiagnosis pada kasus yang kompleks. Para ahli kesehatan sepakat bahwa telemedicine paling efektif sebagai layanan triase awal atau pemantauan penyakit kronis yang stabil, bukan sebagai pengganti total untuk kunjungan tatap muka ketika gejala fisik yang mendetail diperlukan.`,
    question: 'Berdasarkan teks tersebut, manakah pernyataan yang tepat dan akurat dalam menilai kecukupan serta ketepatan informasi mengenai penggunaan telemedicine? (Pilihlah jawaban yang benar! Jawaban benar lebih dari satu.)',
    mcmaOptions: {
      A: 'Telemedicine dapat sepenuhnya menggantikan peran dokter dan pemeriksaan fisik di rumah sakit untuk semua jenis penyakit tanpa risiko.',
      B: 'Informasi dalam teks cukup untuk menyimpulkan bahwa telemedicine memiliki batasan klinis yang signifikan, terutama dalam hal pemeriksaan fisik.',
      C: 'Penulis menyajikan informasi yang berimbang dan akurat dengan memaparkan kelebihan telemedicine (aksesibilitas) sekaligus batasan klinisnya (risiko misdiagnosis).',
      D: 'Risiko misdiagnosis dalam telemedicine hanya terjadi pada pasien yang tidak memiliki koneksi internet yang stabil, bukan karena keterbatasan metode pemeriksaan.',
      E: 'Teks memberikan informasi yang tepat bahwa telemedicine paling sesuai (relevan) digunakan untuk triase awal atau pemantauan kondisi kronis, bukan untuk kasus darurat yang kompleks.',
    },
    mcmaCorrectAnswers: ['B', 'C', 'E'],
    explanation: `• Opsi B (Benar): Menilai kecukupan informasi. Teks secara eksplisit menyebutkan ketidakmampuan melakukan pemeriksaan fisik (stetoskop, meraba) sebagai keterbatasan inheren.
• Opsi C (Benar): Menilai ketepatan penyajian informasi oleh penulis. Teks bersifat objektif, mengakui manfaat (daerah terpencil) sekaligus risiko (misdiagnosis), menunjukkan keseimbangan informasi.
• Opsi E (Benar): Menilai kesesuaian informasi. Teks secara akurat membatasi penggunaan ideal telemedicine pada "triase awal atau pemantauan penyakit kronis yang stabil".
• Opsi A (Salah): Bertentangan langsung dengan informasi teks yang menyatakan telemedicine "bukan sebagai pengganti total".
• Opsi D (Salah): Informasi yang tidak akurat. Teks menyebutkan risiko misdiagnosis disebabkan oleh ketidakmampuan melakukan "pemeriksaan fisik menyeluruh", bukan karena masalah koneksi internet.`,
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T09:50:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:50:00Z').toISOString(),
  },

  // SOAL 24 (PGK MCMA - Bahasa Daerah)
  {
    id: 'soal-24',
    type: 'pgk_mcma',
    metadata: {
      noSoal: 24,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai keakuratan, kesesuaian, kecukupan, atau ketepatan informasi dalam teks.',
      bentukSoal: 'PGK MCMA',
    },
    stimulusText: `Teks 1 Bahasa daerah di Indonesia menghadapi ancaman serius di era digital. Generasi muda lebih dominan menggunakan bahasa Indonesia gaul atau bahasa asing dalam interaksi sehari-hari, termasuk di media sosial. Fenomena ini menciptakan kesenjangan antargenerasi, di mana anak-anak kesulitan berkomunikasi dengan kakek-nenek mereka menggunakan bahasa ibu. Jika tren ini terus berlanjut tanpa intervensi, banyak bahasa daerah yang diprediksi akan punah dalam beberapa dekade mendatang, membawa serta hilangnya kearifan lokal dan identitas budaya yang terkandung di dalamnya.

Teks 2 Di sisi lain, teknologi digital juga membuka peluang baru untuk revitalisasi bahasa daerah. Saat ini, bermunculan aplikasi pembelajaran bahasa daerah yang dikemas secara interaktif dan gamifikasi, menarik minat generasi muda. Selain itu, para kreator konten di platform video pendek mulai menggunakan bahasa daerah dalam materi mereka, menormalisasi penggunaannya di ruang publik digital. Kamus daring bahasa daerah yang dikembangkan secara kolaboratif oleh komunitas dan akademisi juga memudahkan akses terhadap kosakata yang mulai terlupakan.`,
    question: 'Bagaimana penilaian Anda terhadap keakuratan dan kesesuaian informasi yang disajikan dalam kedua teks tersebut terkait peran teknologi terhadap bahasa daerah? (Pilihlah jawaban yang benar! Jawaban benar lebih dari satu.)',
    mcmaOptions: {
      A: 'Kedua teks secara akurat menggambarkan dua sisi mata uang teknologi: sebagai ancaman dominasi bahasa global, sekaligus sebagai alat potensial untuk pelestarian.',
      B: 'Teks 1 memberikan data statistik yang sangat rinci dan akurat mengenai jumlah pasti penutur bahasa daerah yang hilang per tahun, sehingga informasinya sangat lengkap.',
      C: 'Informasi dalam Teks 2 sangat relevan dan memadai sebagai solusi untuk menjawab kekhawatiran akan kepunahan bahasa daerah yang diangkat dalam Teks 1.',
      D: 'Kedua teks sepakat bahwa teknologi digital adalah penyebab mutlak kepunahan bahasa daerah yang tidak dapat lagi dicegah atau dibalikkan arahnya.',
      E: 'Penyajian informasi dalam kedua teks saling melengkapi (komplementer), memberikan penilaian yang utuh dan tidak bias bahwa teknologi adalah alat yang netral, tergantung pada cara penggunaannya.',
    },
    mcmaCorrectAnswers: ['A', 'C', 'E'],
    explanation: `• Opsi A (Benar): Menilai keakuratan sintesis. Teks 1 menyoroti ancaman (dominasi bahasa asing di media sosial), Teks 2 menyoroti peluang (aplikasi, kreator konten). Ini adalah gambaran dua sisi yang akurat.
• Opsi C (Benar): Menilai kesesuaian dan kecukupan. Teks 2 memberikan contoh konkret solusi (aplikasi, kamus daring, kreator konten) yang secara langsung menjawab masalah "kurangnya minat/akses" generasi muda yang diimplikasikan di Teks 1.
• Opsi E (Benar): Menilai ketepatan struktur argumen gabungan. Kedua teks tidak saling meniadakan, melainkan melengkapi untuk menunjukkan bahwa teknologi adalah alat (netral) yang bisa merusak (Teks 1) atau memulihkan (Teks 2).
• Opsi B (Salah): Menilai keakuratan secara keliru. Teks 1 bersifat kualitatif dan prediktif ("diprediksi akan punah"), tidak menyajikan "data statistik yang sangat rinci dan jumlah pasti".
• Opsi D (Salah): Bertentangan dengan isi Teks 2 yang justru optimis dan menunjukkan bahwa kepunahan dapat dicegah melalui pemanfaatan teknologi yang tepat.`,
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T09:55:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T09:55:00Z').toISOString(),
  },

  // SOAL 25 (PGK Kategori - Benar / Salah)
  {
    id: 'soal-25',
    type: 'pgk_kategori',
    metadata: {
      noSoal: 25,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai ketepatan dan kesesuaian penggunaan bahasa dalam teks',
      bentukSoal: 'PGK Kategori',
    },
    stimulusText: `Pemerintah kota telah meluncurkan program "Kota Bebas Sampah Plastik" yang menargetkan pengurangan penggunaan kantong plastik sekali pakai sebesar 70% dalam tiga tahun ke depan. Program ini melarang distribusi kantong plastik di supermarket dan toko ritel modern. Sebagai gantinya, masyarakat didorong untuk membawa tas belanja sendiri atau menggunakan tas ramah lingkungan yang dapat digunakan berulang kali.
Namun, implementasi kebijakan ini menuai pro dan kontra. Di satu sisi, aktivis lingkungan menyambut baik langkah ini sebagai terobosan penting dalam mengurangi pencemaran. Di sisi lain, pedagang kecil khawatir akan kehilangan pelanggan yang terbiasa dengan kemudahan kantong plastik. "Kami memahami kekhawatiran tersebut," ujar Kepala Dinas Lingkungan Hidup, "oleh karena itu, pemerintah akan memberikan subsidi untuk pengadaan tas ramah lingkungan bagi pedagang pasar tradisional."`,
    question: `Perhatikan kalimat berikut dalam teks: "Kami memahami kekhawatiran tersebut," ujar Kepala Dinas Lingkungan Hidup.
Mengapa penulis menggunakan kalimat tersebut dalam teks?
Tentukan Benar atau Salah untuk setiap pernyataan berikut!`,
    categoryColumns: ['Benar', 'Salah'],
    categoryStatements: [
      {
        id: 'A',
        statement: 'Untuk menunjukkan bahwa pemerintah mengakui adanya dampak negatif dari kebijakan yang diambil terhadap pihak tertentu.',
        correctValue: 'Benar',
      },
      {
        id: 'B',
        statement: 'Untuk membuktikan bahwa Kepala Dinas Lingkungan Hidup tidak setuju dengan kebijakan yang diterapkan.',
        correctValue: 'Salah',
      },
      {
        id: 'C',
        statement: 'Untuk menyeimbangkan pemberitaan dengan menampilkan empati pemerintah terhadap keluhan masyarakat.',
        correctValue: 'Benar',
      },
      {
        id: 'D',
        statement: 'Untuk mengalihkan perhatian pembaca dari permasalahan utama kebijakan tersebut.',
        correctValue: 'Salah',
      },
      {
        id: 'E',
        statement: 'Untuk memperkuat argumentasi bahwa kebijakan ini diambil tanpa pertimbangan yang matang.',
        correctValue: 'Salah',
      },
    ],
    explanation: `• Pernyataan A (Benar): Kalimat tersebut secara tepat menunjukkan pengakuan pemerintah terhadap kekhawatiran pedagang kecil, yang merupakan dampak negatif dari kebijakan. Ini adalah penggunaan bahasa yang sesuai untuk menunjukkan akuntabilitas.
• Pernyataan B (Salah): Bertentangan dengan isi teks. Kalimat tersebut justru menunjukkan pemahaman, bukan ketidaksetujuan. Kepala Dinas tetap mendukung kebijakan namun dengan solusi.
• Pernyataan C (Benar): Penggunaan kutipan langsung ini tepat untuk memberikan keseimbangan (balance) dalam jurnalisme, menampilkan bahwa pemerintah tidak abai terhadap keluhan.
• Pernyataan D (Salah): Kalimat tersebut tidak mengalihkan perhatian, melainkan bagian integral dari narasi yang menunjukkan respons pemerintah terhadap masalah.
• Pernyataan E (Salah): Justru sebaliknya, kalimat tersebut menunjukkan bahwa kebijakan diambil dengan mempertimbangkan berbagai aspek, termasuk dampak sosialnya.`,
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T10:00:00Z').toISOString(),
  },

  // SOAL 26 (PGK Kategori - Benar / Salah)
  {
    id: 'soal-26',
    type: 'pgk_kategori',
    metadata: {
      noSoal: 26,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai ketepatan dan kesesuaian penggunaan bahasa dalam teks',
      bentukSoal: 'PGK Kategori',
    },
    stimulusText: `Perkembangan kecerdasan buatan (AI) telah mengubah lanskap pendidikan secara fundamental. Di satu sisi, AI menawarkan personalisasi pembelajaran yang memungkinkan setiap siswa belajar sesuai dengan kecepatan dan gaya belajar mereka. Platform berbasis AI dapat mengidentifikasi kelemahan siswa dan memberikan latihan yang tepat sasaran.
Namun demikian, para pendidik mengingatkan bahwa ketergantungan berlebihan pada teknologi ini berpotensi mengikis kemampuan berpikir kritis dan kreativitas siswa. "AI adalah alat bantu, bukan pengganti proses berpikir," tegas Dr. Suryani, pakar pendidikan dari Universitas Indonesia. Oleh karena itu, integrasi AI dalam pembelajaran harus disertai dengan pedagogi yang tepat agar teknologi ini benar-benar memberdayakan, bukan melemahkan, kapasitas intelektual siswa.`,
    question: `Perhatikan penggunaan kata penghubung "Namun demikian" pada awal paragraf kedua teks tersebut.
Mengapa penulis menggunakan kata penghubung tersebut?
Tentukan Benar atau Salah untuk setiap pernyataan berikut!`,
    categoryColumns: ['Benar', 'Salah'],
    categoryStatements: [
      {
        id: 'A',
        statement: 'Untuk menunjukkan pertentangan atau kontras dengan informasi yang disampaikan pada paragraf sebelumnya.',
        correctValue: 'Benar',
      },
      {
        id: 'B',
        statement: 'Untuk menambahkan informasi yang sejalan dan memperkuat argumen tentang keunggulan AI.',
        correctValue: 'Salah',
      },
      {
        id: 'C',
        statement: 'Untuk memberikan transisi yang halus dari pembahasan kelebihan AI menuju pembahasan risiko atau kekurangannya.',
        correctValue: 'Benar',
      },
      {
        id: 'D',
        statement: 'Untuk menyimpulkan seluruh pembahasan tentang AI dalam pendidikan yang telah diuraikan sebelumnya.',
        correctValue: 'Salah',
      },
      {
        id: 'E',
        statement: 'Untuk menandai pergeseran perspektif dari sisi positif teknologi menuju sisi yang perlu diwaspadai.',
        correctValue: 'Benar',
      },
    ],
    explanation: `• Pernyataan A (Benar): "Namun demikian" adalah konjungsi pertentangan yang tepat digunakan untuk menunjukkan kontras antara paragraf pertama (kelebihan AI) dan paragraf kedua (risiko AI).
• Pernyataan B (Salah): Bertentangan dengan fungsi "namun demikian". Kata ini tidak menambahkan informasi sejalan, melainkan informasi yang bertolak belakang.
• Pernyataan C (Benar): Penggunaan kata penghubung ini sangat tepat untuk transisi dari aspek positif ke aspek negatif, menunjukkan struktur teks yang seimbang dan objektif.
• Pernyataan D (Salah): "Namun demikian" bukan kata untuk menyimpulkan, melainkan untuk mempertentangkan. Kesimpulan biasanya menggunakan "oleh karena itu", "dengan demikian", atau "kesimpulannya".
• Pernyataan E (Benar): Ini adalah fungsi retorika yang tepat dari "namun demikian" — menandai pergeseran dari perspektif optimistis ke perspektif kritis/waspada.`,
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T10:05:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T10:05:00Z').toISOString(),
  },

  // SOAL 27 (PGK Kategori - Benar / Salah)
  {
    id: 'soal-27',
    type: 'pgk_kategori',
    metadata: {
      noSoal: 27,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai ketepatan dan kesesuaian penggunaan bahasa dalam teks',
      bentukSoal: 'PGK Kategori',
    },
    stimulusText: `Kepada Yth. Bapak/Ibu Orang Tua/Wali Murid di Tempat

Dengan hormat,
Sehubungan dengan akan dilaksanakannya Ujian Sekolah Tahun Ajaran 2024/2025, kami informasikan bahwa kegiatan belajar mengajar akan ditiadakan mulai tanggal 15 hingga 20 Mei 2025. Pada periode tersebut, siswa diharapkan belajar di rumah dan mempersiapkan diri menghadapi ujian.
Demikian surat pemberitahuan ini kami sampaikan. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih.

Hormat kami,
Kepala Sekolah`,
    question: `Perhatikan kalimat penutup surat tersebut: "Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih."
Bagaimana penilaian Anda terhadap ketepatan dan kesesuaian penggunaan bahasa dalam kalimat tersebut?
Tentukan Benar atau Salah untuk setiap pernyataan berikut!`,
    categoryColumns: ['Benar', 'Salah'],
    categoryStatements: [
      {
        id: 'A',
        statement: 'Kalimat tersebut menggunakan bahasa formal yang sesuai dengan konteks surat resmi dari institusi pendidikan kepada orang tua siswa.',
        correctValue: 'Benar',
      },
      {
        id: 'B',
        statement: 'Penggunaan frasa "kerja sama" tidak tepat karena orang tua siswa tidak dilibatkan dalam pelaksanaan ujian sekolah.',
        correctValue: 'Salah',
      },
      {
        id: 'C',
        statement: 'Kalimat tersebut merupakan formula penutup surat dinas yang lazim dan menunjukkan kesopanan dalam berkomunikasi.',
        correctValue: 'Benar',
      },
      {
        id: 'D',
        statement: 'Penggunaan kata "kami" menunjukkan bahwa surat ini mewakili institusi sekolah, bukan individu, sehingga tepat secara kontekstual.',
        correctValue: 'Benar',
      },
      {
        id: 'E',
        statement: 'Kalimat tersebut seharusnya diganti dengan kalimat yang lebih singkat seperti "Terima kasih" agar lebih efektif dan modern.',
        correctValue: 'Salah',
      },
    ],
    explanation: `• Pernyataan A (Benar): Kalimat tersebut menggunakan bahasa formal (baku) yang sangat sesuai dengan genre surat resmi/dinas dari sekolah kepada orang tua. Ini menunjukkan kesesuaian register bahasa dengan konteks.
• Pernyataan B (Salah): Frasa "kerja sama" sangat tepat karena orang tua dilibatkan dalam mendukung anak belajar di rumah dan memastikan anak siap menghadapi ujian. Ini adalah bentuk kolaborasi sekolah-rumah.
• Pernyataan C (Benar): Ini adalah formula konvensi surat dinas yang sudah baku dan menunjukkan kesopanan (politeness strategy) dalam komunikasi formal. Penggunaannya tepat dan sesuai norma.
• Pernyataan D (Benar): Kata ganti "kami" menunjukkan institusi (sekolah), bukan personal, yang sesuai dengan surat resmi yang ditandatangani Kepala Sekolah sebagai perwakilan institusi.
• Pernyataan E (Salah): Meskipun "Terima kasih" lebih singkat, dalam konteks surat resmi formal, formula lengkap tersebut lebih sesuai karena menunjukkan penghargaan yang lebih utuh dan menjaga etika komunikasi institusional.`,
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T10:10:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T10:10:00Z').toISOString(),
  },

  // SOAL 28 (PGK MCMA - Karakter Raka tangguh)
  {
    id: 'soal-28',
    type: 'pgk_mcma',
    metadata: {
      noSoal: 28,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai ketepatan bagian teks untuk menggambarkan karakter, peristiwa, atau latar dalam teks fiksi',
      bentukSoal: 'PGK MCMA',
    },
    stimulusText: `Raka menatap robot rancangannya yang terjungkal di arena kompetisi nasional. Suara sorak-sorai penonton untuk tim lain terdengar samar di telinganya. Kegagalan ini adalah yang ketiga kalinya baginya. Namun, alih-alih menghancurkan rancangannya dengan amarah, Raka segera mengeluarkan buku catatannya dari dalam tas. Ia mencatat sudut kemiringan roda yang menyebabkan robotnya terbalik dengan teliti. "Ini bukan akhir," gumamnya pelan sambil menghapus air matanya. "Tahun depan, aku akan perbaiki sistem keseimbangannya." Tanpa rasa dendam, ia lalu berjalan menghampiri tim pemenang dan meminta izin untuk mempelajari teknologi robot mereka.`,
    question: 'Kalimat mana saja dari dalam kutipan cerpen tersebut yang secara tepat membuktikan bahwa tokoh Raka memiliki karakter yang tangguh, analitis, dan rendah hati? (Pilihlah jawaban yang benar! Jawaban benar lebih dari satu.)',
    mcmaOptions: {
      A: 'Raka menatap robot rancangannya yang terjungkal di arena kompetisi nasional.',
      B: 'Namun, alih-alih menghancurkan rancangannya dengan amarah, Raka segera mengeluarkan buku catatannya.',
      C: 'Suara sorak-sorai penonton untuk tim lain terdengar samar di telinganya.',
      D: 'Ia mencatat sudut kemiringan roda yang menyebabkan robotnya terbalik dengan teliti.',
      E: 'Tanpa rasa dendam, ia lalu berjalan menghampiri tim pemenang dan meminta izin untuk mempelajari teknologi robot mereka.',
    },
    mcmaCorrectAnswers: ['B', 'D', 'E'],
    explanation: `• Opsi B (Benar): Tindakan tidak menghancurkan robot dan justru mengambil buku catatan menunjukkan pengendalian emosi (tangguh) dan sikap analitis.
• Opsi D (Benar): Mencatat sudut kemiringan roda secara teliti adalah bukti konkret dari karakter analitis dan teliti dalam memecahkan masalah.
• Opsi E (Benar): Menghampiri pemenang untuk belajar menunjukkan kerendahan hati dan keinginan kuat untuk berkembang (tangguh).
• Opsi A (Salah): Kalimat ini hanya mendeskripsikan peristiwa atau situasi yang dihadapi tokoh, bukan secara langsung membuktikan sifat karakternya.
• Opsi C (Salah): Kalimat ini merupakan deskripsi latar suasana (auditori), bukan gambaran karakter tokoh.`,
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T10:15:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T10:15:00Z').toISOString(),
  },

  // SOAL 29 (PGK MCMA - Latar perpustakaan tua)
  {
    id: 'soal-29',
    type: 'pgk_mcma',
    metadata: {
      noSoal: 29,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menilai ketepatan bagian teks untuk menggambarkan karakter, peristiwa, atau latar dalam teks fiksi',
      bentukSoal: 'PGK MCMA',
    },
    stimulusText: `Langkah kaki Elara bergema keras di lorong perpustakaan tua itu. Debu tebal menyelimuti rak-rak kayu jati yang mulai lapuk dimakan rayap. Bau kertas basah dan apek menusuk hidung, bercampur dengan aroma kayu lapuk yang menyengat. Cahaya bulan pucat yang masuk melalui jendela kaca patri yang retak menciptakan bayangan-bayangan aneh dan memanjang di lantai marmer. Tidak ada suara lain selain detak jam dinding besar yang berdetak lambat dan berat, seolah menghitung waktu yang tersisa bagi tempat ini.`,
    question: 'Bagian teks mana saja yang secara tepat dan efektif menggambarkan latar tempat serta suasana misterius dan mencekam dalam cerita tersebut? (Pilihlah jawaban yang benar! Jawaban benar lebih dari satu.)',
    mcmaOptions: {
      A: 'Langkah kaki Elara bergema keras di lorong perpustakaan tua itu.',
      B: 'Debu tebal menyelimuti rak-rak kayu jati yang mulai lapuk dimakan rayap.',
      C: 'Elara segera mengambil sebuah buku tua di rak paling ujung dan membukanya.',
      D: 'Cahaya bulan pucat yang masuk melalui jendela kaca patri yang retak menciptakan bayangan-bayangan aneh dan memanjang di lantai marmer.',
      E: 'Tiba-tiba, sebuah suara decitan keras terdengar dari lantai dua, membuat Elara tersentak.',
    },
    mcmaCorrectAnswers: ['A', 'B', 'D'],
    explanation: `• Opsi A (Benar): Gema langkah kaki di lorong tua secara efektif membangun latar tempat (perpustakaan tua) dan suasana sepi/mencekam.
• Opsi B (Benar): Deskripsi debu tebal dan kayu lapuk memberikan gambaran visual dan indrawi yang kuat tentang latar tempat yang sudah lama terbengkalai.
• Opsi D (Benar): Bayangan aneh dari cahaya bulan melalui kaca patri retak adalah deskripsi latar yang sangat tepat untuk membangun suasana misterius dan mencekam.
• Opsi C (Salah): Kalimat ini mendeskripsikan peristiwa atau tindakan tokoh (plot), bukan deskripsi latar.
• Opsi E (Salah): Kalimat ini merupakan peristiwa (kejutan/plot twist) yang terjadi di dalam cerita, bukan deskripsi statis mengenai latar tempat atau suasana.`,
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'sedang',
    status: 'published',
    createdAt: new Date('2026-01-15T10:20:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T10:20:00Z').toISOString(),
  },

  // SOAL 30 (PG / PGK MCMA - Respon emosional Pak Darman)
  {
    id: 'soal-30',
    type: 'pg',
    metadata: {
      noSoal: 30,
      kompetensi: 'Evaluasi dan Apresiasi',
      subKompetensi: 'Menyimpulkan respons emosional terhadap unsur puisi, prosa, dan drama',
      bentukSoal: 'Pilihan Ganda (PG)',
    },
    stimulusText: `Hujan deras mengguyur trotoar kota. Pak Darman tetap duduk di sudut, memayungi gerobak baksonya dengan terpal lusuh yang sudah berlubang di sana-sini. Air menggenang di sepatunya yang terbuka, tapi tangannya tetap cekatan mengaduk kuah yang masih mengepul. Seorang anak kecil berlari mendekat, bukan untuk membeli, tapi sekadar berlindung di bawah terpal itu. Pak Darman tidak mengusirnya. Ia justru menggeser bangku kecilnya, memberi ruang, dan tanpa sepatah kata, menyodorkan mangkuk kecil berisi kuah hangat tanpa bakso. "Minum dulu, Nak, biar nggak kedinginan," bisiknya. Di tengah hiruk-pikuk kota yang acuh, kehangatan itu terasa seperti satu-satunya hal yang nyata.`,
    question: 'Melalui penggambaran tindakan tokoh dan latar suasana, respons emosional apa yang paling dominan muncul dalam diri pembaca terhadap tokoh Pak Darman?',
    options: {
      A: 'Rasa jijik dan risih terhadap kondisi kebersihan pedagang kaki lima di lingkungan perkotaan.',
      B: 'Rasa haru dan empati mendalam terhadap kemanusiaan yang masih tersisa di tengah keterbatasan dan ketidakpedulian.',
      C: 'Rasa marah terhadap sistem pemerintahan yang tidak mampu menyediakan tempat berlindung bagi warganya.',
      D: 'Rasa takut akan bahaya kesehatan yang mungkin ditularkan melalui makanan yang dibagikan secara cuma-cuma.',
      E: 'Rasa kagum semata terhadap ketangguhan fisik Pak Darman dalam menghadapi cuaca ekstrem tanpa mengeluh.',
    },
    correctAnswer: 'B',
    explanation: `Penulis sengaja membangun kontras antara latar yang dingin dan "acuh" dengan tindakan Pak Darman yang hangat, tulus, dan "tanpa sepatah kata". Detail seperti "menggeser bangku", "memberi ruang", dan memberikan "kuah hangat" kepada anak yang tidak membeli dirancang untuk memancing empati dan rasa haru pembaca terhadap kebaikan hati di tengah kesederhanaan. Opsi A dan D adalah respons yang sinis dan mengabaikan nilai kemanusiaan dalam teks. Opsi C mengalihkan fokus ke ranah politik yang tidak menjadi inti narasi. Opsi E hanya menangkap aspek fisik, melewatkan inti emosional (kebaikan hati) dari adegan tersebut.`,
    category: 'Evaluasi dan Apresiasi',
    difficulty: 'mudah',
    status: 'published',
    createdAt: new Date('2026-01-15T10:25:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T10:25:00Z').toISOString(),
  },
];
