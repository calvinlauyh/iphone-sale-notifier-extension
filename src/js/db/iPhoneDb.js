const iPhoneData = require('./iphone.json');

// TODO: Refactor into a more ORM-like class
/**
 * Find all iPhone data in list
 * @return {Object[]} All iPhone data
 */
function getAll() {
  return iPhoneData;
}

/**
 * Find the iPhone by id
 * @param  {String} id Id of the iPhone
 * @return {Object}    The iPhone specified by the id, undefined if not found
 */
function findById(id) {
  return iPhoneData.find(phone => (phone['_id'] === id));
}

/**
 * Group the iPhone list provided by the model
 * @param {Object[]} phoneList List of iPhone data returned from get* function
 * @return {Object[][]}        List of models, within each a list of phones
 */
function groupByModel(phoneList) {
  let modelDict = {};
  let modelList = [];
  // Construct two things:
  // 1. A dictionary of model mapped to list of phone devices of the model
  // 2. An array of unique model's name, each name will be replaced by the
  //    corresponding list of phone devices at the end
  phoneList.forEach((phone) => {
    if (!modelDict[phone.model]) {
      modelList.push(phone.model);
      modelDict[phone.model] = [];
    }
    modelDict[phone.model].push(phone);
  });

  return modelList.map((model) => modelDict[model]);
}

export default {
  getAll,
  findById,
  groupByModel
};
