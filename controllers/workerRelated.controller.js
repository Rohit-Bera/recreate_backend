const workerRelatedServcies = require("../services/worker.service");

// worker documents apis
const uploadDocuments = async (request, response, next) => {
  //   console.log("worker controller :", request.worker);
  //   console.log("files :", request.files);

  const wid = request?.worker._id;
  const url = request.protocol + "://" + request.get("host");
  //   const url = (render link)

  const {
    profileImage,
    verificationDocument1,
    verificationDocument2,
    workImages,
  } = request.files;

  const pi = url + "/workerDocuments/" + profileImage[0].filename;
  const vd1 = url + "/workerDocuments/" + verificationDocument1[0].filename;
  const vd2 = url + "/workerDocuments/" + verificationDocument2[0].filename;
  const wi = [];

  workImages.forEach((item) => {
    wi.push(url + "/workerDocuments/" + item.filename);
  });

  console.log("pi: ", pi);
  console.log("vd1: ", vd1);
  console.log("vd2: ", vd2);
  console.log("wi: ", wi);

  const result = await workerRelatedServcies.uploadDocServices({
    wid,
    pi,
    vd1,
    vd2,
    wi,
  });

  const { docUploaded, error } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, docUploaded });
};

const editDocuments = async (request, response, next) => {
  //   console.log("worker controller :", request.worker);
  console.log("files :", request.files);

  const _id = request.params.id;
  const url = request.protocol + "://" + request.get("host");
  // const url = (render link)

  if (request.files) {
    const {
      profileImage,
      verificationDocument1,
      verificationDocument2,
      workImages,
    } = request.files;

    let pi = "";
    let vd1 = "";
    let vd2 = "";
    let wi = [];

    const body = [];

    if (profileImage) {
      pi = url + "/workerDocuments/" + profileImage[0].filename;

      body.push(pi);
    }
    if (verificationDocument1) {
      vd1 = url + "/workerDocuments/" + verificationDocument1[0].filename;

      body.push(vd1);
    }
    if (verificationDocument2) {
      vd2 = url + "/workerDocuments/" + verificationDocument2[0].filename;

      body.push(vd2);
    }

    if (workImages) {
      workImages.forEach((item) => {
        wi.push(url + "/workerDocuments/" + item.filename);
      });

      body.push(wi);
    }

    console.log("body: ", body);

    const result = await workerRelatedServcies.editDocumenstServices({
      _id,
      body,
    });

    const { docUpdated, error } = result;

    if (error) {
      response.json({ error });

      return next(error);
    }

    response.json({ status: 200, docUpdated });
  }
};

const getMyDocuments = async (request, response, next) => {
  const _id = request.params.id;

  const result = await workerRelatedServcies.getMyDocumentServices({ _id });

  const { findMyDoc, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: "200", findMyDoc });
};

// -----------------------------------------------------
// admin

const getWorkerDocs = async (request, response, next) => {
  const result = await workerRelatedServcies.getDocumentService();

  const { foundWorkerDoc, error } = result;
  console.log("foundWorkerDoc: ", foundWorkerDoc);

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, foundWorkerDoc });
};

const verifyDocs = async (request, respons, next) => {
  const _id = request.params.id;

  const result = await workerRelatedServcies.verifyDocServices({ _id });

  const { verified, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  respons.json({ status: 200, verified });
};

module.exports = {
  uploadDocuments,
  editDocuments,
  getMyDocuments,
  getWorkerDocs,
  verifyDocs,
};
