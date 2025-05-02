import PreviewInvoicePage from ".";


const PreviewInvoice = () => {


  return (
    <div>
      <PreviewInvoicePage />
    </div>
  );
};

export default PreviewInvoice;


export async function generateMetadata() {
  return {
    title: `DODO | Invoice`,
    openGraph: {
      title: `Dodo Invoice`,
      description: "Preview this invoice generated via Dodo",
      images: [
        {
          url: "https://dodo-profile-audio.s3.ap-south-1.amazonaws.com/dodo-profiles/1744974562816-invoice.png",
          width: 1200,
          height: 630,
          alt: "Invoice Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Invoice`,
      description: "Preview this invoice generated via Dodo",
      images: ["https://dodo-profile-audio.s3.ap-south-1.amazonaws.com/dodo-profiles/1744974562816-invoice.png"],
    },
  };
}