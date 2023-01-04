import axios from "axios";
import { useCallback, useState } from "react";
import Title from "./Title";

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
      <Title title={"회원 가입"} />
      <form onSubmit={createAuth}>
        <div className="id-input__container">
          <div className="flex">
            <div className="input-title__container">아이디(이메일)</div>
            <input
              type="text"
              value={id}
              placeholder="아이디를 입력해 주세요."
              onChange={changeId}
              required
            />
          </div>
        </div>
        <div className="password-input__container">
          <div className="flex">
            <div className="input-title__container">비밀번호</div>
            <input
              type="password"
              value={password}
              placeholder="비밀번호를 입력해 주세요."
              onChange={changePassword}
              required
            />
          </div>
        </div>
        <div className="name-input__container">
          <div className="flex">
            <div className="input-title__container">이름</div>
            <input
              type="text"
              value={name}
              placeholder="이름을 입력해 주세요."
              onChange={changeName}
              required
            />
          </div>
        </div>
        <div className="nickname-input__container">
          <div className="flex">
            <div className="input-title__container">닉네임</div>
            <input
              type="text"
              value={nickname}
              placeholder="닉네임을 입력해 주세요."
              onChange={changeNickname}
              required
            />
          </div>
        </div>
        <div className="submit__container">
          <input type="submit" value="가입" />
        </div>
      </form>
    </div>
  );
};
