import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver";

function useDownloadExcel() {
  function onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Usuarios con bono");

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "DataGrid.xlsx"
        );
      });
    });
    e.cancel = true;
  }

    return { onExporting };
}

export { useDownloadExcel };