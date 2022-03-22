import utils from "../utils/index";

export default (context, inject) => {
  const fn = utils(context.app);
  inject("helper", fn);
};
