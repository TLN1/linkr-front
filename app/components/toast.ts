import { Toast } from "react-native-toast-notifications";

export function showErrorToast(message: string) {
  Toast.show(message, {
    type: "danger",
    animationType: "slide-in",
  });
}

export function showSuccessToast(message: string) {
  Toast.show(message, {
    type: "success",
    animationType: "slide-in",
  });
}
