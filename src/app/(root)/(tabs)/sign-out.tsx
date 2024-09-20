import { View } from "react-native";

import { Button } from "@/components/base/Button";

import { useAuth } from "@/hooks/useAuth";

export default function SignOut() {
  const { signOut } = useAuth()

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