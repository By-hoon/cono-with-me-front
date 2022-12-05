export const headcounts: Array<number> = [1, 2, 3];

export const sortOptions: Array<string> = ["정렬 없음", "최신순 정렬"];

export const PreferredGenre: { [key: string]: boolean } = {
  "모든 장르": true,
  발라드: false,
  댄스: false,
  "랩/힙합": false,
  인디: false,
  "R&B": false,
  락: false,
  트로트: false,
  팝송: false,
  "J-POP": false,
  그외: false,
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
