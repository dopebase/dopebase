import { prisma } from "../../core/db/prisma";

export const websiteURL = async () => {
  const settings = await prisma.settings.findFirst({
    where: {
      name: "websiteURL",
    },
  });
  return settings?.value;
};
