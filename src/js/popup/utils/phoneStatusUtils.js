function composeSort(...fns) {
  return (a, b) => fns.reduce((v, f) => (v === 0? f(a, b): v), 0);
}

function sortById(a, b) {
  const idA = a['_id'];
  const idB = b['_id'];

  return (idA < idB)? -1: ((idA > idB)? 1: 0);
}

function sortByModel(a, b) {
  const modelA = a.model;
  const modelB = b.model;

  return (modelA < modelB)? -1: ((modelA > modelB)? 1: 0);
}

function sortByInStockSinceDesc(a, b) {
  const timeA = a.inStockSince;
  const timeB = b.inStockSince;

  return (timeA > timeB)? -1: ((timeA < timeB)? 1: 0);
}

export function buildOverview(phoneDb, monitorList, phoneStatus) {
  // Prepare detailed list of monitor phones
  let detailList = monitorList.reduce((accu, id) => {
    const info = phoneDb.findById(id);
    if (!info) {
      // Ignore phones that does not exist
      return accu;
    }
    // Merge phone info and status into single object
    accu.push(Object.assign({},
      info,
      phoneStatus[id]? phoneStatus[id]: {
        // use default value
        status: 0,
        inStockSince: 0
      }
    ));
    return accu;
  }, []);

  // Sorting
  detailList = detailList.sort(composeSort(
    sortByInStockSinceDesc,
    sortByModel,
    sortById
  ));

  // Group by phone model
  let overviewGroup = {};
  let overview = [];
  // Construct two things:
  // 1. A dictionary of model mapped to list of phone devices of the model
  // 2. An array of unique model's name, each name will be replaced by the
  //    corresponding list of phone devices at the end
  detailList.forEach((phone) => {
    if (!overviewGroup[phone.model]) {
      overview.push(phone.model);
      overviewGroup[phone.model] = [];
    }
    overviewGroup[phone.model].push(phone);
  });

  return overview.map((model) => overviewGroup[model]);
}