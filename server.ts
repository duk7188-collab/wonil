import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("wonil.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    imageUrl TEXT,
    linkUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed initial data if empty
const postCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
console.log(`Current post count: ${postCount.count}`);
if (postCount.count === 0) {
  console.log("Seeding initial data...");
  const insertPost = db.prepare("INSERT INTO posts (title, category, description, imageUrl, linkUrl) VALUES (?, ?, ?, ?, ?)");
  insertPost.run("이중 바닥재 부품 제조", "제품소개", "이중바닥재(Access Floor) 시스템의 핵심 부품을 전문적으로 생산", "https://www.accessfloorstore.com/upload/20190531/6369492138484888663112118.png", null);
  insertPost.run("클린룸 ·AI 데이터센터·반도체 산업", "시공사례", "삼성전자 우면 서울R&D캠퍼스, 송도 포스코 타워, 신한울 원자력 발전소, 세종시 종합 정부 청사 등 다수 시공", "https://santatechnology.com/images/products/catalog/AAAAAA/Raise%20floors%20installation.jpg", "https://www.naver.com");
  insertPost.run("설계·시공·유지관리", "기술자료", "액세스 플로어 설계 및 구조 컨설팅, 시공 및 설치, 유지관리 및 리모델링", "https://www.mistershademe.com/wp-content/uploads/2020/03/Raised-Floor-1.jpg", null);
  console.log("Seeding complete.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY createdAt DESC").all();
    res.json(posts);
  });

  app.post("/api/posts/seed", (req, res) => {
    const postCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
    if (postCount.count === 0) {
      const insertPost = db.prepare("INSERT INTO posts (title, category, description, imageUrl, linkUrl) VALUES (?, ?, ?, ?, ?)");
      insertPost.run("이중 바닥재 부품 제조", "제품소개", "이중바닥재(Access Floor) 시스템의 핵심 부품을 전문적으로 생산", "https://www.accessfloorstore.com/upload/20190531/6369492138484888663112118.png", null);
      insertPost.run("클린룸 ·AI 데이터센터·반도체 산업", "시공사례", "삼성전자 우면 서울R&D캠퍼스, 송도 포스코 타워, 신한울 원자력 발전소, 세종시 종합 정부 청사 등 다수 시공", "https://santatechnology.com/images/products/catalog/AAAAAA/Raise%20floors%20installation.jpg", "https://www.naver.com");
      insertPost.run("설계·시공·유지관리", "기술자료", "액세스 플로어 설계 및 구조 컨설팅, 시공 및 설치, 유지관리 및 리모델링", "https://www.mistershademe.com/wp-content/uploads/2020/03/Raised-Floor-1.jpg", null);
      res.json({ success: true, message: "Initial data seeded" });
    } else {
      res.status(400).json({ success: false, message: "Database already has data" });
    }
  });

  app.post("/api/posts", (req, res) => {
    const { title, category, description, imageUrl, linkUrl } = req.body;
    const result = db.prepare("INSERT INTO posts (title, category, description, imageUrl, linkUrl) VALUES (?, ?, ?, ?, ?)").run(title, category, description, imageUrl, linkUrl);
    res.json({ id: result.lastInsertRowid });
  });

  app.delete("/api/posts/:id", (req, res) => {
    db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsMap = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsMap);
  });

  app.post("/api/settings", (req, res) => {
    const { key, value } = req.body;
    db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(key, value);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
