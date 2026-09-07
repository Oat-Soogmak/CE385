// Ex1-ระบบตรวจทะเบียน
const students = [
  { id: "1933", name: "Wanawut", major: "CE", score: 85 },
  { id: "1934", name: "Suriya", major: "IT", score: 90 },
  { id: "1935", name: "Ratchaporn", major: "SE", score: 78 },
  { id: "1936", name: "Piphat", major: "CS", score: 92 }
];

function fetchStudentById(id, callback) {
  if (typeof id !== "string" || id.trim() === "") {
    callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    return;
  }

  setTimeout(() => {
    const student = students.find((s) => s.id === id);
    if (!student) {
      callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      return;
    }

    callback(null, { ...student });
  }, 300);
}

fetchStudentById("1933", (err, student) => {
  if (err) {
    console.error("กรณี ก Error:", err.message);
    return;
  }
  console.log("กรณี ก Success:", student.name);
});


fetchStudentById("9999", (err, student) => {
  if (err) {
    console.error("กรณี ข Error:", err.message);
    return;
  }
  console.log("กรณี ข Success:", student.name);
});

fetchStudentById(42, (err, student) => {
  if (err) {
    console.error("กรณี ค Error:", err.message);
    return;
  }
  console.log("กรณี ค Success:", student.name);
});
