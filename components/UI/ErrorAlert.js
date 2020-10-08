import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const ErrorAlert = ({ error, onClearError }) => (
  <div className="relative mb-4 p-4 border border-red-600 rounded bg-red-100 text-red-600">
    <Icon
      path={mdiClose}
      size={0.9}
      className="absolute top-1/4 right-1/4 cursor-pointer"
      color="#E53E3E"
      onClick={onClearError}
    />
    {error}
  </div>
);

export default ErrorAlert;
