import axios from "axios";
import { useEffect, useState } from "react";

function useFetch() {
  const [username, setUsername] = useState(""); //서버에서 가져온 사용자 이름
  const [score, setScore] = useState(""); //서버에서 가져온 사용자 점수
  const [loading, setLoading] = useState(true); //로딩 상태

  const token = localStorage.getItem("token"); //로컬 스토리지에 저장된 토큰 가져오기

  useEffect(() => {
    // 유저 데이터 가져오기
    const fetchUser = async () => {
      const headerData = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (!token) setLoading(false); //토큰이 없으면 로딩 완료
      else {
        try {
          await axios
            .get("http://localhost:5000/login", headerData)
            .then((res) => {
              setUsername(res.data.username);
              setScore(res.data.score);
            });
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [token]);

  return { username, score, token, loading };
}

export default useFetch;
