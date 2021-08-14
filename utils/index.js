export const removeForm = () => {
  const form = document.querySelector("form");
  form.remove();
};

export const logger = {
  error: (errorMessage) =>
    console.log(`![LURK DISCORD] Error: ${errorMessage}`),
  success: (successMessage) =>
    console.log(`[LURK DISCORD] Success: ${successMessage}`)
};
