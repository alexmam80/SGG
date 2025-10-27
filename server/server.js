const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const Database = require('better-sqlite3')
const nodemailer = require('nodemailer') // [EMAIL]
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000
const DATA_DIR = path.resolve(__dirname, process.env.DATA_DIR || 'data')

// Ensure data directory exists
fs.mkdirSync(DATA_DIR, { recursive: true })

// CORS configuration - handle both string and array origins
const corsOrigins = process.env.CORS_ORIGIN || 'http://localhost:5173'
const origins = typeof corsOrigins === 'string' ? corsOrigins.split(',').map(o => o.trim()) : corsOrigins
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// --- DB init ---
const dbPath = path.join(DATA_DIR, 'contacts.sqlite')
const db = new Database(dbPath)
db.pragma('journal_mode = WAL')

db.prepare(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
`).run()

db.prepare(`CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at)`).run()

// --- Utils ---
const csvPath = path.join(DATA_DIR, 'contacts.csv')
const xmlPath = path.join(DATA_DIR, 'contacts.xml')

function ensureCsvHeader() {
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, 'id,created_at,name,email,phone,message\n', 'utf8')
  }
}
function csvEscape(value) {
  if (value == null) return ''
  const str = String(value).replace(/\r?\n/g, ' ')
  if (/[",\r\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`
  return str
}
function xmlEscape(str) {
  if (str == null) return ''
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}
function buildXmlFromRows(rows) {
  const items = rows.map(row => `
  <entry>
    <id>${row.id}</id>
    <created_at>${xmlEscape(row.created_at)}</created_at>
    <name>${xmlEscape(row.name)}</name>
    <email>${xmlEscape(row.email)}</email>
    <phone>${xmlEscape(row.phone)}</phone>
    <message>${xmlEscape(row.message)}</message>
  </entry>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<submissions>${items}\n</submissions>\n`
}

// -------------------------- [EMAIL] Mailer setup --------------------------
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'alexmam80@gmail.com',
    pass: 'sfdc fqcr kykt vkrg',
  }
})

async function sendCopyEmail({ to, from, row }) {
  const subject = `Nouă solicitare de contact (#${row.id}) — ${row.name}`
  const plain = [
    `ID: ${row.id}`,
    `Data: ${row.created_at}`,
    `Nume: ${row.name}`,
    `Email: ${row.email}`,
    `Telefon: ${row.phone}`,
    `Mesaj: ${row.message}`,
  ].join('\n')

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 8px;color:#065f46">Smart Green Group — Contact</h2>
      <p style="margin:0 0 12px;color:#111827">Ai primit o nouă solicitare de contact:</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        <tr><td style="padding:6px 8px;background:#ecfdf5;width:140px">ID</td><td style="padding:6px 8px">${row.id}</td></tr>
        <tr><td style="padding:6px 8px;background:#ecfdf5">Data</td><td style="padding:6px 8px">${row.created_at}</td></tr>
        <tr><td style="padding:6px 8px;background:#ecfdf5">Nume</td><td style="padding:6px 8px">${xmlEscape(row.name)}</td></tr>
        <tr><td style="padding:6px 8px;background:#ecfdf5">Email</td><td style="padding:6px 8px">${xmlEscape(row.email)}</td></tr>
        <tr><td style="padding:6px 8px;background:#ecfdf5">Telefon</td><td style="padding:6px 8px">${xmlEscape(row.phone)}</td></tr>
        <tr><td style="padding:6px 8px;background:#ecfdf5;vertical-align:top">Mesaj</td><td style="padding:6px 8px;white-space:pre-wrap">${xmlEscape(row.message)}</td></tr>
      </table>
      <p style="margin-top:12px;color:#6b7280">— Sistem automat Smart Green Group</p>
    </div>
  `

  return transporter.sendMail({
    from,
    to,
    subject,
    text: plain,
    html
  })
}

// --- API Routes ---

// Submit new contact
app.post('/api/contact', async (req, res) => {
  try {
    const errors = validateContactData(req.body)
    if (errors.length > 0) {
      return res.status(400).json({ ok: false, error: 'Validation failed', details: errors })
    }

    const { name, email, phone, message } = req.body
    const stmt = db.prepare(`INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)`)

    const info = stmt.run(name.trim(), email.trim(), phone.trim(), message.trim())
    const newRow = db.prepare('SELECT * FROM contacts WHERE id = ?').get(info.lastInsertRowid)

    // Update CSV
    ensureCsvHeader()
    const csvLine = `${newRow.id},${csvEscape(newRow.created_at)},${csvEscape(newRow.name)},${csvEscape(newRow.email)},${csvEscape(newRow.phone)},${csvEscape(newRow.message)}\n`
    fs.appendFileSync(csvPath, csvLine, 'utf8')

    // Regenerate XML
    const allRows = db.prepare('SELECT * FROM contacts ORDER BY id ASC').all()
    fs.writeFileSync(xmlPath, buildXmlFromRows(allRows), 'utf8')

    // ---------------- [EMAIL] send copy (nu blochează succesul API) ----------------
    const TO = process.env.MAIL_TO_DEFAULT || 'alexmam80@gmail.com'
    const FROM = process.env.MAIL_FROM || `Smart Green Group <${process.env.SMTP_USER}>`

    // Încercăm să trimitem email; dacă pică, logăm și tot returnăm 200
    sendCopyEmail({ to: TO, from: FROM, row: newRow })
      .then(() => console.log(`✉️  Copie e-mail trimisă către ${TO} pentru contact #${newRow.id}`))
      .catch(err => console.error('Email copy failed:', err))

    res.json({ ok: true, id: info.lastInsertRowid, message: 'Contact submitted successfully' })

  } catch (error) {
    console.error('Error submitting contact:', error)
    res.status(500).json({ ok: false, error: 'Internal server error' })
  }
})

// Get contacts with pagination
app.get('/api/contact', (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10))
    const limit = Math.min(Math.max(1, parseInt(req.query.limit || '100', 10)), 1000)
    const offset = (page - 1) * limit

    const countStmt = db.prepare('SELECT COUNT(*) as total FROM contacts')
    const { total } = countStmt.get()

    const dataStmt = db.prepare(`
      SELECT * FROM contacts 
      ORDER BY created_at DESC, id DESC 
      LIMIT ? OFFSET ?
    `)
    const rows = dataStmt.all(limit, offset)

    res.json({
      ok: true,
      data: rows,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ ok: false, error: 'Internal server error' })
  }
})

// Export to CSV
app.get('/api/export/csv', (req, res) => {
  try {
    ensureCsvHeader()
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="contacts.csv"')
    if (fs.existsSync(csvPath)) fs.createReadStream(csvPath).pipe(res)
    else res.status(404).json({ ok: false, error: 'CSV file not found' })
  } catch (error) {
    console.error('Error exporting CSV:', error)
    res.status(500).json({ ok: false, error: 'Export failed' })
  }
})

// Export to XML
app.get('/api/export/xml', (req, res) => {
  try {
    if (!fs.existsSync(xmlPath)) {
      const rows = db.prepare('SELECT * FROM contacts ORDER BY id ASC').all()
      fs.writeFileSync(xmlPath, buildXmlFromRows(rows), 'utf8')
    }
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="contacts.xml"')
    fs.createReadStream(xmlPath).pipe(res)
  } catch (error) {
    console.error('Error exporting XML:', error)
    res.status(500).json({ ok: false, error: 'Export failed' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'healthy', timestamp: new Date().toISOString() })
})

// Validation
function validateContactData(data) {
  const { name, email, phone, message } = data || {}
  const errors = []
  if (!name || typeof name !== 'string' || name.trim().length === 0) errors.push('Name is required')
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.push('Valid email is required')
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) errors.push('Phone is required')
  if (!message || typeof message !== 'string' || message.trim().length === 0) errors.push('Message is required')
  return errors
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ ok: false, error: 'Internal server error' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Endpoint not found' })
})

// Graceful shutdown
process.on('SIGINT', () => { console.log('Shutting down gracefully...'); if (db) db.close(); process.exit(0) })
process.on('SIGTERM', () => { console.log('Shutting down gracefully...'); if (db) db.close(); process.exit(0) })

app.listen(PORT, () => {
  console.log(`🚀 API ready → http://localhost:${PORT}`)
  console.log(`📁 Data directory: ${DATA_DIR}`)
  console.log(`🗃️  Database: ${dbPath}`)
})
