export const formOps = {
  query: () => document.querySelector("form"),
  remove: (form = null) => {
    if (!!form) form.style.visibility = "hidden";
    else logger.error("Could not find form");
  },
  makeVisible: (form = null) => {
    if (!!form) form.style.visibility = "visible";
    else logger.error("Could not find form");
  }
};

export const logger = {
  error: (errorMessage) =>
    console.log(`![LURK DISCORD] Error: ${errorMessage}`),
  success: (successMessage) =>
    console.log(`[LURK DISCORD] Success: ${successMessage}`)
};
