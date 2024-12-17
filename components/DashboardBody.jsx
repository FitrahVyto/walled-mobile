import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import sunIcon from "../assets/sun.png";
import plusIcon from "../assets/plus.png";
import sendIcon from "../assets/send.png";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DashboardBody({ fullname, balance, accountNumber }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [transactions, setTransactions] = useState([]); // State untuk menyimpan transaksi
  const [loading, setLoading] = useState(true); // State untuk indikator loading

  // Fungsi untuk fetch transaksi dari backend
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get("https://walled-api.vercel.app/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data.data); // Simpan data transaksi ke state
    } catch (error) {
      console.error("Error fetching transactions", error);
    } finally {
      setLoading(false); // Matikan indikator loading
    }
  };

  // Toggle balance visibility
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  useEffect(() => {
    fetchTransactions(); // Panggil fetchTransactions ketika komponen di-mount
  }, []);

  return (
    <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <View style={styles.greetingRow}>
          <View style={{ flex: 1, rowGap: 20 }}>
            <Text style={styles.greetingText}>Good Morning, {fullname}</Text>
            <Text style={styles.greetingSub}>Check all your incoming and outgoing transactions here</Text>
          </View>
          <Image source={sunIcon} style={styles.iconImage} />
        </View>
      </View>

      {/* Account Info */}
      <View style={styles.accountBox}>
        <Text style={styles.accountLabel}>Account No.</Text>
        <Text style={styles.accountLabel}>{accountNumber}</Text>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceSection}>
        <View style={styles.balanceInfo}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isBalanceVisible ? (
              <Text style={styles.balanceValue}>Rp {parseFloat(balance).toLocaleString("id-ID")}</Text>
            ) : (
              <Text style={styles.balanceValue}>Rp ********</Text>
            )}

            <TouchableOpacity onPress={toggleBalanceVisibility} style={{ marginLeft: 4 }}>
              {isBalanceVisible ? (
                <Entypo name="eye" size={15} color="black" right={5} marginTop={5} />
              ) : (
                <Entypo name="eye-with-line" size={15} color="black" right={5} marginTop={5} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <View style={styles.actionButton}>
            <Image source={plusIcon} style={styles.actionButtonIcon} />
          </View>

          <View style={styles.actionButton}>
            <Image source={sendIcon} style={styles.actionButtonIcon} />
          </View>
        </View>
      </View>

      {/* Transaction History */}
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionHeader}>Transaction History</Text>

        {/* Loading State */}
        {loading ? (
          <ActivityIndicator size="large" color="#19918F" />
        ) : (
          transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={styles.avatarPlaceholder}></View>
                <View style={styles.transactionTextBlock}>
                  <Text style={styles.transactionName}>ID: {transaction.id}</Text>
                  <Text style={styles.transactionType}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.transaction_date).toLocaleDateString("id-ID")}
                  </Text>
                </View>
              </View>
              <Text
                style={
                  transaction.transaction_type === "top-up"
                    ? styles.transactionAmountPlus
                    : styles.transactionAmountMinus
                }
              >
                {transaction.transaction_type === "top-up" ? `+ ${parseFloat(transaction.amount).toLocaleString("id-ID")}` : `- ${parseFloat(transaction.amount).toLocaleString("id-ID")}`}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 16
  },
  greetingContainer: {
    marginBottom: 16
  },
  greetingRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 10,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  greetingSub: {
    fontSize: 14,
    color: '#555'
  },
  iconImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginLeft: 8
  },
  emojiIcon: {
    fontSize: 20
  },

  accountBox: {
    backgroundColor: '#19918F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  accountLabel: {
    color: '#fff',
    fontSize: 14
  },
  accountNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4
  },

  balanceSection: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1
  },
  balanceInfo: {
    flex: 1
  },
  balanceLabel: {
    fontSize: 14,
    color: '#555'
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    marginRight: 8
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 10
  },
  actionButton: {
    backgroundColor: '#19918F',
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  actionButtonIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff'
  },

  transactionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1
  },
  transactionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 12
  },
  transactionTextBlock: {
    flexDirection: 'column'
  },
  transactionName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  transactionType: {
    fontSize: 12,
    color: '#555'
  },
  transactionDate: {
    fontSize: 12,
    color: '#999'
  },
  transactionAmountMinus: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold'
  },
  transactionAmountPlus: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold'
  }
});
