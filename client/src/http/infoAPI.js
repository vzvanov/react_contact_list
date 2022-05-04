import { $host } from ".";

export const INFO_ROUTE = 'info';

export const getInfo = async (getParams) => {
  const { data } = await $host.get(INFO_ROUTE, getParams);
  return data;
}

export const createInfo = async (info) => {
  const { data } = await $host.post(INFO_ROUTE, info);
  return data;
}

export const replaceInfo = async (id, info) => {
  const { data } = await $host.put(INFO_ROUTE + '/' + id, info);
  return data;
}

export const deleteInfo = async (id) => {
  const { data } = await $host.delete(INFO_ROUTE + '/' + id);
  return data;
}