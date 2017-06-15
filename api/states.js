//connecting to query and validates users actual search

const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validState(state) {
  const hasName = typeof state.name =='string' && state.name.trim() !='';
  const hasCapital = typeof state.capital =='string' && state.capital.trim() !='';
  console.log('stuff');
  return hasName && hasCapital;
}

router.get('/', (req, res) => {
  queries.getAll().then(states => {
    res.json(states);
  });
});

router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(state => {
    if(state) {
      res.json(state);
    } else {
      next();
    }
  });
});

router.post('/', (req, res, next) => {        //checking queries file for req.body
  if(validState(req.body)) {
    queries.create(req.body).then(states => {
      res.json(states[0]);                  //[0] gives us the most recent change from an array
    });
  } else {
    next(new Error('Invalid state'));
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if(validState(req.body)) {
    queries.update(req.params.id, req.body).then(states => {
      res.json(states[0]);
    });
  } else {
    next(new Error('Invalid state'));
  }
});

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted:true
    });
  });
});

module.exports = router;
