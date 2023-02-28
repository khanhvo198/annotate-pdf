function saveByteArray(reportName, byte) {
  var blob = new Blob([byte], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
}

const createPDF = async () => {
  const existingPdfBytes = await fetch("./123.pdf").then((res) =>
    res.arrayBuffer()
  );
  const blob = new Blob([existingPdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  pdfAnnotate.AnnotationFactory.loadFile(url).then((factory) => {
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
