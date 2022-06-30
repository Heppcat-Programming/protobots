exports.getMessages = function (errors) {
  if (errors.message) return errors.message;
  let e = [];
  for (let error in errors) {
    flattenError(errors[error], e);
  }
  return JSON.stringify(e);
};

function flattenError(error, e) {
  for (let [k, v] of Object.entries(error)) {
    if (k.startsWith("_")) {
      for (let item in v) {
        e.push({ code: v[item].code, message: v[item].message });
      }
    }
  }
  return;
}
