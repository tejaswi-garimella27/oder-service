import { EnvVariables, NODE_ENV } from "../types/env";

const getNodeEnv = (): NODE_ENV => {
  switch (process.env.NODE_ENV?.toLowerCase()) {
    case "dev":
      return NODE_ENV.DEV;
    default:
      return NODE_ENV.DEV;
  }
};

export const ENV_VARIABLE: EnvVariables = {
  NODE_ENV: getNodeEnv(),
  PORT: parseInt(process.env.PORT || "4001"),
  PHARMACY_BASE_URL:
    process.env.PHARMACY_BASE_URL ||
    "http://pharmacy-mock-service-env.eba-xzj3bbnm.us-east-1.elasticbeanstalk.com",
};
