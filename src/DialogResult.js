import React from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { Dialog } from "@material-ui/core";

const DialogResult = (props) => {
  return <Dialog>{props.result}</Dialog>;
};

export default DialogResult;
