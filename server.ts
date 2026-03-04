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
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed initial data if empty
const postCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
if (postCount.count === 0) {
  const insertPost = db.prepare("INSERT INTO posts (title, category, description, imageUrl) VALUES (?, ?, ?, ?)");
  insertPost.run("고강도 알루미늄 다이캐스팅 페데스탈", "제품소개", "정밀한 가공과 고강도 설계를 통해 안정적인 하중 지지력을 제공합니다.", "https://picsum.photos/seed/wonil1/800/600");
  insertPost.run("친환경 스틸 판넬 시스템", "시공사례", "재활용 가능한 소재를 사용한 친환경 이중바닥재 솔루션입니다.", "https://picsum.photos/seed/wonil2/800/600");
  insertPost.run("스마트 오피스 통합 배선 솔루션", "기술자료", "복잡한 배선을 깔끔하게 정리하고 유지보수가 용이한 시스템입니다.", "https://picsum.photos/seed/wonil3/800/600");
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

  app.post("/api/posts", (req, res) => {
    const { title, category, description, imageUrl } = req.body;
    const result = db.prepare("INSERT INTO posts (title, category, description, imageUrl) VALUES (?, ?, ?, ?)").run(title, category, description, imageUrl);
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
