https://github.com/eartttpy1/web2/tree/main/lab2

-----------
npm install @prisma/client@6 prisma@6 --save-dev
npx prisma init
__
ทำ schema เสด + แก้ schema/datasource => (provider = "sqlite" และ url = "file:./dev.db") + แก้ config/datasource => (url: "file:./dev.db",)
npx prisma migrate dev --name init
npx prisma generate
npx prisma migrate reset (ลบหมด)
npx prisma studio (เปิด db)
