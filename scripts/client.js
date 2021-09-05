import { logger, formOps } from "../utils/index.js";

logger.success("! Script injected !");

const triggerButton = document.querySelector("#trigger");

var oldHref = document.location.href;
var isLurking = false;

const startLurking = (mustExecute = false) => {
  if (!isLurking) return;

  const form = formOps.query();
  const currentURL = document.location.href;

  if (mustExecute) {
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
  isLurking = false;

  const form = formOps.query();
  formOps.makeVisible(form);

  logger.success("Stopped Lurking!");
};

window.onload = () => {
  triggerButton.addEventListener("click", () => {
    if (!isLurking) {
      logger.success(`lurking`);
      isLurking = true;
      startLurking(true);

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
      logger.success("not lurking");
      stopLurking();
    }
  });
};
