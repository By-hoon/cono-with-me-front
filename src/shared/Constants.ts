export const headcounts: Array<number> = [1, 2, 3];

export const sortOptions: Array<string> = ["정렬 없음", "최신순 정렬"];

export const withsSize = {
  browser: 20,
  mobile: 10,
};

export const genres: Array<string> = [
  "BALLAD",
  "HIPHOP",
  "MUSICAL",
  "ROCK",
  // "모든 장르",
  // "발라드",
  // "댄스",
  // "랩/힙합",
  // "인디",
  // "R&B",
  // "락",
  // "트로트",
  // "팝송",
  // "그외",
];

export const HELP = {
  WITHTiME: "만날 시간을 입력해 주세요.",
  EXPIRETIME: "윗미를 언제까지 게시할지 입력해 주세요.",
};

export const SUCCESS = {
  CREATEWITH: "윗미가 생성되었습니다.",
  EDITWITH: "윗미가 수정되었습니다.",
  DELETEWITH: "윗미가 삭제되었습니다.",
};

export const ERROR = {
  CREATE: {
    EARLYWITHTIME: "윗미 시간은 현재 시간보다 빠르거나 같을 수 없습니다. 현재시간:",
    LATEEXPIRETIME: "만료 시간은 윗미 시간보다 늦거나 같을 수 없습니다.",
    EARLYEXPIRETIME: "만료 시간은 현재 시간보다 빠르거나 같을 수 없습니다.",
  },
};

export const maniadbBaseUrl = (keyword: string, sr: "artist" | "album" | "song") => {
  return `/maniadb/${keyword}/?sr=${sr}&display=10&key=example&v=0.5`;
};

export const xmlToJson = (xml: any) => {
  let obj = {} as any;

  if (xml.nodeType === 1 && xml.attributes.length > 0) {
    obj["@attributes"] = {};
    for (let j = 0; j < xml.attributes.length; j++) {
      let attribute = xml.attributes.item(j);
      obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
    }
  }
  if (xml.nodeType === 3 || xml.nodeType === 4) {
    obj = xml.nodeValue;
  }

  let textNodes = [].slice.call(xml.childNodes).filter(function (node: any) {
    return node.nodeType === 3;
  });
  if (!xml.hasChildNodes()) return obj;
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function (text, node: any) {
      return text + node.nodeValue;
    }, "");
    return obj;
  }
  for (let i = 0; i < xml.childNodes.length; i++) {
    let item = xml.childNodes.item(i);
    let nodeName = item.nodeName;
    if (typeof obj[nodeName] == "undefined") {
      obj[nodeName] = xmlToJson(item);
      continue;
    }
    if (typeof obj[nodeName].push == "undefined") {
      let old = obj[nodeName];
      obj[nodeName] = [];
      obj[nodeName].push(old);
    }
    if (typeof obj[nodeName] != "undefined") {
      obj[nodeName].push(xmlToJson(item));
      continue;
    }
  }
  return obj;
};
