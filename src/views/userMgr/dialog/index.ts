const requireComponent = require.context("./", false, /\.vue$/);
const models: any = {};

requireComponent.keys().forEach(filePath => {
  const componentConfig = requireComponent(filePath);
  const fileName = filePath.replace(/(\.\/|\.vue)/g, "");
  models[fileName] = componentConfig.default || componentConfig;
});
export default models;
