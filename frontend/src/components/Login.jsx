import { useState, useContext } from "react";
import { login } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const { isLogin, setIsLogin } = props;
  const { email, password } = props.form || {};
  const [form, setForm] = useState({ email: "", password: "" });
  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      loginUser(res.data.token); // backend must return token
    } catch (err) {
      alert("Login failed");
    }
  };
  const handleChange = ({ target }) => {
    setForm(ps => ({ ...ps, [target.name]: target.value }))
  }
  const handleClose = (e) => {
    setIsLogin(false);
  }
  return (
    <div className={isLogin ? " active" : "hidden"}>
      <section className="form-wrapper">
        <span className="close-form" onClick={handleClose}>X</span>
        <form action="" className="login-signup-form flex column align-center" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Enter your email" value={email}
            onChange={handleChange} />

          <input type="password" name="password" placeholder="Enter your password" value={password}
            onChange={handleChange} />
          <button type="submit" className="login-signup-btn">Login</button>
             <div className="to-sign-in flex"><span>Dont have an acount?</span>
            <span>Sign here</span>
          </div>
          {!isLogin && <span className="back-to-login" >Back to Login</span>}
        </form>
      </section>
    </div>
  )
}