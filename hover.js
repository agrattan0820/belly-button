let tooltip;
let exitButton;

if (!tooltip) {
  tooltip = document.createElement("div");
  document.body.append(tooltip);
}
if (!exitButton) {
  exitButton = document.createElement("button");
  document.body.append(exitButton);
}

let buttons = document.getElementsByTagName("button");
let anchors = document.getElementsByTagName("a");

buttons = [...buttons];
anchors = [...anchors];

console.log(buttons);

tooltip.id = "tooltip";

tooltip.style.display = "none";
tooltip.style.alignItems = "center";
tooltip.style.justifyContent = "center";
tooltip.style.position = "fixed";
tooltip.style.backgroundColor = "cornflowerblue";
tooltip.style.borderRadius = "20px";
tooltip.style.width = "200px";
tooltip.style.height = "100px";
tooltip.style.zIndex = "1000";
tooltip.textContent = "Hello there";

exitButton.id = "exitButton";

exitButton.style.position = "fixed";
exitButton.style.top = "8px";
exitButton.style.right = "16px";
exitButton.style.backgroundColor = "cornflowerblue";
exitButton.style.borderRadius = "20px";
exitButton.style.width = "100px";
exitButton.style.height = "50px";
exitButton.style.zIndex = "1000";
exitButton.textContent = "Hello there";

buttons.forEach((button, i) => {
  button.onmouseover = function (e) {
    tooltip.style.display = "flex";
    tooltip.innerHTML = `
    <div>Button ${i}</div>`;
    console.log(e.srcElement.getAttribute("aria-label"));
  };

  button.onmouseout = function (e) {
    tooltip.style.display = "none";
  };
});

window.onmousemove = function (e) {
  // tooltip.style.display = "block";
  let x = e.clientX,
    y = e.clientY;
  tooltip.style.top = y + 20 + "px";
  tooltip.style.left = x + 20 + "px";
};

anchors.forEach((link, i) => {
  link.onmouseover = function (e) {
    tooltip.style.display = "flex";
    tooltip.innerHTML = `
    <div>Link ${i}</div>`;
    console.log(e.srcElement.getAttribute("aria-label"));
  };

  link.onmouseout = function (e) {
    tooltip.style.display = "none";
  };
});

window.onmousemove = function (e) {
  // tooltip.style.display = "block";
  let x = e.clientX,
    y = e.clientY;
  tooltip.style.top = y + 20 + "px";
  tooltip.style.left = x + 20 + "px";
};

exitButton.addEventListener("click", () => {
  tooltip.remove();
  exitButton.remove();
});
