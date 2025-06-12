import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils";

const CATEGORY_ICONS = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};

export const Transactionitem = ({ item, onDelete }) => {
  const IsIncome = parseFloat(item.amount) > 0;
  const iconName = CATEGORY_ICONS[item.category?.trim()] || "pricetag-outline";

  return (
    <View style={styles.transactionCard}>
      <TouchableOpacity style={styles.transactionContent}>
        {/* Icon */}
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={iconName}
            size={22}
            color={IsIncome ? COLORS.income : COLORS.expense}
          />
        </View>

        {/* Title and Category */}
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.transactionCategory} numberOfLines={1}>
            {item.category}
          </Text>
        </View>

        {/* Amount and Date */}
        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: IsIncome ? COLORS.income : COLORS.expense },
            ]}
          >
            {IsIncome ? "+" : "-"}$
            {Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(item.created_at)}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};
