const urlSerialize = (obj, prefix) => {
  if (Object.keys(obj)?.length > 0) {
    const str = [];

    Object.keys(obj).forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        const k = prefix ? `${prefix}[${key}]` : key;
        const v = obj[key];

        str.push(
          v !== null && typeof v === "object"
            ? urlSerialize(v, k)
            : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        );
      }
    });

    return str.join("&");
  }

  return "";
};

export default urlSerialize;
