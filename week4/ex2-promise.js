// Ex2-ระบบตรวจทะเบียน
const students = [
  { id: "6501", name: "Wanawut", score: 85 },
  { id: "6502", name: "Suriya", score: 65 }
];

function calculateGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!/^\d{4}$/.test(id)) {
        return reject(new Error("รูปแบบ ID ไม่ถูกต้อง"));
      }

      const student = students.find((s) => s.id === id);
      if (!student) {
        return reject(new Error("ไม่พบข้อมูลนักเรียน"));
      }

      resolve({ ...student });
    }, 300);
  });
}

fetchStudentByIdAsync("6501")
  .then((data) => console.log("กรณีสำเร็จ:", data))
  .catch((err) => console.error("กรณีสำเร็จ Error:", err.message))
  .finally(() => console.log("จบการทำงาน (กรณีที่ 1)"));

fetchStudentByIdAsync("abc")
  .then((data) => console.log("กรณี ID ผิด:", data))
  .catch((err) => console.error("กรณี ID ผิด Error:", err.message))
  .finally(() => console.log("จบการทำงาน (กรณีที่ 2)"));

fetchStudentByIdAsync("9999")
  .then((data) => console.log("กรณีไม่พบข้อมูล:", data))
  .catch((err) => console.error("กรณีไม่พบข้อมูล Error:", err.message))
  .finally(() => console.log("จบการทำงาน (กรณีที่ 3)"));

fetchStudentByIdAsync("6501")
  .then((student) => {
    return {
      name: student.name,
      grade: calculateGrade(student.score)
    };
  })
  .then((result) => {
    return `นักเรียนชื่อ ${result.name} ได้เกรด ${result.grade}`;
  })
  .then((report) => {
    console.log("[รายงาน]", report);
    return report;
  })
  .catch((err) => console.error("Chain Error:", err.message));

// ส่วนที่ 4 (โบนัส +0.5): promisify(fn)
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
}

function multiplyByTwo(num, callback) {
  setTimeout(() => {
    if (typeof num !== "number") {
      return callback(new Error("ข้อมูลต้องเป็นตัวเลข"));
    }
    callback(null, num * 2);
  }, 200);
}

const multiplyByTwoAsync = promisify(multiplyByTwo);

multiplyByTwoAsync(10)
  .then((res) => console.log("Promisify Result:", res)) // ได้ 20
  .catch((err) => console.error("Promisify Error:", err.message));