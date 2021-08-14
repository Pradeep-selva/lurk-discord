export const formOps = {
  query: () => document.querySelector("form"),
  remove: (form = null) =>
    !!form ? form.remove() : logger.error("Could not find form")
};

export const logger = {
  error: (errorMessage) =>
    console.log(`![LURK DISCORD] Error: ${errorMessage}`),
  success: (successMessage) =>
    console.log(`[LURK DISCORD] Success: ${successMessage}`)
};
