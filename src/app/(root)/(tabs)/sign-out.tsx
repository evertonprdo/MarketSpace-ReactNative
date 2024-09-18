import { View } from "react-native";

import { useSession } from "@/contexts/AuthContext";
import { Button } from "@/components/base/Button";

export default function SignOut() {
  const { signOut } = useSession()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Button
        title="Temp sign out button"
        variant="blue"
        onPress={signOut}
      />
    </View>
  )
}