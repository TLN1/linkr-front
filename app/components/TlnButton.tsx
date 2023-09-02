import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ButtonProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Color } from "../Constants";

interface Props extends ButtonProps {
  style?: StyleProp<ViewStyle>;
}

export default function TlnButton({ style, title, onPress }: Props) {
  return (
    <View style={style}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Color.BLACK,
  },
  buttonLabel: {
    color: Color.WHITE,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.4,
  },
});
