import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function AdDetails() {
  const params = useLocalSearchParams();

  console.log(params)

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>User Ad Details</Text>
    </View>
  )
}