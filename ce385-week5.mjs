import express from 'express';

const app = express();
app.use(express.json());

// Route หน้าแรก
app.get('/', (req, res) => {
  res.send("สวัสดี Express!");
});

// ข้อที่ 1
// แก้เป็นตัวพิมพ์เล็ก todos เพื่อความเป็นมาตรฐาน
const ToDos = [
  { id: "1", title: "อ่านสไลด์สัปดาห์ที่ 5", done: true, priority: "high" },
  { id: "2", title: "ติดตั้ง Express", done: true, priority: "high" },
  { id: "3", title: "ทำ Workshop 4", done: false, priority: "normal" },
  { id: "4", title: "เตรียมสอบกลางภาค", done: false, priority: "low" }
];

const PRIORITIES = ["high", "normal", "low"];

function validateTodo(req, res, next) {
  const { title, priority } = req.body ?? {};

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "ต้องมี title เป็นข้อความ" });
  }

  if (priority !== undefined && !PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: "priority ไม่ถูกต้อง" });
  }

  return next();
}

// ข้อที่ 2 
const todoRouter = express.Router();

todoRouter.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ดึงรายการทั้งหมด (แก้ TODOS -> todos)
todoRouter.get("/", (req, res) => { 
  res.json(ToDos.map((t) => ({ ...t })));
});

// ดึงตาม id (แก้ ToDos -> todos)
todoRouter.get("/:id", (req, res) => {
  const todo = ToDos.find((t) => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` });
  }
  return res.json({ ...todo });
});


todoRouter.post("/", validateTodo, (req, res) => {
  const created = {
    id: String(ToDos.length + 1),
    title: req.body.title.trim(),
    done: false,
    priority: req.body.priority ?? "normal",
  };

  ToDos.push(created);
  res.status(201).json({ ...created });
});

app.use("/api/v1/todos", todoRouter);

// รัน Server
app.listen(3000, () => {
  console.log("เซิร์ฟเวอร์ทำงานที่ http://localhost:3000");
});