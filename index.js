function saveByteArray(reportName, byte) {
  var blob = new Blob([byte], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
}

const createPDF = () => {
  pdfAnnotate.AnnotationFactory.loadFile("/123.pdf").then((factory) => {
    factory.createFreeTextAnnotation({
      page: 1,
      rect: [50, 50, 200, 200],
      contents: "Pop up note",
      author: "Max",
    });

    const buffer = factory.write();
    saveByteArray("test.pdf", buffer);
  });
};
