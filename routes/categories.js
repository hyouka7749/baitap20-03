var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category')

let { check_authentication, check_authorization } = require('../utils/check_auth');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  

  let categories = await categoryModel.find({});

  res.status(200).send({
    success:true,
    data:categories
  });
});
router.get('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categoryModel.findById(id);
    res.status(200).send({
      success:true,
      data:category
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:"khong co id phu hop"
    });
  }
});

router.post('/', check_authentication, check_authorization(['mod']), async function(req, res) {
  try {
    let newCategory = new categoryModel({
      name: req.body.name,
    });
    await newCategory.save();
    res.status(200).send({
      success: true,
      data: newCategory
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

router.put('/:id', check_authentication, check_authorization(['mod']), async function(req, res) {
  try {
    let updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.status(200).send({
      success: true,
      data: updatedCategory
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

router.delete('/:id', check_authentication, check_authorization(['admin']), async function(req, res) {
  try {
    let deletedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    res.status(200).send({
      success: true,
      data: deletedCategory
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;