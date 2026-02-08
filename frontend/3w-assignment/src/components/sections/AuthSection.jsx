import { AuthForm } from "../AuthForm";
import { EMPTY_AUTH, AUTH_MODES } from "../../constants";

export const AuthSection = ({
  authMode,
  authForm,
  status,
  onAuthModeChange,
  onFormChange,
  onAuthSubmit,
}) => {
  return (
    <AuthForm
      mode={authMode}
      form={authForm}
      onChange={(field, value) => onFormChange({ ...authForm, [field]: value })}
      onSubmit={onAuthSubmit}
      onModeChange={onAuthModeChange}
      loading={status.loading}
    />
  );
};
