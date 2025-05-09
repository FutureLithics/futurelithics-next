import React from "react";
import PropTypes from "prop-types";

interface RangeInputProps {
  options: any,
  handler: (value: string | number, options: any) => void,
  value: number
}

const RangeInput = (props: RangeInputProps) => {
  const { options, handler, value } = props;

  const styles: React.CSSProperties = {
    "--value": value,
    "--min": options.minValue,
    "--max": options.maxValue,
  } as React.CSSProperties;

  const onChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    el.style.setProperty("--value", el.value);
    el.style.setProperty("--min", el.min === "" ? "0" : el.min);
    el.style.setProperty("--max", el.max === "" ? "100" : el.max);

    handler(e.target.value, options.inner);
  };

  return (
    <div>
      <div>
        <p className="mb-0 text-secondary pe-4">{options.label}</p>
      </div>
      <div className="range-input p-1">
        <input
          type="range"
          className="range-input-element"
          min={options.minValue}
          max={options.maxValue}
          step={options.step}
          onChange={(e) => onChangeFunction(e)}
          value={value}
          style={styles}
        />
      </div>
    </div>
  );
};

export default RangeInput;
