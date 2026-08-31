// Ex1-ฟังก์ชันคำนวณคะแนน
// ส่วนที่ 1 ฟังก์ชันคำนวณคะแนน
// ตราวจสอบว่าเป็นตัวเลขในช่วง 0-100 ไหม
const isValidScore = (score) => 
  typeof score === 'number' && score >= 0 && score <= 100;
// ตารางเกณฑ์คะแนนสำหรับตัดเกรด
const Grade_Thresholds = [
    {min: 80, grade: 'A'},
    {min: 75, grade: 'B+'},
    {min: 70, grade: 'B'},
    {min: 65, grade: 'C+'},
    {min: 60, grade: 'C'},
    {min: 55, grade: 'D+'},
    {min: 50, grade: 'D'},
    {min: 0, grade: 'F'},
];
// ฟังก์ชันแปลงคะแนนเป็นเกรด แล้วตรวจสอบว่าคะแนนถูกไหม ถ้าไม่ถูกให้คืนค่าตัว "Invalid Score"
function toGrade(score) {
    if (!isValidScore(score)){
        return 'Invalid Score';
    }
    // ตัวคะแนนของนักศึกษาสูงกว่าหรือเท่ากับ min แล้ว้ให้แสดงเป็น "F"
    const match = Grade_Thresholds.find(rule => score >= rule.min);
    return match ? match.grade : 'F';
}
// ฟังก์ชันคำนวณคะแนน Workshop
const calculateWorkshopScore = (raw, full = 60, weight = 20) => (raw / full) * weight;

// ฟังก์ชันคำนวณคะแนนรวมทุกส่วน
function calculateTotal(workshop, attendance, project, midterm, final){
    return workshop + attendance + project + midterm + final;
}

// ส่วนที่ 2 ทดสอบสร้างข้อมูลนักศึกษา 3 คน
// ข้อมูลของนักศึกษา 3 คน
const students = [
  { name: 'Somchai', rawWorkshop: 48, attendance: 10, project: 28, midterm: 18, final: 25 },
  { name: 'Somsri',   rawWorkshop: 54, attendance: 8,  project: 25, midterm: 15, final: 20 },
  { name: 'Somsak',  rawWorkshop: 30, attendance: 5,  project: 20, midterm: 10, final: 12 }
];
// แปลงข้อมูลนักศึกษาแต่ละคนให้อยู่ในรูปแบบสรุปผลเพื่อนำไปแสดงตาราง
const summaryTable = students.map(student => {
  const workshopScore = calculateWorkshopScore(student.rawWorkshop);

// คำนวณคะแนนรวม
  const totalScore = calculateTotal(
    workshopScore,
    student.attendance,
    student.project,
    student.midterm,
    student.final
  );

// ส่งคืน Object ข้อมูลที่จะใช้นำไปแสดงผล
  return {
    Name: student.name,
    'Workshop (Scaled)': workshopScore,
    Attendance: student.attendance,
    Project: student.project,
    Midterm: student.midterm,
    Final: student.final,
    'Total Score': totalScore,
    Grade: toGrade(totalScore)
  };
});
console.table(summaryTable);

// ส่วนที่ 3 พิสูจน์ Default Parameters
const testDefault = calculateWorkshopScore(48); //<-- ไม่ส่ง full และ weight -> ใช้ 60 และ 20
const testExplicit = calculateWorkshopScore(48, 60, 20); //<-- ส่งครบทุกตัวแปร
const testUndefined = calculateWorkshopScore(48, undefined, 25); //<-- ส่ง undefined ในตำแหน่ง full

console.log('calculateWorkshopScore(48):', testDefault);
console.log('calculateWorkshopScore(48, 60, 20):', testExplicit);
console.log('calculateWorkshopScore(48, undefined, 25):', testUndefined);