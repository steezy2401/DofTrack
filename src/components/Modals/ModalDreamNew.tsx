import { useState, useEffect } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase/firebase";

import { DreamData } from "../../types/TypesDream";
import Button from "../Buttons/Button";

import { DreamSchema } from "../../schemas/dreamsSchema";

export default NiceModal.create(() => {
  const modal = useModal();

  const [newDreamData, setNewDreamData] = useState<DreamData>({} as DreamData);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [goalGems, setGoalGems] = useState("");

  const handleChangeTitle = (e: any) => {
    setNewDreamData((prevState) => ({ ...prevState, title: e.target.value }));
  };

  const handleChangeGoalGems = (e: any) => {
    let gems = e.target.value;
    setGoalGems(gems);
  };

  const handleIncGoalGems = () => {
    setGoalGems((prev) => "" + (parseInt(prev == "" ? "0" : prev) + 500));
  };

  const handleDecGoalGems = () => {
    setGoalGems((prev) => {
      const p = prev == "" ? 0 : parseInt(prev);
      const min = p - 500 < 0 ? 0 : 500;
      return "" + (p - min);
    });
  };

  const handleSave = async () => {
    console.log(newDreamData);

    if (!buttonLoading) {
      setButtonLoading(true);
      //Validation
      let newDream = {
        ...newDreamData,
        isActive: true,
        gems: 0,
        goalsNumber: 0,
        tasksNumber: 0,
        creationDate: serverTimestamp(),
      };

      const dream = DreamSchema.safeParse(newDream);

      if (dream.success) {
        modal.remove();
        await addDoc(collection(db, "dreams"), newDream);
      } else {
        console.log(dream.error);
        setButtonLoading(false);
      }
    }
  };

  useEffect(() => {
    setNewDreamData((prevState) => ({
      ...prevState,
      goalGems: parseInt(goalGems),
    }));
  }, [goalGems]);

  return (
    <div
      className={`min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 animate-fade-in`}
    >
      <div
        className="absolute bg-black opacity-80 inset-0 z-0 "
        onClick={modal.remove}
      ></div>
      <div className="w-full max-w-lg p-1 px-2 relative mx-auto my-auto rounded-lg shadow-lg bg-white animate-fade-in-up">
        <div className="flex flex-col mb-1">
          <input
            name="title"
            onChange={(e) => handleChangeTitle(e)}
            placeholder="Title"
            className="mr-6 font-medium text-black text-3xl border-b-2 border-dashed border-grey-darker outline-none"
          ></input>
        </div>
        <div className="flex justify-center items-center my-10 gap-6">
          <div
            onClick={handleDecGoalGems}
            className="text-4xl select-none cursor-pointer"
          >
            <span className="text-blue">-</span>
          </div>
          <div className="flex flex-row outline-dashed outline-2 outline-grey-func rounded-md px-4">
            <img className="object-scale-down w-6" src="/images/gem.png"></img>
            <input
              className="text-6xl text-center max-w-xs p-3 border-0 outline-none text-grey-darker"
              onInput={(e) => handleChangeGoalGems(e)}
              type="number"
              pattern="[0-9]*"
              value={goalGems}
              placeholder="Gems"
            ></input>
          </div>
          <div
            onClick={handleIncGoalGems}
            className="text-blue text-4xl select-none cursor-pointer"
          >
            <span className="text-blue">+</span>
          </div>
        </div>
        <div className="mt-2 mb-1 grid place-items-end">
          <Button type="save" loading={buttonLoading} action={handleSave} />
        </div>
      </div>
    </div>
  );
});
