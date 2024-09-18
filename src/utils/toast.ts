import { toast, TypeOptions } from "react-toastify";
type IType = TypeOptions;

const toastNotify = (msg: string, type: IType, loading?: boolean) => {
  return (toast as any)[type](msg);
};
export default toastNotify;
