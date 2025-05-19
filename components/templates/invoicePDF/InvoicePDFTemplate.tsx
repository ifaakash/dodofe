import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDateLong, formatCurrency, formatCurrencyInWords } from "@utils/helperFunctions";
import { calculateGrandTotal } from "@utils/index";
import { InvoiceProps } from "types";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        padding: 40,
        fontSize: 12,
        position: "relative",
    },
    topBorder: {
        height: 6,
        width: "100%",
        backgroundColor: "#17CF62", // brandPrimary
        position: "absolute",
        top: 0,
        left: 0,
    },
    fullSizeContainer: {
        flex: 1,
        width: "100%",
    },
    headerContainer: {
        marginBottom: 20,
        alignItems: "center",
        textAlign: "center",
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: "#3D4966",
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        padding: 12,
        borderRadius: 6,
        marginTop: 12,
    },
    detailLabel: {
        fontSize: 10,
        color: "#3D4966",
    },
    detailValue: {
        fontSize: 12,
        fontWeight: "bold",
    },
    textEnd: {
        textAlign: "right",
    },
    userCardWrapper: {
        flexDirection: "row",
        gap: 12,
        justifyContent: "space-between",
        marginTop: 20,
    },
    userCard: {
        width: "48%",
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 6,
        flexDirection: "column",
        gap: 6,
    },
    userLabel: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 4,
    },
    userName: {
        fontSize: 12,
        fontWeight: 600,
    },
    userInfo: {
        fontSize: 10,
        color: "#3D4966",
        marginBottom: 2,
    },
    wrapper: {
        backgroundColor: "#ffffff",
        paddingTop: 12,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E4E9",
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "semibold",
        marginBottom: 8,
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 6,
    },
    itemName: {
        fontSize: 11,
        fontWeight: "semibold",
        color: "#3D4966",
    },
    itemQuantity: {
        fontSize: 10,
        color: "#3D4966",
    },
    itemAmount: {
        fontSize: 11,
        fontWeight: "semibold",
        alignSelf: "flex-end",
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: "#EAE9EC",
        borderStyle: "dotted",
        marginVertical: 4,
    },
    solidLine: {
        borderBottomWidth: 1,
        borderBottomColor: "#E2E4E9",
        marginVertical: 8,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 6,
    },
    summaryLabel: {
        fontSize: 11,
        fontWeight: "semibold",
        color: "#3D4966",
    },
    taxBlock: {
        marginTop: 10,
    },
    taxRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
    },
    taxLabel: {
        fontSize: 11,
        fontWeight: "medium",
        color: "#3D4966",
    },
    taxValue: {
        fontSize: 11,
        fontWeight: "medium",
    },
    grandTotalContainer: {
        backgroundColor: "#000000",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    totalLabel: {
        color: "#ffffff",
        fontSize: 12,
    },
    totalValue: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "bold",
    },
    totalInWords: {
        textAlign: "right",
        fontSize: 9,
        marginTop: 6,
        color: "#ffffff",
    },
    // wrapper: {
    //     backgroundColor: "#ffffff",
    //     borderRadius: 10,
    //     paddingVertical: 12,
    //     paddingHorizontal: 16,
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: 10,
    //   },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    label: {
        fontSize: 11,
    },
    value: {
        fontSize: 11,
        fontWeight: "medium",
    },
    upiWrapper: {
        borderTopWidth: 1,
        borderTopColor: "#EAE9EC",
        borderStyle: "dotted",
        paddingTop: 10,
        marginTop: 4,
    },
    paymentWrapper: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    ItemsWrapper: {
        marginVertical: 20,
    },
    noteWrapper: {
        backgroundColor: "#ffffff",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },
    noteTitle: {
        fontSize: 12,
        fontWeight: "semibold",
        marginBottom: 6,
    },
    noteText: {
        fontSize: 11,
        lineHeight: 1.4,
        whiteSpace: "pre-wrap",
        textAlign: "justify",
    },
    footerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 12,
    },
    footerText: {
        fontSize: 11,
    },
    logo: {
        width: 80,
        height: 20,
    },
});

interface InvoicePDFTemplateProps {
    invoice: InvoiceProps;
}

export const InvoicePDFTemplate = ({ invoice }: InvoicePDFTemplateProps) => {
    const renderUserCard = (type: "sender" | "recipient", userDetails: any) => (
        <View style={styles.userCard}>
            <Text style={styles.userLabel}>{type === "sender" ? "From" : "To"}</Text>
            <Text style={styles.userName}>{userDetails.name}</Text>
            <Text style={styles.userInfo}>
                {userDetails.address}, {userDetails.city}, {userDetails.state}, {userDetails.zipcode}
            </Text>
            <Text style={styles.userInfo}>{userDetails.email}</Text>
            {userDetails.gst && <Text style={styles.userInfo}>GSTN: {userDetails.gst}</Text>}
            {userDetails.pan && <Text style={styles.userInfo}>PAN: {userDetails.pan}</Text>}
        </View>
    );

    const subtotal = invoice.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const grandTotal = calculateGrandTotal(invoice.items, invoice.discount, invoice.gst, invoice.tds);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Top Border */}
                <View style={styles.topBorder} />

                {/* Content */}
                <View style={styles.fullSizeContainer}>
                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Invoice</Text>
                        <Text style={styles.date}>{formatDateLong(invoice.invoiceDate)}</Text>
                    </View>

                    {/* Invoice Details */}
                    <View style={styles.detailsContainer}>
                        <View>
                            <Text style={styles.detailLabel}>Invoice Number</Text>
                            <Text style={styles.detailValue}>{invoice.invoiceNumber}</Text>
                        </View>
                        <View>
                            <Text style={[styles.detailLabel, styles.textEnd]}>Due Date</Text>
                            <Text style={[styles.detailValue, styles.textEnd]}>
                                {formatDateLong(invoice.dueDate)}
                            </Text>
                        </View>
                    </View>

                    {/* User Cards */}
                    <View style={styles.userCardWrapper}>
                        {renderUserCard("recipient", invoice.recipientDetails)}
                        {renderUserCard("sender", invoice.clientDetails)}
                    </View>

                    {/* Items Section */}
                    <View style={styles.ItemsWrapper}>
                        <View style={styles.wrapper}>
                            <Text style={styles.sectionTitle}>ITEMS</Text>
                            {invoice.items.map((item, index) => (
                                <View key={item._id}>
                                    <View style={styles.itemRow}>
                                        <View>
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemQuantity}>
                                                {item.quantity} x {formatCurrency(item.price)}
                                            </Text>
                                        </View>
                                        <Text style={styles.itemAmount}>
                                            {formatCurrency(item.quantity * item.price)}
                                        </Text>
                                    </View>
                                    {index < invoice.items.length - 1 && <View style={styles.separator} />}
                                </View>
                            ))}

                            <View style={styles.solidLine} />

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Sub-Total</Text>
                                <Text style={styles.itemAmount}>{formatCurrency(subtotal)}</Text>
                            </View>

                            <View style={styles.separator} />

                            {(invoice.discount > 0 || invoice.gst > 0 || invoice.tds > 0) && (
                                <View style={styles.taxBlock}>
                                    {invoice.discount > 0 && (
                                        <View style={styles.taxRow}>
                                            <Text style={styles.taxLabel}>Discount (-)</Text>
                                            <Text style={styles.taxValue}>{invoice.discount}%</Text>
                                        </View>
                                    )}
                                    {invoice.gst > 0 && (
                                        <View style={styles.taxRow}>
                                            <Text style={styles.taxLabel}>GST (+)</Text>
                                            <Text style={styles.taxValue}>{invoice.gst}%</Text>
                                        </View>
                                    )}
                                    {invoice.tds > 0 && (
                                        <View style={styles.taxRow}>
                                            <Text style={styles.taxLabel}>TDS (-)</Text>
                                            <Text style={styles.taxValue}>{invoice.tds}%</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>

                        <View style={styles.grandTotalContainer}>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Grand Total</Text>
                                <Text style={styles.totalValue}>
                                    {formatCurrency(grandTotal)} /-
                                </Text>
                            </View>
                            <Text style={styles.totalInWords}>
                                {formatCurrencyInWords(grandTotal)} Only
                            </Text>
                        </View>
                    </View>

                    <View style={styles.paymentWrapper}>
                        <Text style={styles.sectionTitle}>PAYMENT DETAILS</Text>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Bank Name</Text>
                            <Text style={styles.value}>{invoice.bankDetails.bankName}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Account Number</Text>
                            <Text style={styles.value}>{invoice.bankDetails.accountNumber}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>IFSC Code</Text>
                            <Text style={styles.value}>{invoice.bankDetails.ifscCode}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Account Holder Name</Text>
                            <Text style={styles.value}>{invoice.bankDetails.accountName}</Text>
                        </View>

                        {invoice.bankDetails.upiId && (
                            <View style={styles.upiWrapper}>
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>UPI ID</Text>
                                    <Text style={styles.value}>{invoice.bankDetails.upiId}</Text>
                                </View>
                            </View>
                        )}
                    </View>

                    {
                        invoice.note && (
                            <View style={styles.noteWrapper}>
                                <Text style={styles.noteTitle}>NOTE</Text>
                                <Text style={styles.noteText}>{invoice.note}</Text>
                            </View>
                        )
                    }
                </View>
            </Page>
        </Document>
    );
};
