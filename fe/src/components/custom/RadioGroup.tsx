import { memo } from "react";
import { Flex, Radio, Space, theme } from "antd";

import type { IOption } from "@/types/ui";

import _ from "lodash";

type IProps = {
  options: IOption[];
  selected: string | number;
  onChange: (value: string | number) => void;
};

export default memo(function RadioGroup(props: IProps) {
  const { options, selected, onChange } = props;
  const { token } = theme.useToken();

  return (
    <Space direction="vertical" className="w-full !gap-0">
      {options.map((item) => {
        const checked = item.value === selected;
        const bgColorHover = checked
          ? token.colorPrimaryBgHover
          : _.replace(token.colorBgContainerDisabled, " ", "");

        return (
          <button
            key={item.value}
            style={
              {
                "--color": checked ? token.colorPrimary : "",
                "--bg-color": checked ? token.colorPrimaryBg : "",
                "--bg-color-hover": bgColorHover,
                paddingInline: token.paddingSM,
                paddingBlock: token.paddingXS,
              } as React.CSSProperties
            }
            className="w-full rounded text-[var(--color)] bg-[var(--bg-color)] hover:bg-[var(--bg-color-hover)] cursor-pointer duration-300"
            onClick={() => onChange(item.value)}
          >
            <Flex>
              <Radio checked={checked} value={item.value}></Radio>
              <p className="max-w-80 line-clamp-1 text-left">{item.label}</p>
            </Flex>
          </button>
        );
      })}
    </Space>
  );
});
