const Worker = require("../models/workerModel");
const Verification = require("../models/professionalVerificationModel");
const HttpError = require("../middlewares/HttpError");
// const WorkersTime = require("../models/workersTimeModel");

const uploadDocServices = async ({ wid, pi, vd1, vd2, wi }) => {
  try {
    const worker = wid;
    const profileImage = pi;
    const verificationDocument1 = vd1;
    const verificationDocument2 = vd2;
    const workImages = wi;

    const isFound = await Verification.findOne({ worker });

    if (isFound) {
      const error = new HttpError(
        404,
        "you have already uploaded the documents"
      );

      return { error };
    }

    const documents = {
      worker,
      profileImage,
      verificationDocument1,
      verificationDocument2,
      workImages,
    };

    const docUploaded = new Verification(documents);
    await docUploaded.save();

    return { docUploaded };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

const getDocumentService = async () => {
  try {
    const foundWorkerDoc = await Verification.find();

    if (!foundWorkerDoc) {
      const error = new HttpError(404, "worker document not found");
      return { error };
    }

    return { foundWorkerDoc };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

const editDocumenstServices = async ({ _id, body }) => {
  try {
    const [pi, vd1, vd2, wi] = body;

    let edited = {};

    if (pi) {
      edited.profileImage = pi;
    }
    if (vd1) {
      edited.verificationDocument1 = vd1;
    }
    if (vd2) {
      edited.verificationDocument2 = vd2;
    }
    if (wi) {
      edited.workImages = wi;
    }

    console.log("edited: ", edited);

    const docUpdated = await Verification.findByIdAndUpdate(
      { _id },
      { $set: edited },
      { new: true }
    );

    if (!docUpdated) {
      const error = new HttpError(404, "document not found!");

      return { error };
    }

    return { docUpdated };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

const getMyDocumentServices = async ({ _id }) => {
  try {
    const findMyDoc = await Verification.findOne({ worker: _id });

    if (!findMyDoc) {
      const error = new HttpError(
        404,
        "your document was not found! , Please check you have uploaded your document"
      );

      return { error };
    }

    return { findMyDoc };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const verifyDocServices = async ({ _id }) => {
  try {
    const changes = { verificationStatus: true };

    const verified = await Verification.findByIdAndUpdate(
      { _id },
      { $set: changes },
      { new: true }
    );

    if (!verified) {
      const error = new HttpError(404, "worker not found");

      return { error };
    }

    return { verified };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

module.exports = {
  uploadDocServices,
  editDocumenstServices,
  getDocumentService,
  getMyDocumentServices,
  verifyDocServices,
};
