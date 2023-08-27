import Toast from "react-native-root-toast";
import { Color } from "../Constants";

export function showErrorToast(message: string) {
  Toast.show(message, {
    opacity: 100,
    backgroundColor: Color.LIGHT_RED,
    textColor: Color.BLACK,
    textStyle: {
      fontWeight: "bold",
    },
    containerStyle: {
      borderLeftWidth: 4,
      borderLeftColor: Color.RED,
      alignContent: "center",
      justifyContent: "center",
    },
  });
}
