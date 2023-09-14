export const websiteURL = () => {
  console.log("process.env.WEBSITE_URL", process.env.DATABASE_URL);
  return process.env.WEBSITE_URL;
};
