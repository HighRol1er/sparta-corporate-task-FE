type ToastAnimationType =
  | 'hide-top-right'
  | 'hide-top-left'
  | 'hide-bottom-right'
  | 'hide-bottom-left'
  | null;
// Toast가 발생할 위치
type ToastPositionType =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';
interface ToastTypeOption {
  id: string;
  content: string;
  showCloseButton: boolean;
  position: ToastPositionType;
  type: 'info' | 'success' | 'warn' | 'danger';
  autoClose: number;
  animation: ToastAnimationType;
}
