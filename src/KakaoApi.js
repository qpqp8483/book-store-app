import axios from "axios";

const KakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com", // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: "KakaoAK 80f0cb10ac9de791b1464802c2ff8325",
  },
});

export const bookSearch = (params) => {
  return KakaoApi.get("/v3/search/book", { params });
};
export default KakaoApi;
