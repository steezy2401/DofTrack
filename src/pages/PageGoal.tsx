import NiceModal from "@ebay/nice-modal-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//Components
import Activity from "../components/Activity/Activity";
import TaskActive from "../components/Tasks/TaskActive";
import TaskFinished from "../components/Tasks/TaskFinished";
import ButtonAdd from "../components/Buttons/ButtonAdd";
import NavBar from "../components/Nav/NavBar";

//Types
import { GoalData } from "../types/TypesGoal";
import { ActivityData } from "../types/TypesActivity";
import { TaskData } from "../types/TypesTask";

//Constants
import { GoalPageLinks } from "../constants/ConstantsGoalPageLinks";

//!Mock data START
const data = {
  id: "123",
  title: "Learn Javascript",
  gems: 1790,
  goalGems: 3000,
};

const tasks: TaskData[] = [
  {
    id: "123",
    title: "Do the project",
    goalTitle: "Learn Javascript",
    text: '123',
    isMore: true,
    deadline: new Date(),
    difficulty: "MEDIUM",
  },
];

const activities: ActivityData[] = [
  {
    id: "123",
    title: "Do the project",
    goalTitle: "Learn Javascript",
    timeSpent: "1hr 30min",
    goalTime: {HOURS: 3, MINUTES: 15},
    difficulty: "EASY",
  },
];
//!Mock data END

export default function PageGoal() {
  const { id } = useParams();

  const [isBusy, setIsBusy] = useState(true);

  const [goalData, setGoalData] = useState({} as GoalData);
  const [tasksData, setTasksData] = useState([] as TaskData[]);
  const [activitiesData, setActivitiesData] = useState([] as ActivityData[]);

  const showNewTaskModal = (goalId: string) => {
    NiceModal.show("TaskNewModal", { goalId });
  };

  const showNewActivityModal = (goalId: string) => {
    NiceModal.show("ActivityNewModal", { goalId });
  };

  useEffect(() => {
    //API Call
    //TODO: Get Goal from database

    //! Mock data
    setGoalData(data);
    setTasksData(tasks);
    setActivitiesData(activities);
    setIsBusy(false);
  }, []);

  return (
    <main>
      {!isBusy && (
        <div>
          <header className="p-4 mb-3">
            <h1 className="text-center text-4xl font-bold">{goalData.title}</h1>
            <div className="flex justify-center gap-1">
              <h2 className="text-center text-2xl">
                {goalData.gems} / {goalData.goalGems}{" "}
              </h2>
              <img
                className="object-scale-down w-6"
                src="/images/gem.png"
              ></img>
            </div>
          </header>

          <NavBar links={GoalPageLinks} />
          <div className="p-10">
            <div className="mb-10">
              <h1 className="text-2xl font-medium">Active</h1>
              <div className="flex flex-row justify-between w-full grow">
                <div className="p-2 flex flex-col items-start gap-5 w-96 mr-5">
                  {activitiesData.map((item, i) => (
                    <Activity
                      key={i}
                      id={item.id}
                      title={item.title}
                      goalTitle={item.goalTitle}
                      timeSpent={item.timeSpent}
                      difficulty={item.difficulty}
                    />
                  ))}
                  <ButtonAdd action={() => showNewActivityModal("123")} />
                </div>
                <div className="p-2 flex flex-row justify-start content-start gap-5 items-start w-full flex-wrap ">
                  {tasksData.map((item, i) => (
                    <TaskActive
                      key={i}
                      id={item.id}
                      title={item.title}
                      goalTitle={item.goalTitle}
                      isMore={item.isMore}
                      deadline={item.deadline}
                      difficulty={item.difficulty}
                    />
                  ))}
                  <ButtonAdd action={() => showNewTaskModal("123")} />
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-medium mb-3">Finished</h1>
              <div className="flex flex-row justify-start content-start gap-5 items-start w-full flex-wrap">
                {tasksData.map((x, i) => (
                  <TaskFinished
                    key={i}
                    id="123"
                    title="Do the project"
                    goalTitle="Learn Javascript"
                    isMore={true}
                    deadline={new Date()}
                    difficulty="MEDIUM"
                    gems={2}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
