function cssModule(obj) {
  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = key.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
      result[camelKey] = obj[key];
    }
  }
  return result;
}
export default cssModule;
