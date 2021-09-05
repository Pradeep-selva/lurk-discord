import { logger, formOps } from "../utils/index.js";

logger.success("! Script injected !");

const triggerButton = document.querySelector("#trigger");

var oldHref = document.location.href;
var isLurking = false;
var firstLoad = true;

const startLurking = () => {
  isLurking = true;

  const form = formOps.query();
  const currentURL = document.location.href;

  if (firstLoad) {
    firstLoad = false;
    formOps.remove(form);
    logger.success("Started Lurking!");
  }

  if (currentURL !== oldHref) {
    logger.success(`New URL encountered -- ${currentURL}`);

    oldHref = currentURL;
    formOps.remove(form);
    logger.success("Started Lurking!");
  }
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
        observer = new MutationObserver(() => {
          startLurking();
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
