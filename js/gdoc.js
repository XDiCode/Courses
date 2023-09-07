window.onload = (event) => {
  // LINKS
  let links = document.querySelectorAll("a");
  links.forEach((a) => {
    const bookmarkString = a.href.slice(-12 - 3, -12);
    const isBookmark = bookmarkString == "#h.";
    const isFootnote = /#ftnt/.test(a.href);
    if (!isBookmark && !isFootnote) {
      a.setAttribute("target", "_blank");
    }
    if (isFootnote) {
      a.style.fontSize = "10pt";
    }
    // Wegen Farben von Links bei .docx
    // Ursprünglich nur bei Footnotes
    a.style.color = "#1155cc";
  });
  // TABELLEN
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    const div = document.createElement("div");
    table.parentNode.insertBefore(div, table);
    div.appendChild(table);
    div.style.maxWidth = "100%";
    div.style.overflowX = "auto";
  });
  // BILDER
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    const a = document.createElement("a");
    image.parentNode.insertBefore(a, image);
    a.appendChild(image);
    a.setAttribute("alt", "");
    a.setAttribute("href", image.src);
    a.setAttribute("target", "_blank");
  });
  // INHALTSVERZEICHNIS
  const paragraphs = document.querySelectorAll("p");
  let startMarker = null;

  paragraphs.forEach((paragraph) => {
    const span = paragraph.querySelector("span");
    const spanText = span?.textContent;

    if (spanText) {
      if (spanText.includes("!TOC")) {
        startMarker = paragraph;
      } else if (spanText.includes("!/TOC") && startMarker) {
        const tocDiv = document.createElement("div");
        tocDiv.classList.add("table-of-contents");

        while (startMarker.nextSibling !== paragraph) {
          tocDiv.appendChild(startMarker.nextSibling);
        }

        startMarker.replaceWith(tocDiv);
        paragraph.remove();
        startMarker = null;
      }
    }
  });
};

// const idString = charactersAfterNthLast(a.href, 3, 12);
//   function charactersAfterNthLast(str, n, nth) {
//     if (nth >= str.length) return "";
//     return str.slice(-nth - n, -nth);
//   }
