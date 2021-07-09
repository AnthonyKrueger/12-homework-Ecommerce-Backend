const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{model: Product}]
  })
  .then((tags) => {
    res.status(200).json(tags)
  })
  .catch ((err) => {
    res.status(400).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{model: Product}]
  })
  .then((tag) => {
    if(tag) {
      res.status(200).json(tag)
    }
    else {
      res.status(404).json("Tag Not Found")
    }
  })
  .catch((err) => {
    res.status(400),json(err)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {
    res.status(200).json(tag)
  })
  .catch((err) => {
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((updated) => {
    if(updated[0]) {
      res.status(200).json("Tag Updated")
    }
    else {
      res.status(404).json("Nothing To Update")
    }
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((destroyed) => {
      return ProductTag.findAll({ where: { tag_id: req.params.id } })
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      return ProductTag.destroy({ where: { id: productTagIds } })
    })
    .then((updatedTags) => {
      res.status(200).json(updatedTags)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
});

module.exports = router;
