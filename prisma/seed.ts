import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed Admin User
const hashedPassword = await bcrypt.hash('admin123', 10);
await prisma.admin.upsert({
  where: { username: 'admin' },
  update: {},
  create: {
    username: 'admin',
    password: hashedPassword,
  },
  });
  console.log('✅ User admin dibuat');

  // Seed Reviews
  const reviews = [
    { name: 'Budi Santoso', rating: 5, comment: 'Warkop paling nyaman di Slawi! Kopinya enak, Wi-Fi kencang, dan suasananya bikin betah berlama-lama.' },
    { name: 'Sari Dewi', rating: 4, comment: 'Harga terjangkau banget, cocok buat kantong mahasiswa. Tempatnya juga bersih dan nyaman.' },
    { name: 'Ahmad Fauzi', rating: 5, comment: 'Sering ngerjain tugas di sini. Colokan banyak, Wi-Fi stabil, dan kopinya mantap. Recommended!' },
    { name: 'Rina Kusuma', rating: 4, comment: 'Tempat nongkrong favorit sama teman-teman. Menu variatif dan harganya bersahabat.' },
    { name: 'Dodi Prasetyo', rating: 5, comment: 'Buka 24 jam jadi bisa kapan aja mampir. Kopi hitamnya juara, cocok buat begadang ngerjain project.' },
    { name: 'Lina Marlina', rating: 4, comment: 'Suasana santai dan tidak terlalu ramai. Pelayanannya ramah dan cepat.' },
    { name: 'Hendra Wijaya', rating: 5, comment: 'Es kopi susunya enak banget! Harga Rp8.000 tapi rasanya premium. Pasti balik lagi!' },
    { name: 'Maya Sari', rating: 4, comment: 'Cocok buat meeting informal atau sekedar santai. Tempatnya strategis dan mudah dijangkau.' },
    { name: 'Rizki Pratama', rating: 5, comment: 'Warkop terbaik di Tegal! Konsepnya modern tapi harganya tetap merakyat. Bravo!' },
    { name: 'Fitri Handayani', rating: 4, comment: 'Pisang gorengnya enak banget dijadikan teman kopi. Tempatnya juga instagramable.' },
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  console.log('✅ Seed data berhasil ditambahkan!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });