import { logger } from "../utils/index.js";

logger.success("**Script injected**");
var oldHref = document.location.href;

const removeForm = () => {
  const form = document.querySelector("form");
  form.remove();
};

removeForm();
var bodyList = document.querySelector("body"),
  observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      const currentURL = document.location.href;
      if (oldHref != currentURL) {
        logger.success(`New URL encountered -- ${currentURL}`);

        oldHref = currentURL;
        removeForm();
      }
    });
  });

var config = {
  childList: true,
  subtree: true
};

observer.observe(bodyList, config);
