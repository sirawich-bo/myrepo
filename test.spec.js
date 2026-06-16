const { test, expect } = require('@playwright/test');

test('ทดสอบการเปลี่ยนหน้าและกรอกข้อมูลฟอร์ม', async ({ page }) => {
    // 1. เข้าไปที่หน้าแรก
    await page.goto('http://localhost:3000/index.html');

    // หน่วงเวลา 1 วินาที (1000 มิลลิวินาที) ก่อนกดเปลี่ยนหน้า
    await page.waitForTimeout(1000);

    // 2. ทดสอบการกดไปยังหน้าอื่น
    // คลิกที่ลิงก์โดยใช้ ID
    await page.click('#go-to-form');
    
    // ตรวจสอบว่า URL เปลี่ยนเป็นหน้า form.html แล้วจริงๆ
    await expect(page).toHaveURL(/.*form.html/);

    // หน่วงเวลาอีก 1 วินาที ให้เรามองเห็นหน้าฟอร์ม
    await page.waitForTimeout(1000);

    // 3. ทดสอบการกรอกข้อมูลลงช่อง
    // กรอกชื่อและอีเมลโดยอ้างอิงจาก ID ของ input
    await page.fill('#name', 'สมชาย ใจดี');
    await page.fill('#email', 'somchai@example.com');

    // หน่วงเวลา 2 วินาที เพื่อดูข้อมูลที่ถูกพิมพ์ลงไป
    await page.waitForTimeout(2000);

    // 4. กดปุ่มยืนยันข้อมูล
    await page.click('#submit-btn');

    // 5. ตรวจสอบว่าหน้าเว็บแสดงข้อความสำเร็จตามที่คาดหวังหรือไม่
    const successMessage = page.locator('#success-message');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('บันทึกข้อมูลสำเร็จ!');

    // หน่วงเวลา 2 วินาที ดูกล่องข้อความสำเร็จก่อนที่เบราว์เซอร์จะปิดไป
    await page.waitForTimeout(2000);
});
