import mainApi from "../apis/mainApi";
import { ERROR, SUCCESS } from "../shared/Constants";

const convertTime = (time: string) => {
  const timeSplit = time.split(":");
  const hour = Number(timeSplit[0]);
  const minute = Number(timeSplit[1]);
  return hour * 60 + minute;
};

export const isValidTime = (withTime: string, expireTime: string) => {
  const currentTime = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(11, 16);
  const convertCurrentTime = convertTime(currentTime);
  const convertWithTime = convertTime(withTime);
  const convertExpireTime = convertTime(expireTime);
  if (convertCurrentTime >= convertWithTime) {
    alert(`${ERROR.CREATE.EARLYWITHTIME} ${currentTime}`);
    return false;
  }
  if (convertWithTime <= convertExpireTime) {
    alert(`${ERROR.CREATE.LATEEXPIRETIME}`);
    return false;
  }
  if (convertCurrentTime >= convertExpireTime) {
    alert(`${ERROR.CREATE.EARLYEXPIRETIME}`);
    return false;
  }
  return true;
};

export const deleteWith = (withId: string) => {
  mainApi
    .delete(`/recruitments/${withId}`, {})
    .then((res) => {
      alert(SUCCESS.DELETEWITH);
    })
    .catch((error) => {
      console.log(error);
    });
};
