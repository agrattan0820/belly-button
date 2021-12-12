const titleButton = document.querySelector("#titleButton");
const inspectButton = document.querySelector("#inspectButton");
const uxCheckButton = document.querySelector("#uxCheckButton");

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function hover() {
  const prevTooltip = document.querySelector("#bellyButtonTooltip");
  const prevExitButton = document.querySelector("#bellyButtonExit");
  const prevSidebar = document.querySelector("#bellyButtonSidebar");

  prevTooltip && prevTooltip.remove();
  prevExitButton && prevExitButton.remove();
  prevSidebar && prevSidebar.remove();

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

  tooltip.id = "bellyButtonTooltip";
  exitButton.id = "bellyButtonExit";

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

      console.log(e);

      element = findButton(e.srcElement);

      // console.log(element);

      const nodeArray = Array.from(element.childNodes);

      tooltip.innerHTML = `
    <div style='font-weight: bold'>Button &lt;button&gt;</div>
    <div>aria-label: ${element.getAttribute("aria-label") ? "✔️" : "❌"}</div>
    <div>Icon button: ${
      !nodeArray.some((child) => child.nodeType === 3) ? "✔️" : "❌"
    }</div>`;

      tooltip.style.display = "flex";
    };

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

      console.log(e);

      element = findAnchor(e.srcElement);

      const nodeArray = Array.from(element.childNodes);

      // console.log(element);

      tooltip.innerHTML = `
    <div style='font-weight: bold'>Link &lt;a&gt;</div>
    <div>aria-label: ${element.getAttribute("aria-label") ? "✔️" : "❌"}</div>
        <div>Icon button: ${
          !nodeArray.some((child) => child.nodeType === 3) ? "✔️" : "❌"
        }</div>
    `;

      tooltip.style.display = "flex";
    };

    link.onmouseout = function (e) {
      tooltip.style.display = "none";
    };
  });

  divs.forEach((div, i) => {
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

  confirmBox.id = "bellyButtonConfirm";
  confirmBox.textContent = "Added! ✔️";

  document.body.append(confirmBox);

  setTimeout(() => {
    confirmBox.style.opacity = "0";
    setTimeout(() => {
      confirmBox.remove();
    }, 200);
  }, 3000);
}

function sidebar() {
  let sidebarElement;

  sidebarElement = document.createElement("div");

  const bodyElement = document.body;

  const sidebarClose = document.getElementById("bellyButtonSidebarClose");

  // sidebarClose.addEventListener("click", () => {
  //   document.body.removeChild(sidebarElement);
  //   console.log("Ran remove!");
  // });

  bodyElement.setAttribute(
    "style",
    "margin-left: 400px !important; width: calc(100% - 400px) !important; position: absolute !important; overflow: scroll !important; cursor: pointer !important;"
  );

  sidebarElement.innerHTML = `
    <div id="bellyButtonSidebar">
      <button id="bellyButtonSidebarClose">❌</button>
      <h1>Belly Button</h1>

    </div>
  `;

  document.body.append(sidebarElement);
}

function sidebarClose() {
  const sidebarClose = document.getElementById("bellyButtonSidebarClose");
  const sidebarElement = document.getElementById("bellyButtonSidebar");

  sidebarClose.addEventListener("click", () => {
    sidebarElement.remove();
    console.log("Ran remove!");
  });

  document.body.setAttribute("style", "");
}

titleButton.addEventListener("click", async () => {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["addTitle.js"],
  });
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["confirm.css"],
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: addConfirmation,
  });
  window.close();
});

inspectButton.addEventListener("click", async () => {
  const tab = await getCurrentTab();
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["hover.css"],
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: hover,
  });
  window.close();
});

uxCheckButton.addEventListener("click", async () => {
  const tab = await getCurrentTab();
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["sidebar.css"],
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: sidebar,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: sidebarClose,
  });
  window.close();
});
