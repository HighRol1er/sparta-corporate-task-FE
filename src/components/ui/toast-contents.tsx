const ToastContent = ({
  list,
  position,
}: {
  list: ToastTypeOption[];
  position: ToastPositionType;
}) => {
  return (
    <div
      className={`absolute 
      ${position === 'top-right' ? 'top-4 right-4' : ''} 
      ${position === 'top-left' ? 'top-4 left-4' : ''} 
      ${position === 'bottom-right' ? 'bottom-4 right-4' : ''} 
      ${position === 'bottom-left' ? 'bottom-4 left-4' : ''}`}
    >
      {list.map((item) => (
        <div
          key={item.id}
          className={`p-4 mb-2 rounded-lg shadow-md ${item.animation ? 'animate-toast' : ''} 
          ${item.type === 'info' ? 'bg-blue-500' : ''}
          ${item.type === 'success' ? 'bg-green-500' : ''}
          ${item.type === 'warn' ? 'bg-yellow-500' : ''}
          ${item.type === 'danger' ? 'bg-red-500' : ''}`}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default ToastContent;
