import { useParams, useSearchParams } from "react-router-dom";

//Components
import Loading from "../../components/Loading/Loading";
import NotFound from "../NotFound";
import NavBar from "../../components/Nav/NavBar";

//Page components
import PageGoalActivities from "./PageGoalActivities";
import PageGoalTasks from "./PageGoalTasks";

//Hooks
import useGetGoal from "../../hooks/useGetGoal";

import getPageLinks from "../../helpers/getPageLinks";

export default function PageGoal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  //console.log(filter);

  const { id } = useParams();

  if (id == undefined) {
    return <NotFound text="No such goal" />;
  }

  const [goalData, loadingGoals] = useGetGoal(id);

  const goalPageLinks = getPageLinks(id);

  return (
    <main>
      {!loadingGoals ? (
        <div className="animate-fade-in">
          {goalData != undefined ? (
            <div className="animate-fade-in">
              <header className="p-4 mb-3">
                <h1 className="text-center text-4xl font-bold">
                  {goalData.title}
                </h1>
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

              <NavBar links={goalPageLinks} />
            </div>
          ) : (
            <NotFound text="No such goal" />
          )}
          <div className="p-10">
            <div className="divTransHeight mb-10 animate-fade-in-up">
              <h1 className="text-2xl font-medium">Active</h1>
              <div className="flex flex-row justify-between w-full grow">
                <PageGoalActivities goalData={goalData} />
                <PageGoalTasks goalData={goalData} isActive={true} />
              </div>
            </div>
            <div className="divTransHeight animate-fade-in-up">
              <h1 className="text-2xl font-medium mb-3">Finished</h1>
              <PageGoalTasks goalData={goalData} isActive={false} />
            </div>
          </div>
        </div>
      ) : (
        <Loading isFull={true} />
      )}
    </main>
  );
}
