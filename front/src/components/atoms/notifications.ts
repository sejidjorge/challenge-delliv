import { toast } from "react-toastify";

export default function Notification({
  message,
  type,
}: {
  message: string;
  type: string;
}) {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    case "error":
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    case "warning":
      toast.warn(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    case "info":
      toast.info(message, {
        position: toast.POSITION.TOP_CENTER,
      });

    default:
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
  }
}
