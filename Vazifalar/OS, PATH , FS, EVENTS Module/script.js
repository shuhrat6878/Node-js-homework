const fs = require('fs');
const path = require('path');

const miniOyin = path.join(__dirname, 'treasure_hunt');

const faylYarat = {
  cave: { 'map.txt': 'Xaritani organing va yolingizni toping' },
  forest: { 'clue1.txt': 'Siz togri yoldasiz Lekin quyosh botadigan tomonni unutmang' },
  desert: { 'clue2.txt': 'Jangchi yuragiga ega boling Xazina yaqin' },
  hidden_temple: { 'treasure.txt': 'Tabriklaymiz Siz xazinani topdingiz' }
};

function asosiyOyin() {
  if (!fs.existsSync(miniOyin)) {
    fs.mkdirSync(miniOyin);
  }

  for (const boxx in faylYarat) {
    const boxxPath = path.join(miniOyin, boxx);
    if (!fs.existsSync(boxxPath)) {
      fs.mkdirSync(boxxPath);
    }

    for (const fayl in faylYarat[boxx]) {
      const faylPath = path.join(boxxPath, fayl);
      const content = faylYarat[boxx][fayl];
      fs.writeFileSync(faylPath, content, 'utf-8');
      console.log(`yaratildi: ${faylPath}`);
    }
  }
}

asosiyOyin();
