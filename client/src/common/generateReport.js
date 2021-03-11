import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
    reportPdf:(parameters,logs) => {
        const doc = new jsPDF()
        doc.autoTable({
            head: [[...parameters]],
            body: [
                ['David', 'david@example.com', 'Sweden'],
                ['Castille', 'castille@example.com', 'Spain'],
                // ...
            ],
        })
        // doc.save('table.pdf')

    }
}
