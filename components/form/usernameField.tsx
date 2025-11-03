import { Field, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

interface UsernameFieldProps {
  label: string;
  name: string;
  error: string | undefined;
  onUsernameChange: (username: string) => void;
  usernameStatus: {
    checking: boolean;
    available: boolean | null;
    message: string;
  };
}

export default function UsernameField({
  label,
  name,
  error,
  onUsernameChange,
  usernameStatus,
}: UsernameFieldProps) {
  const { values } = useFormikContext<{ username: string }>();

  useEffect(() => {
    onUsernameChange(values.username);
  }, [values.username, onUsernameChange]);

  const getStatusIcon = () => {
    if (usernameStatus.checking) {
      return (
        <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      );
    }
    if (usernameStatus.available === true) {
      return <IoCheckmarkCircle className="text-green-500" size={20} />;
    }
    if (usernameStatus.available === false) {
      return <IoCloseCircle className="text-red-500" size={20} />;
    }
    return null;
  };

  const getStatusMessage = () => {
    if (usernameStatus.checking) {
      return 'Checking availability...';
    }
    if (usernameStatus.available === true) {
      return 'Username is available';
    }
    if (usernameStatus.available === false) {
      return 'Username is already taken';
    }
    return '';
  };

  const getStatusColor = () => {
    if (usernameStatus.checking) return 'text-blue-500';
    if (usernameStatus.available === true) return 'text-green-500';
    if (usernameStatus.available === false) return 'text-red-500';
    return '';
  };

  return (
    <div className="flex flex-col m-2 my-4">
      <label className="flex flex-col w-60 font">
        {label}
        <div className="relative">
          <Field name={name} type="text" className="border rounded my-2 p-1 pr-8 w-full" />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {getStatusIcon()}
          </div>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {usernameStatus.message && !error && (
          <div className={`text-sm ${getStatusColor()}`}>{getStatusMessage()}</div>
        )}
      </label>
    </div>
  );
}
