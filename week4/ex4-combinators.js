//ex-4 เลือก Combinator ให้ถูกงาน
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });
  
const timeoutPromise = (ms) => 
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout Exceeded')), ms)
  );

async function main() {
  console.log("--- ข้อ 1 ---");
  
  try {
    const results = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ")
    ]);
    console.log(`เปิดหน้าแรก: ${results.join(", ")}`);
  } catch (err) {
    console.log(`หน้าแรกเปิดไม่ได้: ${err.message}`);
  }

  try {
    const results = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true)
    ]);
    console.log(`เปิดหน้าแรก: ${results.join(", ")}`);
  } catch (err) {
    console.log(`หน้าแรกเปิดไม่ได้: ${err.message}`);
  }

  console.log("\n--- ข้อ 2 ---");
  const notificationResults = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true),
    wait(400, "แอป")
  ]);

  const report = notificationResults.map((res) => {
    if (res.status === "fulfilled") {
      return `${res.value} ส่งสำเร็จ`;
    } else {
      return `ส่งไม่สำเร็จ (${res.reason.message})`;
    }
  });
  console.log(`รายงานแจ้งเตือน: ${report.join(" | ")}`);

  console.log("\n--- ข้อ 3 ---");
  try {
    const firstSuccess = await Promise.any([
      wait(300, "mirror-A", true),
      wait(600, "mirror-B")
    ]);
    console.log(`ใช้ข้อมูลจาก: ${firstSuccess}`);
  } catch (err) {
    console.log("ไม่มี server ไหนใช้งานได้เลย");
  }

  console.log("\n--- ข้อ 4 ---");
  try {
    const result = await Promise.race([
      wait(1200, "ข้อมูลจากฐานข้อมูล"),
      timeoutPromise(800)
    ]);
    console.log(`ผลการค้นหา: ${result}`);
  } catch (err) {
    console.log("ใช้แคชเก่าแทน");
  }
}

main();