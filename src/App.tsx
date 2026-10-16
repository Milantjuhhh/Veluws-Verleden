import { useEffect, useState } from "react";
import HomePage from "./screens/HomePage";
import PrintScreen from "./screens/PrintScreen";
import QuizScreen from "./screens/QuizScreen";
import { SCHOOL_PLATES } from "./data/schoolPlates";
import {
  addAnsweredQuestion,
  loadQuizProgress,
  saveQuizProgress,
} from "./data/progress";

export type AppScreen = "home" | "print" | "quiz";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("home");
  const [activeSchoolPlate, setActiveSchoolPlate] = useState(SCHOOL_PLATES[2]);
  const [activeHotspot, setActiveHotspot] = useState<number>(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [quizProgress, setQuizProgress] = useState(loadQuizProgress);

  useEffect(() => {
    saveQuizProgress(quizProgress);
  }, [quizProgress]);

  const openHotspot = (n: number) => {
    setActiveHotspot(n);
    setPanelOpen(true);
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden" style={{ background: "var(--cream)" }}>
      {screen === "home" && (
        <HomePage
          quizProgress={quizProgress}
          onSelectPrint={(schoolPlate) => {
            setActiveSchoolPlate(schoolPlate);
            setPanelOpen(false);
            setScreen("print");
          }}
        />
      )}
      {screen === "print" && (
        <PrintScreen
          schoolPlate={activeSchoolPlate}
          onBack={() => setScreen("home")}
          onHotspot={openHotspot}
          panelOpen={panelOpen}
          activeHotspot={activeHotspot}
          onClosePanel={() => setPanelOpen(false)}
          onStartQuiz={() => { setPanelOpen(false); setScreen("quiz"); }}
          quizProgress={quizProgress}
        />
      )}
      {screen === "quiz" && (
        <QuizScreen
          schoolPlate={activeSchoolPlate}
          hotspot={activeHotspot}
          onBack={() => setScreen("print")}
          onQuestionAnswered={(schoolPlateId, hotspot, questionIndex) => {
            setQuizProgress((current) =>
              addAnsweredQuestion(
                current,
                schoolPlateId,
                hotspot,
                questionIndex,
              ),
            );
          }}
        />
      )}
    </div>
  );
}
