import { MenuItem, Select } from "@mui/material";
import { Theme } from "../../../common/theme/theme";

export const SelectComponent = ({
  categoryInput,
  handleCategoryChange,
  children,
  placeholder,
  width,
}) => {
  return (
    <Select
      required
      id="Category"
      value={categoryInput}
      onChange={handleCategoryChange}
      placeholder={placeholder}
      sx={{
        height: "3rem",
        width: { width },
        backgroundColor: Theme.palette.secondary.contrastText,
        ":hover": {
          backgroundColor: Theme.palette.primary.contrastText,
        },
      }}>
      {children}
    </Select>
  );
};
