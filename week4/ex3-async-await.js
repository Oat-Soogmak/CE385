// ex3-async/await ลำดับ/ขนาน
// จำลองฟังก์ชันดึงข้อมูลนักศึกษาจากข้อ 2 (คืนค่า Promise)
function fetchStudent(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const students = {
        1: { name: "สมชาย", grade: "A" },
        2: { name: "สมหญิง", grade: "B" },
        3: { name: "สมศักดิ์", grade: "C" },
      };

      if (students[id]) {
        resolve(students[id]);
      } else {
        reject(`ไม่พบข้อมูลนักศึกษารหัส ${id}`);
      }
    }, 300); 
  });
}

// ส่วนที่ 1 — reportSequential()
async function reportSequential() {
  const ids = [1, 2, 3];
  const startTime = Date.now();

  for (const id of ids) {
    await fetchStudent(id);
  }

  const duration = Date.now() - startTime;
  console.log(`[ส่วนที่ 1] ดึงข้อมูลตามลำดับใช้เวลา: ${duration} ms`);
  return duration;
}

// ส่วนที่ 2 — reportParallel()
async function reportParallel(seqDuration) {
  const ids = [1, 2, 3];
  const startTime = Date.now();

  await Promise.all(ids.map((id) => fetchStudent(id)));

  const parallelDuration = Date.now() - startTime;
  const speedup = (seqDuration / parallelDuration).toFixed(2);

  console.log(`[ส่วนที่ 2] ดึงข้อมูลขนานใช้เวลา: ${parallelDuration} ms (เร็วกว่าเดิม ${speedup} เท่า)`);
}

// ส่วนที่ 3 — safeReport(id)
async function safeReport(id) {
  try {
    const student = await fetchStudent(id);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${student.grade})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

// ฟังก์ชันหลักรันทุกส่วนตามลำดับ
async function main() {
  console.log("=== เริ่มการทำงาน ===");
  const seqDuration = await reportSequential();
  await reportParallel(seqDuration);
  console.log("\n[ส่วนที่ 3] ทดสอบ safeReport:");
  await safeReport(1); 
  await safeReport(99);
}

main();