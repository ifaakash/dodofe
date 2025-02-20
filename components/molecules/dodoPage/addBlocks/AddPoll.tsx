import NewButton from "@components/atoms/Button/NewButton";
import Input from "@components/atoms/Input";
import { createBlock } from "api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FullDonutChart from "@components/atoms/Charts/FullDonutChart";
import PollResponses from "../PollResponses";
import { useDispatch } from "react-redux";
import { addBlock } from "store/slice/blocksSlice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const AddPoll = ({
  dodoPageId,
  userId,
  dodopageUrl,
  mode,
  blockData,
}: {
  dodoPageId: string;
  userId: string;
  dodopageUrl: string;
  mode: "edit" | "add";
  blockData?: any;
}) => {
  const [poll, setPoll] = useState({
    question: "",
    options: ["", "", "", ""],
    allowMultipleOptions: false,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...poll.options];
    newOptions[index] = value;
    setPoll({ ...poll, options: newOptions });
  };

  const handleToggleMultiple = () => {
    setPoll({ ...poll, allowMultipleOptions: !poll.allowMultipleOptions });
  };

  const handleSubmit = async () => {
    // const res = await createBlock({
    //   dodoPageId: dodoPageId,
    //   blockType: "POLL",
    //   blockCardSize: "LARGE",
    //   blockData: {
    //     question: poll.question,
    //     options: poll.options,
    //     isMultipleOptionsAllowed: poll.allowMultipleOptions,
    //   },
    //   userId: userId,
    // });
    // if (res.success) {
    //   router.push("/dodo/" + dodopageUrl);
    // }

    dispatch(
      addBlock({
        id: uuidv4(),
        blockType: "POLL",
        blockCardSize: "LARGE",
        blockData: {
          question: poll.question,
          options: poll.options,
          isMultipleOptionsAllowed: poll.allowMultipleOptions,
        },
        userId: userId,
        dodoPageId: dodoPageId,
        isNew: true,
      })
    );

    router.back();
  };

  const handleUpdate = async () => {
    console.log("Update");
  };

  return (
    <div className="mt-5 flex flex-col gap-6 items-center">
      {mode === "edit" && <PollResponses pollData={blockData} />}

      {mode === "edit" && (
        <div className="w-full">
          <div
            style={{
              border: "1px solid #C1C7D9",
              borderStyle: "dashed",
              borderWidth: "0.5px",
              borderImage:
                "repeating-linear-gradient(to right, #C1C7D0 0, #C1C7D0 5px, transparent 5px, transparent 10px) 1",
            }}
          ></div>
        </div>
      )}

      <div className="flex flex-col gap-6 w-full items-center">
        <div className="flex flex-col gap-2 w-full">
          <div className="text-[#414D55] font-semibold">Question</div>
          <Input
            name="question"
            value={mode === "edit" ? blockData?.question : poll.question}
            placeholder="Enter your question here"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPoll({ ...poll, question: e.target.value })
            }
            maxLength={200}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="text-[#414D55] font-semibold">Options</div>
          <div className="flex flex-col gap-1">
            {mode === "edit"
              ? blockData?.options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      disabled={true}
                      name={`option-${index}`}
                      value={option}
                    />
                  </div>
                ))
              : poll.options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      name={`option-${index}`}
                      value={option}
                      placeholder={`Option`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOptionChange(index, e.target.value)
                      }
                      maxLength={100}
                    />
                  </div>
                ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 items-center w-full pb-20">
          <div>Allow multiple options</div>
          <div className="relative inline-block w-11 h-5">
            <input
              checked={
                mode === "edit"
                  ? blockData?.isMultipleOptionsAllowed
                  : poll.allowMultipleOptions
              }
              onChange={handleToggleMultiple}
              id="switch-component-blue"
              type="checkbox"
              className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-blue-600 cursor-pointer transition-colors duration-300"
            />
            <label className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-600 cursor-pointer"></label>
          </div>
        </div>

        <div className="bottom-0 fixed mb-4 px-4 w-full">
          <NewButton
            size="large"
            variant={"primary"}
            onClick={mode === "edit" ? handleUpdate : handleSubmit}
            className="w-full"
          >
            {mode === "edit" ? "Okay" : "Add"}
          </NewButton>
        </div>
      </div>
    </div>
  );
};

export default AddPoll;
