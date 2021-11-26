//  "content_scripts": [
//   {
//    "matches": ["<all_urls>"],
//    "js": ["script.js"],
//    "css": ["styles.css"]
//   }
//  ],
// "action": {
//   "default_popup": "popup.html",
//   "default_icon": {
//   "16": "/images/favicon-16x16.png",
//   "32": "/images/favicon-32x32.png"
//   }
// },

const titleButton = document.querySelector("#titleButton");
const inspectButton = document.querySelector("#inspectButton");

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function hover() {
  let tooltip;
  let exitButton;

  tooltip = document.createElement("div");
  exitButton = document.createElement("button");

  let buttons = document.getElementsByTagName("button");
  let anchors = document.getElementsByTagName("a");
  let divs = document.getElementsByTagName("div");

  buttons = [...buttons];
  anchors = [...anchors];
  divs = [...divs];

  console.log(divs);

  tooltip.id = "tooltip";

  tooltip.style.display = "none";
  tooltip.style.alignItems = "center";
  tooltip.style.justifyContent = "center";
  tooltip.style.flexDirection = "column";
  tooltip.style.position = "fixed";
  tooltip.style.backgroundColor = "papayawhip";
  tooltip.style.borderRadius = "20px";
  tooltip.style.width = "200px";
  tooltip.style.height = "100px";
  tooltip.style.zIndex = "10000";
  tooltip.style.color = "black";
  tooltip.style.padding = "1rem";
  tooltip.style.boxSizing = "border-box";
  tooltip.style.fontWeight = "normal";
  tooltip.style.boxShadow = `
  2.2px 2.2px 3.6px rgba(0, 0, 0, 0.024),
  6px 6px 10px rgba(0, 0, 0, 0.035),
  14.5px 14.5px 24.1px rgba(0, 0, 0, 0.046),
  48px 48px 80px rgba(0, 0, 0, 0.07)
`;
  tooltip.textContent = "Hello there";

  exitButton.id = "exitButton";

  exitButton.style.position = "fixed";
  exitButton.style.top = "8px";
  exitButton.style.right = "16px";
  exitButton.style.backgroundColor = "papayawhip";
  exitButton.style.borderRadius = "10px";
  exitButton.style.width = "125px";
  exitButton.style.height = "50px";
  exitButton.style.zIndex = "10000";
  exitButton.style.color = "black";
  exitButton.style.border = "none";
  exitButton.style.outline = "none";
  exitButton.style.fontWeight = "normal";
  exitButton.style.boxSizing = "border-box";
  exitButton.style.boxShadow = `
  2.2px 2.2px 3.6px rgba(0, 0, 0, 0.024),
  6px 6px 10px rgba(0, 0, 0, 0.035),
  14.5px 14.5px 24.1px rgba(0, 0, 0, 0.046),
  48px 48px 80px rgba(0, 0, 0, 0.07)
`;
  exitButton.textContent = "Exit Inspect";

  buttons.forEach((button, i) => {
    button.onmouseover = function (e) {
      let element;

      function findButton(element) {
        if (element.nodeName !== "BUTTON") {
          return findAnchor(element.parentElement);
        } else if (element.nodeName === "BODY") {
          return false;
        } else {
          return element;
        }
      }

      element = findButton(e.srcElement);

      tooltip.innerHTML = `
    <div>Button ${i}</div>
    <div>aria-label: ${element.getAttribute("aria-label") ? "✔️" : "❌"}</div>`;
      console.log(element.getAttribute("aria-label"));
    };

    tooltip.style.display = "flex";

    button.onmouseout = function (e) {
      tooltip.style.display = "none";
    };
  });

  anchors.forEach((link, i) => {
    link.onmouseover = function (e) {
      let element;

      function findAnchor(element) {
        if (element.nodeName !== "A") {
          return findAnchor(element.parentElement);
        } else if (element.nodeName === "BODY") {
          return false;
        } else {
          return element;
        }
      }

      element = findAnchor(e.srcElement);

      tooltip.innerHTML = `
    <div>Link ${i}</div>
    <div>aria-label: ${element.getAttribute("aria-label") ? "✔️" : "❌"}</div>`;

      tooltip.style.display = "flex";
      console.log(element.getAttribute("aria-label"));
      console.log(e.srcElement);
      console.log(e);
    };

    link.onmouseout = function (e) {
      tooltip.style.display = "none";
    };
  });

  divs.forEach((div, i) => {
    console.log(div.getAttribute("role"));
    if (div.getAttribute("role") === "button") {
      div.onmouseover = function (e) {
        let element;

        function findDiv(element) {
          if (element.nodeName !== "DIV") {
            return findDiv(element.parentElement);
          } else if (element.nodeName === "BODY") {
            return false;
          } else {
            return element;
          }
        }

        element = findDiv(e.srcElement);

        tooltip.innerHTML = `
    <div>This is a div with role="button"</div> 
    <div>That's a no-no ❌</div>`;

        tooltip.style.display = "flex";
        tooltip.style.width = "300px";
        console.log(element.getAttribute("aria-label"));
        console.log(e.srcElement);
        console.log(e);
      };

      div.onmouseout = function (e) {
        tooltip.style.display = "none";
        tooltip.style.width = "200px";
      };
    }
  });

  window.onmousemove = function (e) {
    let x = e.clientX,
      y = e.clientY;
    if (x > window.innerWidth - 300) {
      tooltip.style.left = x - 220 + "px";
    } else {
      tooltip.style.left = x + 20 + "px";
    }

    if (y > window.innerHeight - 200) {
      tooltip.style.top = y - 120 + "px";
    } else {
      tooltip.style.top = y + 20 + "px";
    }
  };

  exitButton.addEventListener("click", () => {
    tooltip.remove();
    exitButton.remove();
  });

  document.body.append(tooltip);
  document.body.append(exitButton);
}

function addConfirmation() {
  let confirmBox;

  confirmBox = document.createElement("div");

  confirmBox.style.display = "flex";
  confirmBox.style.alignItems = "center";
  confirmBox.style.justifyContent = "center";
  confirmBox.style.position = "fixed";
  confirmBox.style.backgroundColor = "mediumseagreen";
  confirmBox.style.borderRadius = "20px";
  confirmBox.style.top = "8px";
  confirmBox.style.left = "50%";
  confirmBox.style.transform = "translate(-50%)";
  confirmBox.style.width = "125px";
  confirmBox.style.height = "50px";
  confirmBox.style.zIndex = "10000";
  confirmBox.style.color = "black";
  confirmBox.style.fontWeight = "bold";
  confirmBox.style.boxShadow = `
  2.2px 2.2px 3.6px rgba(0, 0, 0, 0.024),
  6px 6px 10px rgba(0, 0, 0, 0.035),
  14.5px 14.5px 24.1px rgba(0, 0, 0, 0.046),
  48px 48px 80px rgba(0, 0, 0, 0.07)
`;
  confirmBox.style.transitionProperty = "opacity";
  confirmBox.style.transitionDuration = "150ms";
  confirmBox.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1);";
  confirmBox.textContent = "Added! ✔️";

  document.body.append(confirmBox);

  setTimeout(() => {
    confirmBox.style.opacity = "0";
    setTimeout(() => {
      confirmBox.remove();
    }, 200);
  }, 3000);
}

titleButton.addEventListener("click", async () => {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["addTitle.js"],
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: addConfirmation,
  });
  window.close();
});

inspectButton.addEventListener("click", async () => {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: hover,
  });
  window.close();
});
