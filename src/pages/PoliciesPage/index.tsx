import { useQuery } from "@apollo/client";
import styles from "./PoliciesPage.module.scss";
import { Policy } from "utils/types";
import { GET_POLICY } from "utils/queries";
import { MultilineText } from "components/core/MultilineText";

interface PolicyData {
  metaobject: Policy;
}

interface PolicytVars {
  policy: string;
}

interface Props {
  policy: string;
}

const PoliciesPage: React.FC<Props> = ({ policy }) => {
  const { data: policyData, loading: isPolicyLoading } = useQuery<
    PolicyData,
    PolicytVars
  >(GET_POLICY, {
    variables: { policy },
  });

  if (isPolicyLoading || !policyData) {
    return <></>;
  }

  return (
    <div className={styles["container"]}>
      <h1>{policyData.metaobject.title.value.toLocaleUpperCase()}</h1>
      {policyData.metaobject.description && (
        <MultilineText text={policyData.metaobject.description.value} />
      )}
      {policyData.metaobject.sections && (
        <div>
          {policyData.metaobject.sections?.references.nodes.map((node) => (
            <>
              <h2>{node.title.value}</h2>
              {<MultilineText text={node.body.value} />}
            </>
          ))}
        </div>
      )}
      {policyData.metaobject.questions && (
        <div>
          <h2>FAQ</h2>
          {policyData.metaobject.questions.references.nodes.map((node) => (
            <div>
              <h3>{node.question.value}</h3>
              {<MultilineText text={node.answer.value} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PoliciesPage;
