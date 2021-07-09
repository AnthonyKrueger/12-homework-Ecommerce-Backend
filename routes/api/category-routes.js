const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{model: Product}]
  })
  .then((categories) => {
    res.status(200).json(categories)
  })
  .catch ((err) => {
    res.status(400).json(err);
  })
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{model: Product}]
  })
  .then((category) => {
    if(category) {
      res.status(200).json(category)
    }
    else {
      res.status(404).json("Category Not Found")
    }
  })
  .catch((err) => {
    res.status(400).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category)
  })
  .catch((err) => {
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((updated) => {
    if(updated[0]) {
      res.status(200).json("Category Updated")
    }
    else {
      res.status(404).json("Nothing To Update")
    }
  })
  .catch((err) => {
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((destroyed) => {
    if(destroyed) {
      res.status(200).json("Category Deleted")
    }
    else {
      res.status(404).json("Category Not Found")
    }
  })
  .catch(() => {
    res.status(400).json(err)
  })
});

module.exports = router;
