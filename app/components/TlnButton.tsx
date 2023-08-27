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
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonLabel}>{title}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Color.BLACK,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: Color.WHITE,
    fontSize: 16,
  },
});
