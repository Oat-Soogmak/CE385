// Ex3-สรุปผลการเรียน
// ส่วนที่ 1 ข้อมูลนักศึกษา
const toGrade = (score) => {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "F";
};
const students = [
  { id: "6501", name: "สมชาย", major: "CE", score: 78 },
  { id: "6502", name: "สมหญิง", major: "CE", score: 91 },
  { id: "6503", name: "มานี", major: "IT", score: 45 },
  { id: "6504", name: "ปิติ", major: "IT", score: 66 },
  { id: "6505", name: "วีระ", major: "CE", score: 52 },
  { id: "6506", name: "ชูใจ", major: "CE", score: 38 }
];
// 1. คืน array ของชื่อทุกคน
const getNames = (list) => list.map((s) => s.name);

// 2. คืน array ของคนที่คะแนน >= 50
const getPassedStudents = (list) => list.filter((s) => s.score >= 50);

// 3. ผลรวมคะแนนทั้งหมด (ใส่ค่าเริ่มต้น 0 เสมอ)
const getTotalScore = (list) => list.reduce((sum, s) => sum + s.score, 0);

// 4. คะแนนเฉลี่ย (ทศนิยม 2 ตำแหน่ง) — array ว่างต้องคืน 0 ไม่ใช่ NaN
const getAverageScore = (list) => {
  if (list.length === 0) return 0;
  const avg = getTotalScore(list) / list.length;
  return Number(avg.toFixed(2));
};

// 5. object นับจำนวนแยกตามเกรด (ให้ค่าเริ่มต้นเป็น {})
const countByGrade = (list) =>
  list.reduce((counter, s) => {
    const grade = toGrade(s.score);
    counter[grade] = (counter[grade] ?? 0) + 1;
    return counter;
  }, {});

// 6. นักศึกษาที่คะแนนสูงสุด (ใช้ reduce และจัดการกรณี array ว่าง)
const getTopStudent = (list) =>
  list.reduce((top, s) => (!top || s.score > top.score ? s : top), null);

// ส่วนที่ 2 ชุดข้อมูล
const cePassedScores = students.filter((s) => s.major === "CE" && s.score >= 50).map((s) => s.score);
const cePassedAverage = cePassedScores.length === 0 ? 0 : Number((cePassedScores.reduce((sum, score) => sum + score, 0) / cePassedScores.length).toFixed(2));
// ผลการทดสอบที่ 1
console.log("=== ผลการทดสอบ ส่วนที่ 1 ===");
console.log("getNames:", getNames(students));
console.log("getPassedStudents:", getPassedStudents(students));
console.log("getTotalScore:", getTotalScore(students));
console.log("getAverageScore:", getAverageScore(students));
console.log("countByGrade:", countByGrade(students));
console.log("getTopStudent:", getTopStudent(students));
// ผลการทดสอบที่ 2
console.log("\n=== ผลการทดสอบ ส่วนที่ 2 ===");
console.log("คะแนนเฉลี่ยเด็ก CE ที่สอบผ่าน:", cePassedAverage);

// ส่วนที่ 3 ทดสอบกรณีตัว Array ว่าง []
console.log("\n=== ผลการทดสอบ ส่วนที่ 3 (Edge Case: []) ===");
const emptyArray = [];
console.log("getNames([]):", getNames(emptyArray)); // []
console.log("getPassedStudents([]):", getPassedStudents(emptyArray)); // []
console.log("getTotalScore([]):", getTotalScore(emptyArray)); // 0
console.log("getAverageScore([]):", getAverageScore(emptyArray)); // 0
console.log("countByGrade([]):", countByGrade(emptyArray)); // {}
console.log("getTopStudent([]):", getTopStudent(emptyArray)); // null