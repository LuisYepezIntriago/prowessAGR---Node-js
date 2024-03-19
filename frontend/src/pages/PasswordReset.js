import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./ModalPassword"; // Componente para mostrar los modales
import "./PasswordReset.css";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showCodeVerificationModal, setShowCodeVerificationModal] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCancel = () => navigate("/login");

  const fetchData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 200) return await response.json(); // Petición exitosa
      else if (response.status === 400) throw new Error("Solicitud inválida.");
      else if (response.status === 500) throw new Error("Error de servidor.");

    } catch (err) {
      setError(err.message);
      throw err; // Relanzar para manejar en el catch del llamador
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await fetchData("http://localhost:5000/fb/usuario/password-recovery", { email });
      setShowCodeVerificationModal(true);
    } catch (err) {
      // El manejo de errores se realiza dentro de fetchData
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await fetchData("http://localhost:5000/fb/usuario/password-verify", { email, code: recoveryCode });
      setShowCodeVerificationModal(false);
      setShowChangePasswordModal(true);
    } catch (err) {
      // El manejo de errores se realiza dentro de fetchData
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await fetchData("http://localhost:5000/fb/usuario/password-reset", { email, code: recoveryCode, newPassword });
      setShowChangePasswordModal(false);
      navigate("/login"); // O muestra un mensaje de éxito
    } catch (err) {
      // El manejo de errores se realiza dentro de fetchData
    }
  };

  return (
    <div className="password-reset-container">
      <h2 className="password-reset-title">Recuperación de Contraseña</h2>
      {error && <p className="password-reset-error">{error}</p>}
      <form onSubmit={handleSubmitEmail} className="password-reset-form">
        <input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="password-reset-input"
          required
        />
        <div className="password-reset-buttons">
          <button type="submit" className="password-reset-button">Enviar Código</button>
          <button type="button" className="password-reset-cancel" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>

      {showCodeVerificationModal && (
        <Modal onClose={() => setShowCodeVerificationModal(false)}>
          <h3>Verificar Código</h3>
          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              placeholder="Código de recuperación"
              value={recoveryCode}
              onChange={(e) => setRecoveryCode(e.target.value)}
              required
            />
            <button type="submit">Verificar Código</button>
          </form>
        </Modal>
      )}

      {showChangePasswordModal && (
        <Modal onClose={() => setShowChangePasswordModal(false)}>
          <h3>Cambiar Contraseña</h3>
          <form onSubmit={handleChangePassword}>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Cambiar Contraseña</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default PasswordReset;
