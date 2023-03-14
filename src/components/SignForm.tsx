import axios from "axios";
import moment from "moment";
import { useCallback, useState } from "react";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Title from "./common/Title";

export const SignUpForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const changeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);
  const changePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);
  const changeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);
  const changeNickname = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }, []);

  const createAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`/gossing/users`, {
        email: id,
        password,
        name,
        nickname,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-form__container">
      <div className="sign-up-header__container flex">
        <Title title={"회원 가입"} />
      </div>
      <form onSubmit={createAuth}>
        <div className="id-input__container">
          <div className="input-title">아이디(이메일)</div>
          <input
            className="id__input"
            type="text"
            value={id}
            placeholder="아이디를 입력해 주세요."
            onChange={changeId}
            required
          />
        </div>
        <div className="password-input__container">
          <div className="input-title">비밀번호</div>
          <input
            className="password__input"
            type="password"
            value={password}
            placeholder="비밀번호를 입력해 주세요."
            onChange={changePassword}
            required
          />
        </div>
        <div className="name-input__container">
          <div className="input-title">이름</div>
          <input
            className="name__input"
            type="text"
            value={name}
            placeholder="이름을 입력해 주세요."
            onChange={changeName}
            required
          />
        </div>
        <div className="nickname-input__container">
          <div className="input-title">닉네임</div>
          <input
            className="nickname__input"
            type="text"
            value={nickname}
            placeholder="닉네임을 입력해 주세요."
            onChange={changeNickname}
            required
          />
        </div>
        <div className="submit__container">
          <input type="submit" value="가입" />
        </div>
      </form>
    </div>
  );
};

interface SignInProps {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInForm = ({ setIsSignIn }: SignInProps) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const navigate = useNavigate();

  const changeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);
  const changePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/gossing/auth/login", {
        email: id,
        password,
      })
      .then((res) => {
        cookies.set("refreshToken", res.data.refreshToken, {
          secure: true,
        });
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("expiresAt", moment().add(20, "minute").format("yyyy-MM-DD HH:mm:ss"));
        setIsSignIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-form__container">
      <div className="sign-in-header__container flex">
        <Title title={"로그인"} />
      </div>
      <form onSubmit={login}>
        <div className="id-input__container">
          <div className="input-title">아이디(이메일)</div>
          <input
            className="id__input"
            type="text"
            value={id}
            placeholder="아이디를 입력해 주세요."
            onChange={changeId}
            required
          />
        </div>
        <div className="password-input__container">
          <div className="input-title">비밀번호</div>
          <input
            className="password__input"
            type="password"
            value={password}
            placeholder="비밀번호를 입력해 주세요."
            onChange={changePassword}
            required
          />
        </div>
        <div className="submit__container">
          <input type="submit" value="로그인" />
          <div className="sign-buttons__container">
            <Link to={"/signup"} className="move-sign-up__link">
              아직 회원이 아닌 경우 →
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
