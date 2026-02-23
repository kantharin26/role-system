import { Hono } from 'hono'

type Bindings = {
  mydb: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// ✅ CREATE
app.post('/roles', async (c) => {
  const { name } = await c.req.json()

  await c.env.mydb.prepare(
    "INSERT INTO roles (name) VALUES (?)"
  )
    .bind(name)
    .run()

  return c.json({ message: "Role created" })
})

// ✅ READ ALL
app.get('/roles', async (c) => {
  const { results } = await c.env.mydb.prepare(
    "SELECT * FROM roles"
  ).all()

  return c.json(results)
})

// ✅ READ ONE
app.get('/roles/:id', async (c) => {
  const id = c.req.param('id')

  const { results } = await c.env.mydb.prepare(
    "SELECT * FROM roles WHERE id = ?"
  )
    .bind(id)
    .all()

  return c.json(results[0] || { message: "Not found" })
})

// ✅ UPDATE
app.put('/roles/:id', async (c) => {
  const id = c.req.param('id')
  const { name } = await c.req.json()

  await c.env.mydb.prepare(
    "UPDATE roles SET name = ? WHERE id = ?"
  )
    .bind(name, id)
    .run()

  return c.json({ message: "Role updated" })
})

// ✅ DELETE
app.delete('/roles/:id', async (c) => {
  const id = c.req.param('id')

  await c.env.mydb.prepare(
    "DELETE FROM roles WHERE id = ?"
  )
    .bind(id)
    .run()

  return c.json({ message: "Role deleted" })
})

app.get('/', (c) => {
  return c.text('Role API is running 🚀')
})

export default app