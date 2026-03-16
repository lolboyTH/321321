https://github.com/eartttpy1/web2/tree/main/lab2

-----------<br>
npm install @prisma/client@6 prisma@6 --save-dev<br>
npx prisma init<br>
__<br>
แก้ schema/datasource => (provider = "sqlite" และ url = "file:./dev.db") + แก้ config/datasource => (url: "file:./dev.db",)<br>
แก้ -js ใน schema<br>
npx prisma migrate dev --name init<br>
ทำ schema เสด<br>
npx prisma migrate dev --name init<br>
npx prisma generate<br>
npx prisma migrate reset (ลบหมด)<br>
npx prisma studio (เปิด db)<br>
