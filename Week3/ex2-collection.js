// Ex2-ทะเบียนนักศึกษา
// ส่วนที่ 1 ข้อมูลตั้งต้น
const students = [
  { id: "6501", name: "สมชาย", major: "CE", score: 78, contact: { email: "somchai@dpu.ac.th", phone: "081-111-1111" } },
  { id: "6502", name: "สมหญิง", major: "CE", score: 91, contact: { email: "somying@dpu.ac.th", phone: "082-222-2222" } },
  { id: "6503", name: "มานี", major: "IT", score: 45, contact: { email: "manee@dpu.ac.th", phone: "083-333-3333" } },
  { id: "6504", name: "ปิติ", major: "IT", score: 66, contact: { email: "piti@dpu.ac.th", phone: "084-444-4444" } },
  { id: "6505", name: "ชูใจ", major: "CE", score: 82, contact: { email: "choojai@dpu.ac.th", phone: "085-555-5555" } },
  { id: "6506", name: "วีระ", major: "IT", score: 38, contact: { email: "weera@dpu.ac.th", phone: "086-666-6666" } }
];
// ส่วนที่ 2 ฟังก์ชันค้นหาข้อมูล
// คืนค่า undefined , array , ture ถ้าไม่พบข้อมูลนักศึกษา
const findById = (studentsList, id) => {
  return studentsList.find((s) => s.id === id);
};

const findByMajor = (studentsList, major) => {
  return studentsList.filter((s) => s.major === major);
};

const hasFailingStudent = (studentsList) => {
  return studentsList.some((s) => s.score < 50);
};


const getEmail = (studentsList, id) => {
  const student = findById(studentsList, id);
  return student?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
};

// ส่วนที่ 3 การทำงาน
console.log("=== 1. ทดสอบค้นหาข้อมูลตามปกติ ===");
console.log("findById 6501:", findById(students, "6501"));
console.log("findByMajor CE (จำนวน):", findByMajor(students, "CE").length);
console.log("hasFailingStudent:", hasFailingStudent(students));
console.log("getEmail 6501:", getEmail(students, "6501"));

console.log("\n=== 2. ทดสอบกรณีที่หาไม่พบ (id: 9999) ===");
console.log("findById 9999:", findById(students, "9999")); // ได้ undefined
console.log("getEmail 9999:", getEmail(students, "9999"));   // ได้ "ไม่พบข้อมูลติดต่อ" (ไม่ error)

console.log("\n=== 3. ทดสอบการเพิ่มนักศึกษาที่ไม่มี contact (ห้ามใช้ push) ===");
const newStudent = { id: "6507", name: "ชูเกียรติ", major: "CE", score: 70 }; // ไม่มี property contact

// เพิ่มนักศึกษาใหม่เข้า Array ด้วย Spread Operator ([...array])
const updatedStudents = [...students, newStudent];

console.log("จำนวนนักศึกษาเดิม:", students.length);        // 6 คนเท่าเดิม (ไม่กระทบต้นฉบับ)
console.log("จำนวนนักศึกษาใหม่:", updatedStudents.length); // 7 คน
console.log("getEmail 6507 (ไม่มี contact):", getEmail(updatedStudents, "6507")); // ได้ "ไม่พบข้อมูลติดต่อ"