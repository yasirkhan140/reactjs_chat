import { getrefreshToken } from "../api";

const refreshToken = async () => {
  const response = await getrefreshToken();
  console.log(response);
};
export default refreshToken;
