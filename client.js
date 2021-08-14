console.log("[LURK DISCORD] Client injected");
var oldHref = document.location.href;

const removeForm = () => {
  const form = document.querySelector("form");
  form.remove();
};

removeForm();
var bodyList = document.querySelector("body"),
  observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (oldHref != document.location.href) {
        console.log("[LURK DISCORD]: New Url encountered");

        oldHref = document.location.href;
        removeForm();
      }
    });
  });

var config = {
  childList: true,
  subtree: true
};

observer.observe(bodyList, config);
