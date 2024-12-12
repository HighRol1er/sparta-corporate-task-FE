import useToastStore from '@/store/toast/toastSlice';
import ToastContent from './toast-contents';

const Toast = () => {
  const { toastList } = useToastStore();

  // Toast의 옵션마다 다른 위치에 렌더링 시켜야 한다.
  const topRightList = toastList.filter(
    (toast) => toast.position === 'top-right'
  );
  const topLeftList = toastList.filter(
    (toast) => toast.position === 'top-left'
  );
  const bottomRightList = toastList.filter(
    (toast) => toast.position === 'bottom-right'
  );
  const bottomLeftList = toastList.filter(
    (toast) => toast.position === 'bottom-left'
  );

  return (
    <>
      {topRightList.length > 0 && (
        <ToastContent list={topRightList} position="top-right" />
      )}
      {topLeftList.length > 0 && (
        <ToastContent list={topLeftList} position="top-left" />
      )}
      {bottomRightList.length > 0 && (
        <ToastContent list={bottomRightList} position="bottom-right" />
      )}
      {bottomLeftList.length > 0 && (
        <ToastContent list={bottomLeftList} position="bottom-left" />
      )}
    </>
  );
};

export default Toast;
