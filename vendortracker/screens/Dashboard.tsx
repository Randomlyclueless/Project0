import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";

const { width } = Dimensions.get("window");

interface DashboardData {
  todaySales: number;
  inventoryLeft: number;
  transactions: number;
  expiringSoon: number;
  salesGrowth: number;
  revenue: number;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
  change?: string;
  delay: number;
}

interface ActionButtonProps {
  title: string;
  icon: string;
  onPress: () => void;
  bgColor: string;
}

const Dashboard: React.FC = () => {
  const [data] = useState<DashboardData>({
    todaySales: 2400,
    inventoryLeft: 145,
    transactions: 12,
    expiringSoon: 4,
    salesGrowth: 12.5,
    revenue: 45600,
  });

  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  const animateEntrance = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  useEffect(() => {
    animateEntrance();
  }, [animateEntrance]);

  const handleQuickAction = useCallback((action: string) => {
    Alert.alert("Quick Action", `${action} functionality coming soon!`, [
      { text: "OK", style: "default" },
    ]);
  }, []);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    bgColor,
    change,
    delay,
  }) => {
    const [cardScale] = useState(new Animated.Value(0.9));

    const animateCard = useCallback(() => {
      Animated.spring(cardScale, {
        toValue: 1,
        delay: delay * 100,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, [cardScale, delay]);

    useEffect(() => {
      animateCard();
    }, [animateCard]);

    return (
      <Animated.View
        style={[
          styles.statCard,
          { backgroundColor: bgColor, transform: [{ scale: cardScale }] },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>{icon}</Text>
          {change && (
            <View style={styles.changeContainer}>
              <Text style={styles.changeText}>+{change}%</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.cardShine} />
      </Animated.View>
    );
  };

  const ActionButton: React.FC<ActionButtonProps> = ({
    title,
    icon,
    onPress,
    bgColor,
  }) => {
    const [buttonScale] = useState(new Animated.Value(1));

    const handlePressIn = () => {
      Animated.spring(buttonScale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(buttonScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: bgColor }]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <Text style={styles.actionIcon}>{icon}</Text>
          <Text style={styles.actionText}>{title}</Text>
          <View style={styles.buttonShine} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{getTimeBasedGreeting()}!</Text>
              <Text style={styles.title}>Vyapaari Dashboard</Text>
            </View>
            <View style={styles.notificationContainer}>
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => handleQuickAction("Notifications")}
              >
                <Text style={styles.notificationIcon}>🔔</Text>
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Revenue Overview */}
          <Animated.View
            style={[styles.revenueCard, { transform: [{ scale: scaleAnim }] }]}
          >
            <View style={styles.revenueContent}>
              <Text style={styles.revenueLabel}>Total Revenue</Text>
              <Text style={styles.revenueValue}>
                {formatCurrency(data.revenue)}
              </Text>
              <View style={styles.revenueStats}>
                <Text style={styles.revenueGrowth}>
                  ↗ +{data.salesGrowth}% from last month
                </Text>
              </View>
              <View style={styles.revenueShine} />
            </View>
          </Animated.View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              title="Today's Sales"
              value={formatCurrency(data.todaySales)}
              icon="💰"
              bgColor="#1a4f3a"
              change="8.2"
              delay={0}
            />
            <StatCard
              title="Inventory Left"
              value={`${data.inventoryLeft} items`}
              icon="📦"
              bgColor="#2d3561"
              delay={1}
            />
            <StatCard
              title="Transactions"
              value={data.transactions.toString()}
              icon="🧾"
              bgColor="#5a2d4a"
              change="15.3"
              delay={2}
            />
            <StatCard
              title="Expiring Soon"
              value={`${data.expiringSoon} products`}
              icon="⏰"
              bgColor="#5a4a2d"
              delay={3}
            />
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <ActionButton
                title="Add Inventory"
                icon="📋"
                onPress={() => handleQuickAction("Add Inventory")}
                bgColor="#2d3561"
              />
              <ActionButton
                title="View Reports"
                icon="📊"
                onPress={() => handleQuickAction("View Reports")}
                bgColor="#5a2d4a"
              />
              <ActionButton
                title="QR Scanner"
                icon="📱"
                onPress={() => handleQuickAction("QR Scanner")}
                bgColor="#1a4f3a"
              />
              <ActionButton
                title="Settings"
                icon="⚙️"
                onPress={() => handleQuickAction("Settings")}
                bgColor="#5a4a2d"
              />
            </View>
          </View>

          {/* AI Assistant */}
          <TouchableOpacity
            style={styles.aiAssistant}
            onPress={() => handleQuickAction("Vyom AI Assistant")}
            activeOpacity={0.8}
          >
            <View style={styles.aiContent}>
              <Text style={styles.aiIcon}>🤖</Text>
              <View style={styles.aiText}>
                <Text style={styles.aiTitle}>Vyom AI Assistant</Text>
                <Text style={styles.aiSubtitle}>
                  Ask me anything about your business
                </Text>
              </View>
              <Text style={styles.aiArrow}>→</Text>
            </View>
            <View style={styles.aiShine} />
          </TouchableOpacity>

          {/* Performance Metrics */}
          <View style={styles.metricsSection}>
            <Text style={styles.sectionTitle}>Performance Metrics</Text>
            <View style={styles.metricsContainer}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Conversion Rate</Text>
                <Text style={styles.metricValue}>68%</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "68%" }]} />
                </View>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Customer Satisfaction</Text>
                <Text style={styles.metricValue}>4.8/5</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "96%" }]} />
                </View>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Stock Turnover</Text>
                <Text style={styles.metricValue}>12.3x</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "85%" }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Footer Space */}
          <View style={styles.footer} />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 50,
    marginBottom: 25,
  },
  greeting: {
    fontSize: 16,
    color: "#888",
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  notificationContainer: {
    position: "relative",
  },
  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#ff4757",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  revenueCard: {
    marginBottom: 25,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#667eea",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  revenueContent: {
    padding: 25,
    position: "relative",
    overflow: "hidden",
  },
  revenueShine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.1)",
    transform: [{ rotate: "45deg" }, { translateX: -50 }],
  },
  revenueLabel: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 8,
  },
  revenueValue: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
  revenueStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  revenueGrowth: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statCard: {
    width: (width - 55) / 2,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
    minHeight: 120,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardShine: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  cardIcon: {
    fontSize: 24,
  },
  changeContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  cardValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
  },
  actionsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: (width - 55) / 2,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonShine: {
    position: "absolute",
    top: -10,
    left: -10,
    width: 30,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  aiAssistant: {
    borderRadius: 20,
    backgroundColor: "#667eea",
    padding: 20,
    marginBottom: 25,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  aiShine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  aiContent: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  aiIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  aiText: {
    flex: 1,
  },
  aiTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  aiSubtitle: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
  },
  aiArrow: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  metricsSection: {
    marginBottom: 25,
  },
  metricsContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  metricItem: {
    marginBottom: 20,
  },
  metricLabel: {
    color: "#888",
    fontSize: 14,
    marginBottom: 8,
  },
  metricValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#333",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#667eea",
    borderRadius: 3,
  },
  footer: {
    height: 20,
  },
});
