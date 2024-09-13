import { View } from "react-native";

import { useSession } from "@/contexts/AuthContext";
import { Button } from "@/components/base/Button";

export default function SingOut() {
  const { signOut } = useSession()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Button
        title="Temp sing out button"
        variant="blue"
        onPress={signOut}
      />
    </View>
  )
}