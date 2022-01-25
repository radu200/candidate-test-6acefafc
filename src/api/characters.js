import request from "./";

export const getCharacters = async () => {
  try {
    const url = `/characters.json`;
    const res = await request.get(url);
    return res;
  } catch (err) {
    return err;
  }
};
