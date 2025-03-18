import { InvoiceProps } from "types";

export const InvoicePDFTemplate = ({ invoice }: { invoice: InvoiceProps }) => {
    return <div>
        {invoice.clientDetails.name}
    </div>;
};
