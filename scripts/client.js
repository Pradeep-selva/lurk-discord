import { logger, formOps } from "../utils/index.js";

logger.success("! Script injected !");

var oldHref = document.location.href;
const firstLoad = true;

window.onload = function () {
  var bodyList = document.querySelector("body"),
    observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const currentURL = document.location.href;
        const form = formOps.query();

        if (oldHref != currentURL) {
          logger.success(`New URL encountered -- ${currentURL}`);

          oldHref = currentURL;
          formOps.remove(form);
        }

        if (firstLoad && !!form) {
          formOps.remove(form);
          firstLoad = false;
        }
      });
    });

  var config = {
    childList: true,
    subtree: true
  };

  observer.observe(bodyList, config);
};
