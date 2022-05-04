import { $host } from ".";

export const login = async (email, password) => {
  const { data } = await $host.get('users', {
    params: {
      email,
      password
    }
  });
  return data;
}

export const registration = async (user) => {
  const { data } = await $host.post('users', user);
  return data;
}