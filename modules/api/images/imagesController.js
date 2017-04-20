const imagesModel = require('./imagesModel');

var addImage = (data) => {
  return imagesModel.create(data);
}

var fetchImageCollection = () => {
  return imagesModel.find({});
}

var fetchImageCollectionById = (id) => {
  return imagesModel.find({_id: id});
}

var fetchImageCollectionByName = (name) => {
  return imagesModel.find({name: name});
}

var updateImageCollectionById = (id, newData) => {
  //imagesModel.update({_id: {$gt: 1}}, {$inc:{_id:-1}})
  return imagesModel.update({_id: id}, newData);
}

var updateImageCollectionByName = (name, newData) => {
  return imagesModel.updateMany({name: name}, newData);
}

var deleteImageCollectionById = (id) => {
  return imagesModel.deleteOne({_id: id});
}

var deleteImageCollectionByName = (name) => {
  return imagesModel.deleteMany({name: name});
}

module.exports = {
  fetchImageCollection,
  fetchImageCollectionById,
  fetchImageCollectionByName,
  updateImageCollectionById,
  updateImageCollectionByName,
  deleteImageCollectionById,
  addImage,
}
