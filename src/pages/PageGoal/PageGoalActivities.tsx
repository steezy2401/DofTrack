//Components
import Activity from "../../components/Activity/Activity";
import ButtonAdd from "../../components/Buttons/ButtonAdd";
import Loading from "../../components/Loading/Loading";

//Modals
import { showNewTaskModal, showNewActivityModal } from "../../modal/showModal";

//Types
import { ActivityData } from "../../types/TypesActivity";
import { GoalData } from "../../types/TypesGoal";

import useGetActivities from "../../hooks/useGetActivities";

export default function PageGoalActivities({
  goalData,
}: {
  goalData: GoalData;
}) {
  const [activitiesData, loadingActivities] = useGetActivities(goalData.id);

  return !loadingActivities ? (
    <div className="p-2 flex flex-col items-start gap-5 w-96 mr-5 animate-fade-in-up">
      {activitiesData != undefined &&
        activitiesData.length > 0 &&
        activitiesData.map((item, i) => (
          <Activity
            key={item.id}
            id={item.id}
            title={item.title}
            goalTitle={goalData.title}
            timeSpent={item.timeSpent}
            difficulty={item.difficulty}
            status={item.status}
            timeLeft={item.timeLeft}
            goalId={goalData.id}
          />
        ))}
      <ButtonAdd type="ACTIVITY" action={() => showNewActivityModal(goalData.id)} />
    </div>
  ) : (
    <div></div>
  );
}
