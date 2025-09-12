import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000
const DATA_DIR = path.resolve(__dirname, process.env.DATA_DIR || 'data')

fs.mkdirSync(DATA_DIR, { recursive: true })

app.use(cors({ origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',') }))
app.use(express.json())

// --- DB init ---
const db = new Database(path.join(DATA_DIR, 'contacts.sqlite'))
db.prepare(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT NOT NULL,
    email   TEXT NOT NULL,
    phone   TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
`).run()

// utils
const csvPath = path.join(DATA_DIR, 'contacts.csv')
const xmlPath = path.join(DATA_DIR, 'contacts.xml')

function ensureCsvHeader() {
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, 'id,created_at,name,email,phone,message\n', 'utf8')
  }
}
function csvEscape(v) {
  const s = String(v ?? '').replace(/\r?\n/g, ' ')
  return /[",]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s
}
function buildXmlFromRows(rows) {
  const esc = (s) => String(s ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&apos;')
  const items = rows.map(r => `
  <entry>
    <id>${r.id}</id>
    <created_at>${esc(r.created_at)}</created_at>
    <name>${esc(r.name)}</name>
    <email>${esc(r.email)}</email>
    <phone>${esc(r.phone)}</phone>
    <message>${esc(r.message)}</message>
  </entry>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<submissions>${items}\n</submissions>\n`
}

// --- API ---
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, message } = req.body || {}
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ ok:false, error:'Missing fields' })
    }
    const stmt = db.prepare(
      'INSERT INTO contacts (name,email,phone,message) VALUES (?,?,?,?)'
    )
    const info = stmt.run(name.trim(), email.trim(), phone.trim(), message.trim())

    // append CSV
    ensureCsvHeader()
    const row = db.prepare('SELECT * FROM contacts WHERE id=?').get(info.lastInsertRowid)
    fs.appendFileSync(
      csvPath,
      `${row.id},${csvEscape(row.created_at)},${csvEscape(row.name)},${csvEscape(row.email)},${csvEscape(row.phone)},${csvEscape(row.message)}\n`,
      'utf8'
    )

    // regenerate XML snapshot
    const rows = db.prepare('SELECT * FROM contacts ORDER BY id ASC').all()
    fs.writeFileSync(xmlPath, buildXmlFromRows(rows), 'utf8')

    res.json({ ok:true, id: info.lastInsertRowid })
  } catch (e) {
    console.error(e)
    res.status(500).json({ ok:false, error:'Server error' })
  }
})

app.get('/api/contact', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '100', 10), 1000)
  const rows = db.prepare('SELECT * FROM contacts ORDER BY id DESC LIMIT ?').all(limit)
  res.json({ ok:true, rows })
})

app.get('/api/export/csv', (req, res) => {
  ensureCsvHeader()
  res.setHeader('Content-Type','text/csv; charset=utf-8')
  res.setHeader('Content-Disposition','attachment; filename="contacts.csv"')
  fs.createReadStream(csvPath).pipe(res)
})

app.get('/api/export/xml', (req, res) => {
  if (!fs.existsSync(xmlPath)) {
    const rows = db.prepare('SELECT * FROM contacts ORDER BY id ASC').all()
    fs.writeFileSync(xmlPath, buildXmlFromRows(rows), 'utf8')
  }
  res.setHeader('Content-Type','application/xml; charset=utf-8')
  res.setHeader('Content-Disposition','attachment; filename="contacts.xml"')
  fs.createReadStream(xmlPath).pipe(res)
})

app.listen(PORT, () => {
  console.log(`API ready → http://localhost:${PORT}`)
})
