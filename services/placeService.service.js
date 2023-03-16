const Service = require("../models/serviceModel");
const HttpError = require("../middlewares/HttpError");

const getAllServiceApi = async () => {
  try {
    const allServices = await Service.find();

    if (!allServices) {
      const error = new HttpError(404, "Services not found!");

      return { error };
    }

    return { allServices };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

const searchbyServiceApi = async ({ searched }) => {
  console.log("searched: ", searched);

  try {
    const searchService = new RegExp(searched, "i");

    const isFoundService = await Service.find({ searchService });

    const isFoundLaunchedService = await Service.find({
      "launchedService.launchedServiceName": searchService,
    });

    if (!isFoundService && !isFoundLaunchedService) {
      const error = new HttpError(
        404,
        "Service you are searching for , was not found!"
      );

      return { error };
    }

    return { isFoundService, isFoundLaunchedService };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const placeServiceApi = async (data) => {
  const { service, launchedService } = data;
  console.log("launchedService: ", launchedService);
  console.log("service: ", service);

  try {
    if (launchedService) {
      const { launchedServiceName } = launchedService;
      console.log("launchedServiceName: ", launchedServiceName);

      const serviceFound = await Service.findOne({
        "launchedService.launchedServiceName": launchedServiceName,
      });

      if (serviceFound) {
        const error = new HttpError(
          404,
          "You cannot upload same service again!"
        );
        return { error };
      }
    }

    if (service && launchedService) {
      const newService = { service, launchedService };

      const publishedService = new Service(newService);
      await publishedService.save();

      return { publishedService };
    } else if (launchedService) {
      const newService = { launchedService };

      const publishedService = new Service(newService);
      await publishedService.save();

      return { publishedService };
    }
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

module.exports = {
  getAllServiceApi,
  searchbyServiceApi,
  placeServiceApi,
};
