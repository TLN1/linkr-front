import { Toast } from "react-native-toast-notifications";

export function showErrorToast(message: string) {
  Toast.show(message, {
    type: "danger",
    animationType: "slide-in",
  });
}
