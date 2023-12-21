import { styled } from "@mui/material/styles";
import MaterialTab from "@mui/material/Tab";
import MaterialTabs from "@mui/material/Tabs";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <MaterialTabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  minHeight: "20px",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "80%",
    backgroundColor: "#216e51",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <MaterialTab disableRipple {...props} />
))({
  textTransform: "none",
  fontWeight: "600",
  fontSize: "16px",
  letterSpacing: "0",
  padding: "6px 12px",
  minHeight: "20px",
  margin: "0 15px",
  color: "black",
  "&.Mui-selected": {
    color: "black",
  },
  "&:hover": {
    color: "#216e51",
  },
});

interface Props {
  labels: string[];
  labelIndex?: number;
  setLabelIndex?: (label: number) => void;
  className?: string;
}

const Tabs: React.FC<Props> = ({
  labels,
  labelIndex = 0,
  setLabelIndex,
  className,
}) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setLabelIndex?.(newValue);
  };

  return (
    <div className={className}>
      <StyledTabs value={labelIndex} onChange={handleChange}>
        {labels.map((label) => (
          <StyledTab label={label} />
        ))}
      </StyledTabs>
    </div>
  );
};

export default Tabs;
