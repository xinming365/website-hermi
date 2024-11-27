export const createModalForDownload = (content, type) => {
  let blob = new Blob([content], { type: "application/pdf;chartset=UTF-8" });
  let urlObject = window.URL || window.webkitURL || window;
  let url = urlObject.createObjectURL(blob);
  let link = document.createElement("a");
  link.href = url;
  if (type === "pdf") {
    link.download = "清单.pdf";
  } else if (type === "xlsx") {
    link.download = "清单.xlsx";
  }
  link.click();
  URL.revokeObjectURL(url);
};
