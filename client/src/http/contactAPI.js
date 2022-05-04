import { $host } from ".";

export const CONTACTS_ROUTE = 'contacts';

export const getContacts = async (getParams) => {
  const { data } = await $host.get(CONTACTS_ROUTE, getParams);
  return data;
}

export const createContact = async (contact) => {
  const { data } = await $host.post(CONTACTS_ROUTE, contact);
  return data;
}

export const replaceContact = async (id, contact) => {
  const { data } = await $host.put(CONTACTS_ROUTE + '/' + id, contact);
  return data;
}

export const deleteContact = async (id) => {
  const { data } = await $host.delete(CONTACTS_ROUTE + '/' + id);
  return data;
}