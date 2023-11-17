import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { CaretDown } from "phosphor-react";
import { useState } from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  borderBottom: `1px solid black`,
  "& > p": {
    margin: 0,
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<CaretDown />} {...props} />
))(() => ({
  backgroundColor: "white",
  padding: 0,
  "& div": {
    fontSize: "12px",
    margin: "12px 0 0 0",
  },
  "& p": {
    margin: 0,
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid black",
}));

type AccordionSection = {
  summary: string;
  details: React.ReactNode;
};

interface Props {
  accordions: AccordionSection[];
}

const Accordions: React.FC<Props> = ({ accordions }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      {accordions.map((accordion, idx) => (
        <Accordion
          key={`accordion-${idx}`}
          expanded={expanded === `panel${idx}`}
          onChange={handleChange(`panel${idx}`)}
        >
          <AccordionSummary
            aria-controls={`panel${idx}d-content`}
            id={`panel${idx}d-header`}
          >
            <p>{accordion.summary}</p>
          </AccordionSummary>
          <AccordionDetails>{accordion.details}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Accordions;
