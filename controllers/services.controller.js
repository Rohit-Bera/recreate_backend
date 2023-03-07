const HttpError = require("../middlewares/HttpError");
const placedService = require("../services/placeService.service");

// vistors
const getAllServices = async (request, response, next) => {
  const data = await placedService.getAllServiceApi();

  const { allServices, error } = data;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, allServices });
};

const searchByService = async (request, response, next) => {
  const searched = request.params.search;

  const reply = await placedService.searchbyServiceApi({ searched });

  const { isFoundService, isFoundLaunchedService, error } = reply;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, isFoundService, isFoundLaunchedService });
};

// admin
const placeService = async (request, response, next) => {
  const url = request.protocol + "://" + request.get("host");

  // const url = "https://recreate-backend-server.onrender.com";

  const { serviceName, launchedServiceName, launchedServiceDescription } =
    request.body;

  const images = request.files;

  const serviceImage =
    url + "/serviceImage/" + request.files.serviceImage[0].filename;

  const launchedServiceImage = [];

  const li = request.files.launchedServiceImage;

  li.forEach((item) => {
    launchedServiceImage.push(url + "/launchedServiceImage/" + item.filename);
  });

  const service = {
    serviceName,
    serviceImage,
  };

  const launchedService = {
    launchedServiceName,
    launchedServiceImage,
    launchedServiceDescription,
  };

  const reply = await placedService.placeServiceApi({
    service,
    launchedService,
  });

  const { error, publishedService } = reply;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, publishedService });
};

module.exports = {
  getAllServices,
  placeService,
  searchByService,
};
