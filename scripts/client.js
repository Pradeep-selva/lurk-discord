import { logger, formOps } from "../utils/index.js";

logger.success("! Script injected !");

const triggerButton = document.querySelector("#trigger");

var oldHref = document.location.href;
var firstLoad = true;

const startLurking = () => {
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
};

window.onload = () => {
  triggerButton.addEventListener("click", () => {
    startLurking();

    var bodyList = document.querySelector("body"),
      observer = new MutationObserver((mutations) => {
        mutations.forEach(() => startLurking());
      });

    var config = {
      childList: true,
      subtree: true
    };

    observer.observe(bodyList, config);
  });
};
