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

const companyArray = [
  {
    search: "youtube",
    title: "YouTube",
  },
  {
    search: "youtu.be",
    title: "YouTube",
  },
  {
    search: "discord",
    title: "Discord",
  },
  {
    search: "instagram",
    title: "Instagram",
  },
  {
    search: "github",
    title: "GitHub",
  },
  {
    search: "facebook",
    title: "Facebook",
  },
  {
    search: "twitter",
    title: "Twitter",
  },
  {
    search: "pinterest",
    title: "Pinterest",
  },
];

function addTitle(element) {
  console.log("Ran!");

  // Check if element is an anchor tag
  if (element.nodeName === "A") {
    if (element.hasChildNodes()) {
      // Convert nodeList into array which we can use array methods on
      const nodeArray = Array.from(element.childNodes);

      // If the element doesn't have a title or text within it, add the company title
      if (
        !element["aria-label"] &&
        !nodeArray.some((child) => child.nodeType === 3)
      ) {
        companyArray.forEach((company) => {
          if (element.href.search(company.search) !== -1) {
            element.setAttribute("aria-label", company.title);
            console.log("Set aria-label!");
          }
        });
      }
    } else {
      // An empty anchor tag, might as well add the title
      if (!element["aria-label"]) {
        companyArray.forEach((company) => {
          if (element.href.search(company.search) !== -1) {
            element.setAttribute("aria-label", company.title);
            console.log("Set aria-label!");
          }
        });
      }
    }
  } else {
    if (element.hasChildNodes()) {
      element.childNodes.forEach(addTitle);
    }
  }
}

addTitle(document.body);
