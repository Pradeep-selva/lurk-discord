console.log("[LURK DISCORD] Client injected");
removeForm();

window.addEventListener("popstate", function () {
  console.log("location changed");
  removeForm();
});

const removeForm = () => {
  const form = document.querySelector("form");
  console.log(form);
  form.remove();
};
