module.exports = (obj, varType = "const") => {
  const scope = [];
  for (const [key, val] of Object.entries(obj)) {
    scope.push(`${varType} ${key} = ${val};`);
  }

  return scope.join("\n");
};
