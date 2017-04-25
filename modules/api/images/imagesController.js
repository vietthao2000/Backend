const imagesModel = require('./imagesModel');

var process = (work) => {
  try {
    return work.then((status) => {
      if (status.ok && status.n && status.nModified) {
        if (status.ok) return `Query success, ${status.n} row(s) found, ${status.nModified} row(s) affected`;
        else return `Query failed`;      
      }
      return status;
    });
  }
  catch (e) {
    console.log(e);
    return processError();
  }
}

var processError = () => {
  return new Promise(cb => cb("An error occured"));
}

var addImage = (data) => {
  return process(imagesModel.create(data));
}

var fetchImageCollection = () => {
  return process(imagesModel.find({}));
}

var fetchImageCollectionById = (id) => {
  return process(imagesModel.find({_id: id}));
}

var fetchImageCollectionByName = (name) => {
  return process(imagesModel.find({name: name}));
}

var updateImageCollectionById = (id, newData) => {
  //imagesModel.update({_id: {$gt: 1}}, {$inc:{_id:-1}})
  return process(imagesModel.update({_id: id}, newData));
}

var updateImageCollectionByName = (name, newData) => {
  return process(imagesModel.updateMany({name: name}, newData));
}

var deleteImageCollectionById = (id) => {
  return process(imagesModel.deleteOne({_id: id}));
}

var deleteImageCollectionByName = (name) => {
  return process(imagesModel.deleteMany({name: name}));
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
