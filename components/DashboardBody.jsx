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
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // State untuk menyimpan balance dari backend
  const [currentBalance, setCurrentBalance] = useState(balance);

  const fetchTransactions = async () => {
    try {
      setIsRefreshing(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get("https://walled-api-phi.vercel.app/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      const response = await axios.get("https://walled-api-phi.vercel.app/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = response.data.data;
      
      // Ambil balance dari profileData
      if (profileData && profileData.wallet && profileData.wallet.balance) {
        setCurrentBalance(parseFloat(profileData.wallet.balance));
      }
    } catch (error) {
      console.error("Error fetching profile and balance:", error);
    }
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  useEffect(() => {
    // Pertama kali komponen mount, fetch data transaksi dan profile
    fetchTransactions();
    fetchProfile();

    // Buat interval untuk update transaksi dan balance secara berkala
    const interval = setInterval(() => {
      fetchTransactions();
      fetchProfile();
    }, 10000);

    return () => clearInterval(interval);
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
              <Text style={styles.balanceValue}>Rp {parseFloat(currentBalance).toLocaleString("id-ID")}</Text>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.transactionHeader}>Transaction History</Text>
          {isRefreshing && <ActivityIndicator size="small" color="#19918F" />}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#19918F" />
        ) : (
          transactions
            .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
            .map((transaction) => (
              <View key={transaction.id || transaction._id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={styles.avatarPlaceholder}></View>
                  <View style={styles.transactionTextBlock}>
                    <Text style={styles.transactionName}>{transaction.recipient_username}</Text>
                    <Text style={styles.transactionType}>{transaction.description}</Text>
                    <Text style={styles.transactionDate}>
                      {new Date(transaction.transaction_date).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
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
                  {transaction.transaction_type === "top-up"
                    ? `+ ${parseFloat(transaction.amount).toLocaleString("id-ID")}`
                    : `- ${parseFloat(transaction.amount).toLocaleString("id-ID")}`}
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
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  greetingContainer: {
    marginBottom: 16,
  },
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
    gap: 10,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  greetingSub: {
    fontSize: 14,
    color: "#555",
  },
  iconImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginLeft: 8,
  },
  accountBox: {
    backgroundColor: "#19918F",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  accountLabel: {
    color: "#fff",
    fontSize: 14,
  },
  balanceSection: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#555",
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
    marginRight: 8,
  },
  actionButtons: {
    flexDirection: "column",
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#19918F",
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  actionButtonIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#fff",
  },
  transactionContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  transactionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 12,
  },
  transactionTextBlock: {
    flexDirection: "column",
  },
  transactionName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  transactionType: {
    fontSize: 12,
    color: "#555",
  },
  transactionDate: {
    fontSize: 12,
    color: "#999",
  },
  transactionAmountMinus: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  transactionAmountPlus: {
    fontSize: 14,
    color: "green",
    fontWeight: "bold",
  },
});
