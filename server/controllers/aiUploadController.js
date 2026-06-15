import PDFParser from "pdf2json";
import mammoth from "mammoth";

export const uploadResume =
 async (req, res) => {
  try {
   if (!req.file) {
    return res.status(400).json({
     message:
      "No file uploaded",
    });
   }

   const file =
    req.file;

   let extractedText =
    "";

   // PDF
   if (
    file.mimetype ===
    "application/pdf"
   ) {
    extractedText =
     await new Promise(
      (
       resolve,
       reject
      ) => {
       const pdfParser =
        new PDFParser();

       pdfParser.on(
        "pdfParser_dataError",
        (errData) =>
         reject(
          errData
           .parserError
         )
       );

       pdfParser.on(
        "pdfParser_dataReady",
        (
         pdfData
        ) => {
         let text =
          "";

         pdfData.Pages.forEach(
          (page) => {
           page.Texts.forEach(
            (textItem) => {

             try {
              text +=
               decodeURIComponent(
                textItem
                 .R[0]
                 .T
               ) + " ";
             }

             catch {
              text +=
               textItem
                .R[0]
                .T + " ";
             }

            }
           );
          }
         );

         resolve(
          text
         );
        }
       );

       pdfParser.parseBuffer(
        file.buffer
       );
      }
     );
   }

   // DOCX
   else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
   ) {
    const result =
     await mammoth.extractRawText(
      {
       buffer:
        file.buffer,
      }
     );

    extractedText =
     result.value;
   }

   else {
    return res.status(400).json({
     message:
      "Only PDF or DOCX allowed",
    });
   }

   res.status(200).json({
    success: true,
    resumeText:
     extractedText,
   });
  } catch (error) {
   console.log(error);

   res.status(500).json({
    success: false,
    message:
     "Resume parsing failed",
   });
  }
 };