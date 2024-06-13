import React, { Fragment } from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { Sale } from "@prisma/client";
import { CustomerType, DetailSaleType } from "@/types";
import { formatCurrency, formatDateToLocal } from "@/lib/utils";

type SalePDFProps = {
  sale: Sale;
  customer: CustomerType;
  detailsSale: DetailSaleType[];
};

export default function SalePDF({ sale, customer, detailsSale }: SalePDFProps) {
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
    },

    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },

    titleContainer: { flexDirection: "row", marginTop: 24 },

    logo: { width: 90 },

    reportTitle: { fontSize: 16, textAlign: "center" },

    addressTitle: {
      fontSize: 11,
      fontStyle: "bold",
      textTransform: "capitalize",
    },

    invoice: { fontWeight: "bold", fontSize: 20 },

    invoiceNumber: { fontSize: 11, fontWeight: "bold" },

    address: { fontWeight: 400, fontSize: 10 },

    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
  });

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image src="/imgs/placeholder.jpg" style={styles.logo} />
        <Text style={styles.reportTitle}>Xpress Enterprises</Text>
      </View>
    </View>
  );

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.invoice}>Invoice</Text>
          <Text style={styles.invoiceNumber}>
            Invoice number: {sale.idSale}{" "}
          </Text>
        </View>
        <View>
          <Text style={styles.addressTitle}>7, Ademola Odede, </Text>
          <Text style={styles.addressTitle}>Ikeja,</Text>
          <Text style={styles.addressTitle}>Lagos, Nigeria.</Text>
        </View>
      </View>
    </View>
  );

  const UserAddress = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>Bill to </Text>
          <Text style={styles.address}>{customer.address}</Text>
        </View>
        <Text style={styles.addressTitle}>
          {formatDateToLocal(sale.createdAt)}
        </Text>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Producto</Text>
      </View>
      <View style={styles.theader}>
        <Text>Precio</Text>
      </View>
      <View style={styles.theader}>
        <Text>Cantidad</Text>
      </View>
      <View style={styles.theader}>
        <Text>Monto</Text>
      </View>
    </View>
  );

  const TableBody = () =>
    detailsSale.map((detailSale) => (
      <Fragment key={detailSale.idDetailSale}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{detailSale.product.name}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{detailSale.price} </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{detailSale.quantity}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>
              {formatCurrency(detailSale.price * detailSale.quantity)}
            </Text>
          </View>
        </View>
      </Fragment>
    ));

  const TableTotal = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.tbody}>
        <Text>Total</Text>
      </View>
      <View style={styles.tbody}>
        <Text>
          {formatCurrency(
            detailsSale.reduce(
              (sum, detailSale) => sum + detailSale.price * detailSale.quantity,
              0
            )
          )}
        </Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <Address />
        <UserAddress />
        <TableHead />
        <TableBody />
        <TableTotal />
      </Page>
    </Document>
  );
}
