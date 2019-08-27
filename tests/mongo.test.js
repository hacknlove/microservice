import test from 'ava'
const { connect } = require('../src/mongo')

test('connect es una funcion', t => {
  t.is(typeof connect, 'function')
})

test('connect devuelve un proxy', t => {
  const proxy = connect()
  t.is(typeof proxy, 'object')
})

test('client es una promesa', t => {
  const proxy = connect()
  t.is(typeof proxy.client.then, 'function')
})

test.only('cuando la promesa se cumple, se puede acceder a la base de datos con db', async t => {
  const proxy = connect()
  await proxy.client
  t.truthy(proxy.db)
  t.is(typeof proxy.db.collection, 'function')
})

test('cuando la promesa se cumple, se pueden llamar a las colecciones', async t => {
  const proxy = connect()
  await proxy.client
  const foo = proxy.foo
  t.is(typeof foo, 'object')
  t.is(typeof foo.insertOne, 'function')
  t.is(typeof foo.updateOne, 'function')
})
