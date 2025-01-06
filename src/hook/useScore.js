import axios from "axios";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";

function useScore() {
  const { score, token } = useFetch();
  const navigate = useNavigate();

  const addScore = async (num) => {
    try {
      if (score === num) {
        const headerData = {
          headers: { Authorization: `Bearer ${token}` },
        };
        await axios
          .post("http://localhost:5000/score", { score: 1 }, headerData)
          .then((res) => {
            alert(res.data.message);
            navigate("/");
            window.location.reload();
          });
      } else {
        alert("정답입니다.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { addScore };
}

export default useScore;
