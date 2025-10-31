import Cookies from "js-cookie";
import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
  TOKEN_NAME,
} from "../constants";

export function setTokenCookie(tokenName: `${TOKEN_NAME}`, value: string) {
  const currSeconds: number = new Date().getSeconds();
  const secondsOffset: number =
    tokenName === TOKEN_NAME.ACCESS_TOKEN
      ? ACCESS_TOKEN_EXPIRES
      : REFRESH_TOKEN_EXPIRES;
  const tokenExpires = new Date();
  tokenExpires.setSeconds(currSeconds + secondsOffset);

  return Cookies.set(tokenName, value, {
    expires: tokenExpires,
    sameSite: "lax",
  });
}

export function setCookie(name: string, value: string) {
  return Cookies.set(name, value, {
    expires: 36500,
    sameSite: "lax",
  });
}

export function getCookie(name: string) {
  return Cookies.get(name);
}

export function removeCookie(name: string) {
  return Cookies.remove(name);
}
