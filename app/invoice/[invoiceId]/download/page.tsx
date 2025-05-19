'use client'
import { InvoicePDFTemplate } from "@components/templates/invoicePDF/index";
import { getInvoiceById } from "api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InvoiceProps } from "types";
import { pdf, PDFViewer } from "@react-pdf/renderer";

export default function DownloadInvoice() {
    const { invoiceId } = useParams();
    const router = useRouter();

    const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(3);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const response = await getInvoiceById(invoiceId);
                setInvoice(response.invoice);
            } catch (error) {
                console.error("Failed to fetch invoice:", error);
                setError("Failed to load invoice data.");
            }
        };

        if (invoiceId) fetchInvoiceData();
    }, [invoiceId]);

    useEffect(() => {
        const autoDownloadPDF = async () => {
            if (invoice && isMobile) {
                const blob = await pdf(<InvoicePDFTemplate invoice={invoice} />).toBlob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `DodoInvoice_${invoice.invoiceNumber}.pdf`;
                link.click();

                // Start countdown after download
                let counter = 3;
                const interval = setInterval(() => {
                    counter -= 1;
                    setCountdown(counter);
                    if (counter === 0) {
                        clearInterval(interval);
                        router.push(`/invoice/review/${invoiceId}`);
                    }
                }, 1000);
            }
        };

        autoDownloadPDF();
    }, [invoice, invoiceId, isMobile, router]);

    if (!invoice) return <div className="p-4 text-center">Loading invoice...</div>;

    if (isMobile) {
        return (
            <div className="p-4 text-center">
                <div>Downloading PDF...</div>
                {countdown < 3 && <div>Redirecting in {countdown}...</div>}
            </div>
        );
    }

    return (
        <PDFViewer className="min-h-screen w-full">
            <InvoicePDFTemplate invoice={invoice} />
        </PDFViewer>
    );
}
