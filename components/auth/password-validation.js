import { useState } from 'react';

function PasswordValidation() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordsMatching, setIsPasswordsMatching] = useState(true);

  const checkPasswordMatch = (pass, confirmPassword) => {
    if (pass === confirmPassword) {
      setIsPasswordsMatching(true);
      return true;
    } else {
      setIsPasswordsMatching(false);
      return false;
    }
  };

  // You can call this function on onChange events of your password fields
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setConfirmPassword(e.target.value); // This will auto-match the confirm password if you want immediate feedback
    checkPasswordMatch(password, confirmPassword);
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          checkPasswordMatch(e.target.value, confirmPassword);
        }}
        placeholder="Enter Password"
      />
      <br />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          checkPasswordMatch(password, e.target.value);
        }}
        placeholder="Confirm Password"
      />
      {isPasswordsMatching && (
        <div style={{ color: 'green' }}>Passwords match!</div>
      )}
      {!isPasswordsMatching && (
        <div style={{ color: 'red' }}>Passwords do not match.</div>
      )}
    </div>
  );
}

export default PasswordValidation;
