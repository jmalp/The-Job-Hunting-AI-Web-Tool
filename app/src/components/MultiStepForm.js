import "../App.css";
import { useState, useEffect } from "react";
import { FormItem } from "./FormItem";

export const MultiStepForm = (props) => {
  const [answers, setAnswers] = useState({ index: props.step });

  useEffect(() => {
    if (Object.keys(answers).length > 1) {
      // console.log("Collected Answers:", answers);
      props.onPageUpdate(answers.index, answers);
      setAnswers({ index: props.step })
      setAnswers({ index: props.step })
    }
  }, [props.step])

  const updateAnswers = (value, category) => {
    setAnswers({...answers, [category]: value});
  }

  const handleSubmit = () => {
    console.log("Final Collected Answers:", answers);
    // send to back end
  }

  return (
    <div className="text-left">
      {
        props.list[props.step - 1].items?.map((item, index) => {
          return (
            <FormItem key={`${index}_${item.label}`} item={item} onChange={updateAnswers}
                      answer={props.pagesAnswers[props.step] ? props.pagesAnswers[props.step][item.value] : null} />
          )
        })
      }
    </div>
  )
}