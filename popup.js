const titleButton = document.querySelector("#titleButton");
const inspectButton = document.querySelector("#inspectButton");

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function hover() {
  const prevTooltip = document.querySelector("#bellyButtonTooltip");
  // const prevExitButton = document.querySelector("#bellyButtonExit");
  const prevSidebar = document.querySelector("#bellyButtonSidebar");

  prevTooltip && prevTooltip.remove();
  // prevExitButton && prevExitButton.remove();
  prevSidebar && prevSidebar.remove();

  let tooltip;
  let exitButton;

  tooltip = document.createElement("div");
  // exitButton = document.createElement("button");

  let buttons = document.getElementsByTagName("button");
  let anchors = document.getElementsByTagName("a");
  let divs = document.getElementsByTagName("div");

  buttons = [...buttons];
  anchors = [...anchors];
  divs = [...divs];

  tooltip.id = "bellyButtonTooltip";
  // exitButton.id = "bellyButtonExit";

  // exitButton.textContent = "Exit Inspect";

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
    <div style='font-weight: bold'>Button <span class="code-title">&lt;button&gt;</span></div>
    <div>aria-label: ${element.getAttribute("aria-label") ? "✔️" : "❌"}</div>
    <div>title: ${element.getAttribute("title") ? "✔️" : "❌"}</div>
    <div>Specified Type: ${element.getAttribute("type") ? "✔️" : "❌"}</div>
    <div>Icon button: ${
      !nodeArray.some((child) => child.nodeType === 3) ? "✔️" : "❌"
    }</div>`;

      tooltip.style.opacity = "100";
    };

    button.onmouseout = function (e) {
      tooltip.style.opacity = "0";
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
    <div style='font-weight: bold'>Link <span class="code-title">&lt;a&gt;</span></div>
    <div>aria-label: ${element.getAttribute("aria-label") ? "✔️" : "❌"}</div>
    <div>title: ${element.getAttribute("title") ? "✔️" : "❌"}</div>
        <div>Icon button: ${
          !nodeArray.some((child) => child.nodeType === 3) ? "✔️" : "❌"
        }</div>
    `;

      tooltip.style.opacity = "100";
    };

    link.onmouseout = function (e) {
      tooltip.style.opacity = "0";
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

        tooltip.style.opacity = "100";
      };

      div.onmouseout = function (e) {
        tooltip.style.opacity = "0";
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

  // exitButton.addEventListener("click", () => {
  //   tooltip.remove();
  //   exitButton.remove();
  // });

  document.body.append(tooltip);
  // document.body.append(exitButton);
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

  bodyElement.setAttribute(
    "style",
    "margin-left: 400px !important; width: calc(100% - 400px) !important; position: absolute !important; overflow: scroll !important; cursor: pointer !important;"
  );

  sidebarElement.innerHTML = `
    <div id="bellyButtonSidebar" class="slide-right">
      <div id="bellyButtonSidebarHeader"> 
      <h1 id="bellyButtonSidebarTitle">🦖  Belly Button</h1>
      <button id="bellyButtonSidebarClose" type="button" aria-label="Close Belly Button Sidebar"><svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
      <div id="bellyButtonSidebarMain">
        <h2>What makes up a good <button id="bellyButtonWithinText">Button</button> ?</h2>
        <ol id="bellyButtonSidebarList">
          <li>
          <h3><span class="code-title">aria-label</span> for icon buttons</h3>
            <p>
            Aria-label is an HTML attribute that labels an element on a webpage so that accessiblity tools such as screen readers can parse and announce the label to the user. Should be implemented for icon buttons and when extra textual indication needs to be provided to users who use assitive technologies. <a href="https://www.w3.org/TR/wai-aria/#aria-label">(Reference)</a>
            </p>
            <div>&lt;button aria-label="Menu" &gt;...&lt;/button&gt;</div>
          </li>
          <li>
          <h3>No <span class="code-title">title</span> attribute</h3>
            <p>
              The title HTML attribute can be added to an element to display a tooltip when it is hovered over with the cursor. However, the attribute is widely inconsistent across browsers and can negatively affect assistive technology's parsing of a webpage. <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title#accessibility_concerns">(Reference)</a>
            </p>
            <div>&lt;button title="Home" &gt;...&lt;/button&gt; ❌</div>
          </li>
          <li>
          <h3>Specified <span class="code-title">type</span></h3>
            <p>
              It is good practice to specify the button as one of three options: <span class="code-title">button</span>, <span class="code-title">submit</span>, or <span class="code-title">reset</span> in order to avoid strange behavior such as accidental form submissions. <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type">(Reference)</a>
            </p>
            <div>&lt;button type="button" &gt;...&lt;/button&gt;</div>
          </li>
          <li>
          <h3>Not a <span class="code-title">div</span> with <span class="code-title">role="button"</span></h3>
            <p>
              Not focusable by the keyboard. Can't be clicked with the <span class="code-title">Enter</span> or <span class="code-title">Space</span> key. Don't. Just don't. <a href="https://www.htmhell.dev/2-div-with-button-role/">(Reference)</a>
            </p>
            <div>&lt;div role="button" &gt;...&lt;/div&gt; ❌</div>
          </li>
          <li>
          <h3>Size of at least 44x44 pixels</h3>
            <p>
              Fitt's Law is a usability law that states that the time to acquire a target is a function of the distance to and size of the target, meaning, a button is easier to press the larger it is. The standard minimum size for buttons on websites is 44x44 pixels, this is so that the button can easily be accessed by mobile users who need large touch targets. <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#size_and_proximity">(Reference)</a>
            </p>
            <div><button class="bad-button">I'm a bad button</button> <button class="good-button" type="button" aria-label="Example of a good button">I'm a good button</button></div>
          </li>
        </ol>
      </div>
    </div>
  `;

  document.body.append(sidebarElement);
}

function sidebarClose() {
  const sidebarClose = document.getElementById("bellyButtonSidebarClose");
  const sidebarElement = document.getElementById("bellyButtonSidebar");
  const toolTip = document.getElementById("bellyButtonTooltip");
  // const exitButton = document.getElementById("bellyButtonExit");

  sidebarClose.addEventListener("click", async () => {
    sidebarElement.remove();
    toolTip.remove();
    // exitButton.remove();
    document.body.setAttribute("style", "");
    console.log("Ran remove!");
  });
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
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["sidebar.css"],
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: hover,
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
