import styles from "./RichText.module.scss";

type ShopifyRichTextRoot = {
  type: "root";
  children: ShopifyRichTextTypes[];
};

type ShopifyRichTextList = {
  type: "list";
  listType: "unordered" | "ordered";
  children: ShopifyRichTextTypes[];
};

type ShopifyRichTextListItem = {
  type: "list-item";
  children: ShopifyRichTextTypes[];
};

type ShopifyRichTextParagraph = {
  type: "paragraph";
  children: ShopifyRichTextTypes[];
};

type ShopifyRichTextHeading = {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ShopifyRichTextTypes[];
};

type ShopifyRichTextValue = {
  type: "text";
  value: string;
  bold: boolean;
  italic: boolean;
};

type ShopifyRichTextLink = {
  type: "link";
  url: string;
  title: string;
  target: string;
  children: ShopifyRichTextTypes[];
};

type ShopifyRichTextTypes =
  | ShopifyRichTextRoot
  | ShopifyRichTextParagraph
  | ShopifyRichTextValue
  | ShopifyRichTextHeading
  | ShopifyRichTextLink
  | ShopifyRichTextList
  | ShopifyRichTextListItem;

export const RichText = (
  node: ShopifyRichTextTypes & {
    options: Array<{
      type: "bold" | "italic";
      className: string;
    }>;
  },
) => {
  const renderChildren = () => {
    if ("children" in node) {
      return node.children.map((child, index) => (
        <RichText key={index} {...child} options={node.options} />
      ));
    }

    return null;
  };

  if (node.type === "root") {
    return <>{renderChildren()}</>;
  }

  if (node.type === "paragraph") {
    return <p className={styles["paragraph"]}>{renderChildren()}</p>;
  }

  if (node.type === "list-item") {
    return <li>{renderChildren()}</li>;
  }

  if (node.type === "link") {
    return (
      <a href={node.url} target={node.target} title={node.title}>
        {renderChildren()}
      </a>
    );
  }

  if (node.type === "text") {
    const options = node.options ?? [
      { type: "bold", className: styles["bold"] },
      { type: "italic", className: styles["italic"] },
    ];
    const nodeClassName = options
      .filter(({ type }) => node[type])
      .map(({ className }) => className)
      .join(" ");

    if (nodeClassName === "") {
      return <span>{node.value}</span>;
    }
    return <span className={nodeClassName}>{node.value}</span>;
  }

  if (node.type === "heading") {
    const HeadingTag = `h${node.level}` as const;
    return <HeadingTag>{renderChildren()}</HeadingTag>;
  }

  if (node.type === "list") {
    const ListTag = node.listType === "ordered" ? "ol" : "ul";
    return <ListTag>{renderChildren()}</ListTag>;
  }

  return null;
};
