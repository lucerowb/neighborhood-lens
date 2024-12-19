import { apiHandler } from "@/helpers/api-handler";
import { dr_hook } from "@/helpers/data_repo";

export const PROPERTIES_IDS = [
  "7f9487edad7d0f3f1d1b0d6e65f5375e",
  "e5d14b3cd9cc92be11ae6aecc8e1843e",
  "dbc74ffe0223d31fa189df377ab7e58c",
  "1095253908",
  "39a05f577077f2f45fffbddfca4318c0",
  "d7b0b45b40ea8746b68dfdf982ed36fa",
  "5faa65b3ae34c6615f5420f2522656e4",
  "052543df0005553a8f25cc503adbd89f",
  "7a96fe68738d9408d63582e962fbc062",
  "15e0156eff5c593d423473b0d661918d",
];

export const GET = apiHandler(async () => {
  const properties = await dr_hook.getPropertiesById(PROPERTIES_IDS);
  return Response.json(properties);
});
