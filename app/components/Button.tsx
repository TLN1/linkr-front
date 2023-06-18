import { StyleSheet, View, Pressable, Text } from "react-native";
import { Color } from "../Constants";

type Props = {
  label: string;
};

function onPress(label: string) {
  alert(label);
}

export default function Button({ label }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => onPress(label)}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
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
