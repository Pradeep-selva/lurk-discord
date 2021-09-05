import { logger, formOps } from "../utils/index.js";

logger.success("! Script injected !");

const triggerButton = document.querySelector("#trigger");

var oldHref = document.location.href;
var isLurking = false;

const startLurking = () => {
  isLurking = true;

  const currentURL = document.location.href;
  const form = formOps.query();

  if (oldHref != currentURL) {
    logger.success(`New URL encountered -- ${currentURL}`);

    oldHref = currentURL;
    formOps.remove(form);
  }

  if (!!form) {
    formOps.remove(form);
  }
  logger.success("Started Lurking!");
};

const stopLurking = () => {
  const form = formOps.query();
  formOps.makeVisible(form);

  isLurking = false;

  logger.success("Stopped Lurking!");
};

window.onload = () => {
  triggerButton.addEventListener("click", () => {
    logger.success(`isLurking: ${isLurking}`);
    if (!isLurking) {
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
    } else {
      stopLurking();
    }
  });
};
