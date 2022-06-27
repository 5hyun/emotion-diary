import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  // 페이지마다 제목 다르게 하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감성 일기장 - 새 일기`;
  }, []);
  
  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
