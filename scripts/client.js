import { logger, formOps } from "../utils/index.js";

logger.success("! Script injected !");

const triggerButton = document.querySelector("#trigger");

var oldHref = document.location.href;
var isLurking = false;

/**
 * sets lurking state to true and executes every time a new channel is encountered
 * @param {*} mustExecute - To execute the functionality unconditionally
 */
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

/**
 * sets lurking state to false
 */
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

      // start lurking on any new discord page while in lurk mode
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
