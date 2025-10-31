import type { InputProps } from "antd";
import type { ChangeEvent } from "react";
import { memo } from "react";
import { Input } from "antd";

type IProps = Omit<InputProps, "onChange"> & {
  onChange?: (value: string) => void;
};

export default memo(function NumberInput(props: IProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "") props.onChange(inputValue);
  };

  return <Input maxLength={16} {...props} onChange={handleChange} />;
});
