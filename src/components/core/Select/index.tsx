import {
  FormControl as MuiFormControl,
  FormControlProps,
  styled,
} from "@mui/material";
import MuiMenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import MuiSelect, {
  SelectChangeEvent,
  SelectProps,
} from "@mui/material/Select";
import { CaretDown } from "phosphor-react";

const FormControl = styled((props: FormControlProps) => (
  <MuiFormControl {...props} />
))(() => ({
  width: "100%",
  fontFamily: "inherit",
}));

const Select = styled((props: SelectProps<string>) => (
  <MuiSelect
    IconComponent={() => (
      <CaretDown style={{ position: "absolute", right: 8 }} />
    )}
    {...props}
  />
))(() => ({
  fontFamily: "inherit",
  borderRadius: 0,
  borderColor: "black",
  "& .MuiSelect-select": {
    fontFamily: "inherit",
    fontSize: "12px",
    borderColor: "black",
    padding: "8px",
  },
  "& fieldset": {
    borderColor: "black !important",
    borderWidth: "1px !important",
    borderRadius: 0,
  },
}));

const MenuItem = styled((props: MenuItemProps) => <MuiMenuItem {...props} />)(
  () => ({
    fontFamily: "inherit",
    fontSize: "12px",
  }),
);

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  options: Option[];
  value?: string;
  setValue?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
}

const SingleSelect: React.FC<Props> = ({
  options,
  value,
  setValue,
  defaultValue,
  disabled,
  placeholder,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setValue?.(value);
  };

  return (
    <FormControl>
      <Select
        defaultValue={defaultValue}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiSelect-select .notranslate::after": placeholder
            ? {
                content: `"${placeholder}"`,
                opacity: 0.42,
              }
            : {},
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleSelect;
