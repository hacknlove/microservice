import test from 'ava'
import mongo from '../src/mongo'

test('import ok', t => {
  t.plan(2)
  mongo.connect = t.pass
  require('../src/index')
  t.pass()
})
