'use strict'

exports.list = async function (req, res, db) {
  try {
    const query = req.query
    const orderByClause =
      query && query.orderBy
        ? {
            field: query.orderBy,
            desc: query.desc,
          }
        : null
    var clauses = {}
    if (orderByClause) {
      clauses.orderByClause = orderByClause
    }
    if (query.search) {
      clauses.search = query.search
    }
    if (query.limit) {
      clauses.limit = query.limit
    }

    db.list('users', clauses, userList => {
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3003');
      res.json({ users: userList })
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

exports.createNewUser = async function (req, res, db) {
  try {
    const body = req.body
    db.insertOne('users', body, response => {
      res.json(response)
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

exports.fetchUser = function (req, res, db) {
  db.getOne('users', req.params.userId, data => {
    res.json({ ...data })
  })
}

exports.updateUser = function (req, res, db) {
  const body = req.body
  const userId = req.params.userId
  var modifiedData = body
  delete modifiedData.id
  delete modifiedData._id

  db.updateOne('users', userId, modifiedData, function (err, data) {
    if (err) {
      return res.status(500).send(err)
    }
    res.json(data)
  })
}

exports.deleteUser = function (req, res, db) {
  const userId = req.params.userId

  db.deleteOne('users', userId, function (err, data) {
    if (err) {
      console.log('error')
      return res.status(500).send(err)
    }
    console.log('The user has been deleted!')
    res.json({ success: true })
  })
}
